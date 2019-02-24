/**
 * 맵을 위한 Renderer 이다.
 * 1. BlockFactory를 전달받는다. (어떤 Block 구상 클래스가 만들어질지 모르기때문)
 */
const Renderer = class {
  constructor (props) {
    Object.assign(this, {
      _controller: null,
      _row: 0,
      _column: 0,
      _rendererFactory: null,
      _renderers: new Set(),
      _messageToRenderer: new WeakMap(),
      _rendererToMessage: new WeakMap()
    }, props)
  }

  /**
   * 1. 애니메이션 루프일때마다 반복해서 실행된다.
   * 2. 렌더러들을 순회하면서 메시지를 꺼내어 컨트롤러부터 데이터를 얻어온다.
   * 3. 렌더러에게 데이터를 전달하며 블록을 그리는 코드를 위임한다.
   */
  _render () {
    const controller = this._controller
    this._renderers.forEach(renderer => {
      const {row, column, isSelected} = controller.getMessage(this._rendererToMessage.get(renderer))
      renderer.render(row, column, isSelected)
    })
  }

  setGame (game) {
    this._controller = game
  }

  /**
   * 1. 컨트롤러에서 모델이 생성될때 호출 된다.
   * 2. 통신을 위한 메시지를 전달받고 매칭되는 렌더러를 생성한다.
   * 3. 구상 렌더러인 섹션 렌더러에게 렌더러를 추가해달라고 요청한다.
   */
  add (message) {
    const renderer = this._rendererFactory(this, this._blockWidth, this._blockHeight, message.type, message.row)
    this._renderers.add(renderer)
    this._messageToRenderer.set(message, renderer)
    this._rendererToMessage.set(renderer, message)
    this._add(renderer)
  }

  _add () {
    throw MESSAGE.OVERRIDE
  }

  activate () {
    throw MESSAGE.OVERRIDE
  }

  deactivate () {
    throw MESSAGE.OVERRIDE
  }

  /**
   * 1. 제거해야할 message들이 전달된다.
   * 2. message로 renderer를 찾는다.
   * 3. WeakMap, renderers에서 해당 항목을 제거한다.
   * 4. renderer에게 remove를 요청한다.
   * 5. SectionRenderer에게 renderer를 전달하여 remove 한다.
   * 6. controller에게 promises를 반환한다.
   */
  remove (messages) {
    return messages.map(message => {
      const renderer = this._messageToRenderer.get(message)
      this._renderers.delete(renderer)
      this._messageToRenderer.delete(message)
      this._rendererToMessage.delete(renderer)
      return renderer.remove().then(() => this._remove(renderer))
    })
  }

  _remove (renderer) {
    throw MESSAGE.OVERRIDE
  }

  move (message) {
    const renderer = this._messageToRenderer.get(message)
    if (!renderer) {
      return
    }
    return renderer.move(message)
  }
}