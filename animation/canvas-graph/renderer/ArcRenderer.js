const ArcRenderer = class extends GraphRenderer {
  constructor (canvasRenderer, column, point) {
    super(canvasRenderer, column, point, ARC_DURATION)
    this._x = column * MARGIN + START_X + RECT_WIDTH / 2
    this._y = CANVAS_HEIGHT - point
    this._radius = ARC_RADIUS
    this._currentRadius = 0
  }
  
  _draw (progress) {
    this._currentRadius = this._radius * progress
  }
  
  render () {
    const {_context, _x, _y, _currentRadius} = this
    _context.arc(_x, _y, _currentRadius, START_ANGLE, FULL_ARC_ANGLE)
    _context.fillStyle = '#ff7d11'
    _context.fill()
    _context.closePath()
  }
}
