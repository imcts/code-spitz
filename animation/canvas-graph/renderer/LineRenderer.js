const LineRenderer = class extends GraphRenderer {
  constructor (canvasRenderer, column, point) {
    super(canvasRenderer, column, point, LINE_DURATION)
    this._x = column * MARGIN + START_X + RECT_WIDTH / 2 + LINE_MARGIN
    this._y = CANVAS_HEIGHT - point
    this._x1 = 0
    this._y1 = 0
    this._currentX = 0
    this._currentY = 0
    this._distanceX = 0
    this._distanceY = 0
  }
  
  _draw (progress) {
    const {_distanceX, _distanceY, _x, _y} = this
    this._currentX = _x + _distanceX * progress
    this._currentY = _y + _distanceY * progress
  }
  
  setNext (column, point) {
    this._x1 = (column * MARGIN + START_X + RECT_WIDTH / 2) - LINE_MARGIN
    this._y1 = CANVAS_HEIGHT - point
    this._distanceX = this._x1 - this._x
    this._distanceY = this._y1 - this._y
    return this
  }
  
  render () {
    if (!this._distanceX) {
      return
    }
    const {_context, _x, _y, _currentX, _currentY} = this
    _context.beginPath()
    _context.lineWidth = LINE_WIDTH
    _context.strokeStyle = '#ff7d11'
    _context.moveTo(_x, _y)
    _context.lineTo(_currentX, _currentY)
    _context.stroke()
    _context.closePath()
  }
}

