const DivRenderer = class extends BlockRenderer {
  static new (sectionRenderer, width, height, type, row) {
    return new DivRenderer(sectionRenderer, width, height, type, row)
  }
  constructor (sectionRenderer, width, height, type, row) {
    super({
      _sectionRenderer: sectionRenderer,
      _div: document.createElement('div'),
      _width: width,
      _height: height
    })
    this._div.className = 'block'
    this._div.style.cssText = `top: ${row * height}px; width: ${width}px;height: ${height}px;`
    this._div.style.backgroundImage = `url(./image/block${type}.png)`
  }

  _render (row, column, selected) {
    const style = this._div.style
    style.top = `${row * this._height}px`
    style.left = `${column * this._width}px`
    style.backgroundColor = selected ? 'red' : ''
  }

  isRenderer (renderer) {
    return this._div === renderer
  }

  /**
   * 1. Promise를 생성한다.
   * 2. 애니메이션이 종료될때까지 wait 한다.
   * 3. 애니메이션이 종료 되어야만 resolve 한다.
   * 4. 화면은 requestAnimation이 매번 반복해서 실행하여 그리므로 해당 renderLoop에서 queue를 제거한다.
   */
  _remove () {
    return new Promise((res, rej) => {
      this._div.style.transition = `transform ease-in ${TIME_OF_REMOVING}ms`
      this._div.style.transform = 'scale(0,0)'
      this._sectionRenderer._addQueue(res, TIME_OF_REMOVING)
    })
  }

  /**
   * 1. 이동된 위치값을 message로 전달 받는다.
   * 2. 블록의 높이마다 0.1초로 계산한다.
   *  - 이동한 곳의 y값을 구하려면 message.row(이동한곳의 row) * height(블록의높이)에서 원래 top값만큼 빼준다. (현재 위치에서 이동한만큼 제거)
   *  - ex) 0 -> 7로 이동했을경우, 8칸 이동 했으므로 85 * 8 = 680px이다. 이 위치에서 원래 top의 위치(0px)를 제거하면 이동한 거리가 구해진다.
   *  - 이동한 총 거리 / 블록의 높이 * 시간 => 거리당 걸리는 시간.
   */
  _move (message) {
    return new Promise((res, rej) => {
      const style = this._div.style
      const time = (message.row * this._height - parseInt(style.top)) / this._height * DURATION_OF_MOVE
      style.transition = `top ease-in ${time}ms`
      this._sectionRenderer._addQueue(res, time)
    })
  }

  get object () {
    return this._div
  }
}