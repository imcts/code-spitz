const CanvasRenderer = class {
  constructor (canvas) {
    if (!canvas && !canvas.getContext) {
      throw new Error('Invalid value.')
    }
    this._controller = null
    this._context = canvas.getContext('2d')
    this._messageToRenderer = new WeakMap()
    this._rendererToMessage = new WeakMap()
    this._rectsRenderer = new Set()
    this._arcRenderer = new Set()
    this._lineRenderer = new Set()
    this._queue = []
    this._run()
  }
  
  _run () {
    const f = now => {
      const queue = this._queue
      for (let i = queue.length; i--;) {
        const task = queue[i]
        if (task && typeof task.callback === 'function') {
          task.callback(now)
          queue.splice(i, 1)
        }
      }
      this._render()
      requestAnimationFrame(f)
    }
    requestAnimationFrame(f)
  }
  
  _render () {
    this._rectsRenderer.forEach(rect => rect.render())
    this._arcRenderer.forEach(arc => arc.render())
    this._lineRenderer.forEach(line => line.render())
  }
  
  addQueue (task) {
    if (!task) {
      return
    }
    this._queue.push(task)
  }
  
  addRectRenderer (message) {
    const {column, point} = message
    const renderer = new RectRenderer(this, column, point)
    this._rectsRenderer.add(renderer)
    this._messageToRenderer.set(message, renderer)
    this._rendererToMessage.set(renderer, message)
  }
  
  addArcRenderer (message) {
    const {column, point} = message
    const renderer = new ArcRenderer(this, column, point)
    this._arcRenderer.add(renderer)
    this._messageToRenderer.set(message, renderer)
    this._rendererToMessage.set(renderer, message)
  }
  
  addLineRenderer (message) {
    const {column, point} = message
    const renderer = new LineRenderer(this, column, point)
    this._lineRenderer.add(renderer)
    this._messageToRenderer.set(message, renderer)
    this._rendererToMessage.set(renderer, message)
  }
  
  async action () {
    await Promise.all(Array.from(this._rectsRenderer).map(rect => rect.action()))
    
    const arcs = Array.from(this._arcRenderer)
    const lines = Array.from(this._lineRenderer)
    for (let i = 0, len = arcs.length; i < len; i++) {
      await arcs[i].action()
      const line = lines[i]
      const message = this._controller.getNextReviewMessage(this._rendererToMessage.get(line))
      if (!message) {
        return
      }
      const {nextColumn, nextPoint} = message
      await line.setNext(nextColumn, nextPoint).action()
    }
  }
  
  set controller (controller) {
    this._controller = controller
  }
  
  get context () {
    return this._context
  }
}