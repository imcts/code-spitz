/**
 * 1. <section>을 전달받는다.
 * 2. 섹션의 가로와 세로를 전달받아서 블록의 길이를 알 수 있게 한다.
 * 3. 블록 렌더러 팩토리를 전달받는다.
 */
const SectionRenderer = class extends Renderer {
  constructor ({container, width, height, row, column, rendererFactory}) {
    super({
      _container: container,
      _width: width,
      _height: height,
      _row: row,
      _column: column,
      _rendererFactory: rendererFactory,
      _selecting: false,
      _queue: [],
      _activate: false,
      _currentTime: 0
    });
    container.addEventListener('mousedown', e => this._activate && this._down(e))
    container.addEventListener('mousemove', e => this._activate && this._move(e))
    container.addEventListener('mouseup', e => this._activate && this._up(e))
    container.addEventListener('mouseleave', e => this._activate && this._up(e))
    this._run()
  }

  /**
   * 1. x, y좌표를 기준으로 renderer를 찾는다.
   * 2. renderer로 message를 찾는다.
   * 3. controller에게 message를 전달하며 요청한다.
   */
  _down ({pageX, pageY}) {
    const renderer = this._getRenderer(pageX, pageY)
    if (!renderer) {
      return
    }
    this._selecting = true
    const message = this._rendererToMessage.get(renderer)
    this._controller.start(message)
  }

  /**
   * 1. 클릭된 x, y값을 기준으로 엘리먼트를 찾는다.
   * 2. 해당 block 엘리먼트를 기준으로 renderer를 순회하며 div와 비교하여 렌더러를 찾아서 반환한다.
   */
  _getRenderer (x, y) {
    const block = document.elementFromPoint(x, y)
    return Array.from(this._renderers).find(renderer => renderer.isRenderer(block))
  }

  /**
   * 1. x, y,좌표를 기준으로 renderer를 찾는다.
   * 2. renderer로 message를 찾는다.
   * 3. controller에게 message를 전달하며 요쳥한다.
   */
  _up ({pageX, pageY}) {
    this.deactivate()
    this._controller.end()
    this._selecting = false
  }

  /**
   * 1. x, y좌표를 기준으로 renderer를 찾는다.
   * 2. renderer로 message를 찾는다.
   * 3. controller에게 message를 전달하며 요청한다.
   */
  _move ({pageX, pageY}) {
    if (!this._selecting) {
      return
    }

    const renderer = this._getRenderer(pageX, pageY)
    if (!renderer) {
      return
    }
    const message = this._rendererToMessage.get(renderer)
    this._controller.move(message)
  }

  /**
   * 1. DOM의 구상객체 이므로 실제 애니메이션을 반복하는 코드는 이 곳에 위치한다.
   * 2. render를 수행할때 queue에 적재된 값이 있으면 현재 시간과 비교하여 지난 것들에 대해 실행한다.
   * 3. Renderer에 선언된 _render를 호출한다.
   */
  _run () {
    const f = currentTime => {
      const queue = this._queue
      for (let i = queue.length; i--;) {
        const task = queue[i]
        if (task.time <= currentTime) {
          queue.splice(i, 1)
          task.callback()
        }
      }

      this._currentTime = currentTime
      this._render()
      requestAnimationFrame(f)
    }
    requestAnimationFrame(f)
  }

  _add (renderer) {
    this._container.appendChild(renderer.object)
  }

  activate () {
    this._activate = true
  }

  deactivate () {
    this._activate = false
  }

  _remove (renderer) {
    this._container.removeChild(renderer.object)
  }

  _addQueue (callback, time) {
    this._queue.push({callback, time: this._currentTime + time})
  }

  getBlockSize () {
    return {
      width: parseInt(this._width / this._column),
      height: parseInt(this._height / this._row)
    }
  }

  get width () {
    return this._width
  }

  get height () {
    return this._height
  }
}