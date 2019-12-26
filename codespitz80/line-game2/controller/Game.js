/**
 * 1. 게임이 시작하면 로우와 컬럼과 렌더러를 전달 받는다.
 * 2. 모델을 생성하고 각 WeakMap을 정리한다.
 * 3. 렌더러에게 Message를 추가하라고 명령한다.
 */
const Game = class {
  constructor ({row, column, renderer}) {
    Object.assign(this, {
      _row: row,
      _column: column,
      _blocks: new Set(),
      _blockToMessage: new WeakMap(),
      _messageToBlock: new WeakMap(),
      _renderer: renderer,
      _block: null
    })

    renderer.setGame(this)
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        this._add(i, j)
      }
    }

    /**
     * 애초에 생성될때 top을 주입 받아야함.
     */
    Promise.all(Array.from(this._blocks).map(block => {
      block.position(block.row + row, block.column)
      const message = this._blockToMessage.get(block)
      message.row = block.row
      message.column = block.column
      return renderer.move(message)
    })).then(() => this._renderer.activate())
  }

  _add (row, column) {
    const block = Block.new(row - this._row, column)
    const message = Message.new(row, column, block.type)
    message.row = block.row
    message.column = block.column

    this._blocks.add(block)
    this._blockToMessage.set(block, message)
    this._messageToBlock.set(message, block)
    this._renderer.add(message)
    return block
  }

  /**
   * 1. SectionRenderer에서 message를 전달받는다.
   * 2. message로 blockModel을 찾는다.
   * 3. 해당 model의 데이터를 message에 할당한다.
   * 4. 화면을 그리게 된다.
   */
  getMessage (message) {
    const block = this._messageToBlock.get(message)
    message.row = block.row
    message.column = block.column
    message.selected = block.selected
    return message
  }

  /**
   * 1. Renderer에서 message를 전달받는다.
   * 2. message로 blockModel을 찾는다.
   * 3. blockModel에게 selected되었다고 설정한다.
   * 4. controller는 마지막으로 선택된 block을 알아야 한다. (LinkedList이므로)
   */
  start (message) {
    const block = this._messageToBlock.get(message)
    if (!block) {
      return
    }
    block.select(null)
    this._block = block
  }

  /**
   * 1. Renderer에서 message를 받는다.
   * 2. message로 blockModel을 찾는다.
   * 3. 컨트롤러의 block과 같으면 return
   * 4. 컨트롤러의 block과 block의 타입이 같지 않으면 return
   * 5. 이미 선택되어져 있는 블록이면 return
   * 6. 인접셀이 아니면 return
   * 7. block이 컨트롤러의 마지막 블록의 before와 같으면 해당 블록은 제거.
   */
  move (message) {
    const block = this._messageToBlock.get(message)
    if (!block) {
      return
    }
    if (this._block === block) {
      return
    }
    if (this._block.type !== block.type) {
      return
    }
    if (this._block.isBefore(block)) {
      this._block.unselect()
      this._block = block
      return
    }
    if (this._block.hasBlock(block)) {
      return
    }
    if (!this._block.isNearBlock(block)) {
      return
    }
    this._block = block.select(this._block)
  }

  /**
   * 1. block을 찾는다.
   * 2. 블록 개수가 3개이상이라면 message들을 찾아서 renderer에게 전달한다.
   * 3. 블록 개수가 3개 미만이라면 블록들의 unselect를 호출한다.
   */
  async end () {
    const selected = Array.from(this._blocks).filter(block => block.selected)
    if (selected.length < COUNT_OF_MIN_BLOCKS) {
      selected.forEach(block => block.unselect())
      this._renderer.activate()
    } else {
      const messages = selected.map(block => this._blockToMessage.get(block))
      await this._renderer.deactivate()
      await Promise.all(this._renderer.remove(messages))
      await selected.forEach(block => this._delete(block))
      await this._dropBlocks()
      await this._fillBlocks()
      await this._renderer.activate()
    }
  }

  _delete (block) {
    const message = this._blockToMessage.get(block)
    this._blockToMessage.delete(block)
    this._messageToBlock.delete(message)
    this._blocks.delete(block)
  }

  /**
   * 1. row와 column을 this._blocks가 알고 있다.
   * 2. 해당 row와 column을 기준으로 2차원 배열을 생성한다. (2차원배열로 원본 데이터를 카피한다)
   * 3. blocks를 뒤에서부터 순회하면서 공백을 만나면 row를 기준으로 row가 0과 같아질때까지 검색한다.
   * 4. row를 감소시키면서 올라가다가 block을 만나면 현재 위치로 변경하고 renderer에게 블록의 이동을 요청한다.
   */
  async _dropBlocks () {
    const blocks = []
    const collection = []

    for (let i = this._row; i--;) {
      blocks.push([])
    }
    this._blocks.forEach(block => blocks[block.row][block.column] = block)

    for (let row = blocks.length; row--;) {
      for (let column = this._column; column--;) {
        const block = blocks[row][column]

        if (!block) {
          for (let newRow = row; newRow >= 0; newRow--) {
            const block = blocks[newRow][column]

            if (block) {
              blocks[row][column] = block
              blocks[newRow][column] = null
              block.position(row, column)

              const message = this._blockToMessage.get(block)
              message.row = block.row
              message.column = block.column

              collection.push(this._renderer.move(message))
              break
            }
          }
        }
      }
    }

    if (!collection.length) {
      return
    }
    await Promise.all(collection)
  }

  async _fillBlocks () {
    const blocks = []
    let collection = []

    for (let i = this._row; i--;) {
      blocks.push(Array(this._column))
    }
    this._blocks.forEach(block => blocks[block.row][block.column] = block)

    for (let row = blocks.length; row--;) {
      for (let column = blocks[row].length; column--;) {
        if (!blocks[row][column]) {
          collection.push(this._add(row, column))
        }
      }
    }

    if (!collection.length) {
      return
    }

    await Promise.all(collection.map(block => {
      block.position(block.row + this._row, block.column)
      const message = this._blockToMessage.get(block)
      message.row = block.row
      message.column = block.column
      return this._renderer.move(message)
    }))
  }
}
