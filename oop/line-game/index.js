/**
 * issues
 * 1. render 시점에 매번tr, td을 생성하지 않고 style 만 업데이트 하도록 수정 하시오.
 * 2. 선택한 블록은 배경에 노란색이 들어오도록 수정 하시오.
 *
 * resolve
 * 1. data는 1차원 배열을 사용하여 구현해본다.
 * 2. 초기화 시점에 style을 저장하여 재사용한다.
 * 3. 렌더에서 블록의 색상을 지정한다.
 */


const Game = (() => {
  const blocks = []
  const selected = []
  const blockStyles = []
  let isDown = false

  const down = () => isDown = true

  const move = ({pageX, pageY, target, currentTarget}) => {
    if (!isDown) {
      return
    }
    const {offsetTop: tableTop, offsetLeft: tableLeft} = currentTarget
    const {offsetWidth: blockWidth, offsetHeight: blockHeight} = target
    const row = parseInt((pageY - tableTop) / blockHeight)
    const column = parseInt((pageX - tableLeft) / blockWidth)
    const block = getBlock(row, column)
    select(block)
    render()
  }

  const getBlock = (row, column) => {
    return blocks[row * COUNT_OF_COLUMN + column]
  }

  const select = block => {
    if (isSelectionAllowed(block)) {
      selected.push(block)
    }
    if (isBlockBeforeLast(block)) {
      selected.pop()
    }
  }

  const isBlockBeforeLast = block => {
    return block === selected[selected.length - 2]
  }

  const isSelectionAllowed = block => {
    if (!selected.length) {
      return true
    }
    if (selected.includes(block)) {
      return false
    }
    if (isLastBlockBeside(block)) {
      return true
    }
  }

  const isLastBlockBeside = block => {
    const last = selected[selected.length - 1]
    const index = blocks.indexOf(block)
    return Object.values(DIRECTION).some(direction => {
      const nearBlock = blocks[index + direction]
      return nearBlock === last && nearBlock.type === block.type
    })
  }

  const up = async  e => {
    if (selected.length >= COUNT_OF_MIN_BLOCKS) {
      await removeBlocks()
      await dropBlocks()
      await fillBlocks()
    }
    selected.length = 0
    render()
    isDown = false
  }

  const removeBlocks = async () => {
    blocks.forEach((block, i) => {
      if (selected.includes(block)) {
        blocks[i] = null
      }
    })
    render()
    await sleep(TIME_OF_ANIMATION)
  }

  /**
   * 1. blocks의 0번째 인덱스부터 마지막까지 순회한다.
   * 2. 각 열별로 가장 아래에 있는 빈 블록을 찾아서 columns에 저장한다.
   * 3. 저장된 columns위의 모든 블록을 한단계씩 아래로 내린다.
   * 4. 화면을 다시 그리고 sleep한다.
   * 5. cnt를 증가시키고 다음 순회부터는 blocks의 8번째 인덱스부터 순회한다.
   */
  const dropBlocks = async () => {
    const len = blocks.length
    let cnt = 0
    let columns = {}

    while (cnt < COUNT_OF_ROW) {
      for (let i = cnt * COUNT_OF_COLUMN; i < len; i++) {
        if (blocks[i] === null) {
          columns[parseInt(i % COUNT_OF_COLUMN)] = i
        }
      }

      const indexes = Object.values(columns)
      indexes.forEach(column => {
        for (let i = column; i > 0; i -= COUNT_OF_COLUMN) {
          const upperIndex = i - COUNT_OF_COLUMN
          const block = blocks[upperIndex]
          if (block !== null) {
            blocks[i] = block
            blocks[upperIndex] = null
          }
        }
      })
      render()

      if (indexes.length) {
        await sleep(TIME_OF_ANIMATION)
      } else {
        break
      }
      columns = {}
      cnt++
    }
  }

  /**
   * 1. blocks를 행별로 순회하며 가장 깊은 depth를 구한다.
   * 2. 해당 depth만큼 다시 순회하며 배열을 생성한다.
   * 3. 이때 blocks에 블록이 있으면 null을 없으면 Block을 생성한다.
   * 4. 새로 만들어진 복사배열을 뒤에서부터 잘라오며 blocks에 복사한다.
   * 5. 다시 렌더링 한다.
   */
  const fillBlocks = async () => {
    const fillBlocks = makeFillBlocks(getDepth() * COUNT_OF_COLUMN)
    const len = fillBlocks.length
    let limit = fillBlocks.length / COUNT_OF_COLUMN
    let cnt = 1

    for (let i = 0; i < limit; i++) {
      fillBlocks.slice(len - cnt * COUNT_OF_COLUMN, len).forEach((fillBlock, i) => {
        if (fillBlock) {
          blocks[i] = fillBlock
        }
      })
      render()
      cnt++
      await sleep(TIME_OF_ANIMATION)
    }
  }

  const getDepth = () => {
    let depth = 0
    for (let i = 0; i < COUNT_OF_ROW; i++) {
      let rowClear = true
      const startColumn = i * COUNT_OF_COLUMN
      const endColumn = startColumn + COUNT_OF_COLUMN

      for (let j = startColumn; j < endColumn; j++) {
        if (!(blocks[j] instanceof Block)) {
          rowClear = false
          break
        }
      }
      if (rowClear) {
        break
      }
      depth++
    }
    return depth
  }

  const makeFillBlocks = row => {
    const fillBlocks = []
    for (let i = 0; i < row; i++) {
      if (blocks[i]) {
        fillBlocks.push(null)
      } else {
        fillBlocks.push(Block.new())
      }
    }
    return fillBlocks
  }

  const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const render = () => {
    blocks.forEach((block, i) => {
      const style = blockStyles[i]
      if (!block) {
        style.backgroundImage = ''
        style.backgroundColor = ''
        return
      }

      style.backgroundImage = block.url || ''
      if (selected.includes(block)) {
        style.backgroundColor = 'yellow'
      } else {
        style.backgroundColor = ''
      }
    })
  }

  return container => {
    const table = document.createElement('table')
    table.addEventListener('mousedown', down)
    table.addEventListener('mousemove', move)
    table.addEventListener('mouseup', up)
    table.addEventListener('mouseleave', up)

    Array.from(Array(COUNT_OF_ROW)).forEach(() => {
      const tr = document.createElement('tr')
      Array.from(Array(COUNT_OF_COLUMN)).forEach(() => {
        blockStyles.push(tr.appendChild(document.createElement('td')).style)
        blocks.push(Block.new())
      })
      table.appendChild(tr)
    })
    container.appendChild(table)
    render()
  }
})()

Game(document.getElementById('app'))