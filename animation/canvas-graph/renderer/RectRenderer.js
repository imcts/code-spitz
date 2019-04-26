const RectRenderer = class extends GraphRenderer {
  constructor (canvasRenderer, column, point) {
    super(canvasRenderer, column, point, RECT_DURATION)
    this._x = column * MARGIN + START_X
    this._height = 0
  }
  
  _draw (progress) {
    this._height = -(this._point * progress)
  }
  
  render () {
    const {_context, _x, _height} = this
    _context.fillStyle = '#243e7a'
    _context.fillRect(_x, CANVAS_HEIGHT, RECT_WIDTH, _height)
  }
}
