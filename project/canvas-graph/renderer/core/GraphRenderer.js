const GraphRenderer = class {
  constructor (_renderer, _column, _point, _duration) {
    Object.assign(this, {
      _renderer,
      _context: _renderer.context,
      _column,
      _point,
      _duration
    })
  }
  
  action () {
    return new Promise(resolve => {
      const start = performance.now()
      const f = now => {
        let timeFraction = (now - start) / this._duration
        if (timeFraction > 1) {
          timeFraction = 1
        }
        const progress = timeFraction * (2 - timeFraction)
        if (progress > 0) {
          this._draw(progress)
        }
        if (timeFraction < 1) {
          this._renderer.addQueue({callback: f})
        } else {
          this._renderer.addQueue({callback: resolve})
        }
      }
      this._renderer.addQueue({callback: f})
    })
  }
  
  _draw (progress) {
    throw new Error('Override.')
  }
}