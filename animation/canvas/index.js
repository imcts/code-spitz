const CANVAS_HEIGHT = 500
const RECT_WIDTH = 100
const ARC_RADIUS = 10
const LINE_WIDTH = 3
const START_X = 25
const MARGIN = RECT_WIDTH + 25
const RECT_DURATION = 500
const ARC_DURATION = 90
const LINE_DURATION = 70

// 구상 렌더러.
const RectRenderer = class {
  constructor (canvasRenderer, x, y, width, height) {
    this._canvasRenderer = canvasRenderer
    this._context = this._canvasRenderer.context
    this._x = x
    this._y = y
    this._width = width
    this._height = height
    this._viewHeight = 0
  }
  
  action () {
    this._viewHeight = 0
    return new Promise(resolve => {
      // TODO animate는 밖으로 빼는 편이 더 나을 것 같음. 왜냐면 다양한 애니메이션 효과를 적용할 수 있기 때문.
      const start = performance.now()
      const f = time => {
        let timeFraction = (time - start) / RECT_DURATION
        if (timeFraction > 1) {
          timeFraction = 1
        }
        const progress = timeFraction * (2 - timeFraction)
        this._viewHeight = -(this._height * progress)
        
        if (timeFraction < 1) {
          requestAnimationFrame(f)
        } else {
          resolve()
        }
      }
      requestAnimationFrame(f)
    })
  }
  
  render () {
    this._context.fillStyle = '#243e7a'
    this._context.fillRect(this._x, this._y, this._width, this._viewHeight)
  }
}

// 구상 렌더러.
const ArcRenderer = class {
  constructor (canvasRenderer, x, y, radius) {
    this._canvasRenderer = canvasRenderer
    this._context = this._canvasRenderer.context
    this._x = x
    this._y = y
    this._radius = radius
    this._startEngle = 0
    this._endEngle = Math.PI / 180 * 360
    this._viewRadius = 0
  }
  
  action () {
    this._viewRadius = 0
    return new Promise(resolve => {
      // TODO animate는 밖으로 빼는 편이 더 나을 것 같음. 왜냐면 다양한 애니메이션 효과를 적용할 수 있기 때문.
      const start = performance.now()
      const f = time => {
        let timeFraction = (time - start) / ARC_DURATION
        if (timeFraction > 1) {
          timeFraction = 1
        }
        const progress = timeFraction * (2 - timeFraction)
        this._viewRadius = this._radius * progress
        
        if (timeFraction < 1) {
          requestAnimationFrame(f)
        } else {
          resolve()
        }
      }
      requestAnimationFrame(f)
    })
  }
  
  render () {
    this._context.arc(this._x, this._y, this._viewRadius, this._startEngle, this._endEngle)
    this._context.fillStyle = '#ff7d11'
    this._context.fill()
    this._context.closePath()
  }
}

// 구상 렌더러.
const LineRenderer = class {
  constructor (canvasRenderer, x, y, width) {
    this._canvasRenderer = canvasRenderer
    this._context = this._canvasRenderer.context
    this._x = x
    this._y = y
    this._nextX = x
    this._nextY = y
    this._viewX = x
    this._viewY = y
    this._width = width
  }
  
  action () {
    const distanceX = this._nextX - this._x
    const distanceY = this._nextY - this._y
    this._viewX = this._x
    this._viewY = this._y
    return new Promise(resolve => {
      // TODO animate는 밖으로 빼는 편이 더 나을 것 같음. 왜냐면 다양한 애니메이션 효과를 적용할 수 있기 때문.
      const start = performance.now()
      const f = time => {
        let timeFraction = (time - start) / LINE_DURATION
        if (timeFraction > 1) {
          timeFraction = 1
        }
        
        const progress = timeFraction * (2 - timeFraction)
        const x = distanceX * progress
        const y = distanceY * progress
        
        this._viewX = this._x + x
        this._viewY = this._y + y
      
        if (timeFraction < 1) {
          requestAnimationFrame(f)
        } else {
          resolve()
        }
      }
      requestAnimationFrame(f)
    })
  }
  
  render () {
    if (this._x === this._nextX) {
      return
    }
    
    this._context.beginPath()
    this._context.lineWidth = this._width
    this._context.strokeStyle = '#ff7d11'
    this._context.moveTo(this._x, this._y)
    this._context.lineTo(this._viewX, this._viewY)
    this._context.stroke()
    this._context.closePath()
  }
  
  set nextX (value) {
    this._nextX = value
  }
  
  set nextY (value) {
    this._nextY = value
  }
}

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
    this._run()
  }
  
  _run () {
    const f = () => {
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
  
  addRectRenderer (message) {
    const {x, y} = message
    const renderer = new RectRenderer(this, START_X + x * MARGIN, CANVAS_HEIGHT, RECT_WIDTH, y)
    this._rectsRenderer.add(renderer)
    this._messageToRenderer.set(message, renderer)
    this._rendererToMessage.set(renderer, message)
  }
  
  addArcRenderer (message) {
    const {x, y} = message
    const renderer = new ArcRenderer(this, START_X + x * MARGIN + RECT_WIDTH / 2, CANVAS_HEIGHT - y, ARC_RADIUS)
    this._arcRenderer.add(renderer)
    this._messageToRenderer.set(message, renderer)
    this._rendererToMessage.set(renderer, message)
  }
  
  addLineRenderer (message) {
    const {x, y} = message
    const renderer = new LineRenderer(this, START_X + x * MARGIN + RECT_WIDTH / 2, CANVAS_HEIGHT - y, LINE_WIDTH)
    this._lineRenderer.add(renderer)
    this._messageToRenderer.set(message, renderer)
    this._rendererToMessage.set(renderer, message)
  }
  
  action () {
    const promises = Array.from(this._rectsRenderer).map(rect => rect.action())
    Promise.all(promises).then(() => {
      const arcs = Array.from(this._arcRenderer)
      const lines = Array.from(this._lineRenderer)
      const arcAction = arc => {
        return () => {
          return new Promise(resolve => {
            return arc.action().then(() => resolve())
          })
        }
      }
      
      const lineAction = line => {
        return () => {
          return new Promise(resolve => {
            const message = this._controller.getNextReviewMessage(this._rendererToMessage.get(line))
            if (message) {
              const {nextX, nextY} = message
              line.nextX = START_X + nextX * MARGIN + RECT_WIDTH / 2
              line.nextY = CANVAS_HEIGHT - nextY
              line.action().then(() => resolve())
            }
          })
        }
      }
      
      const promises = []
      for (let i = 0; i < arcs.length; i++) {
        promises.push(arcAction(arcs[i]))
        promises.push(lineAction(lines[i]))
      }
      
      // Promise executor.
      promises.reduce((promise, item) => {
        return promise.then(() => item())
      }, Promise.resolve())
    })
  }
  
  set controller (controller) {
    this._controller = controller
  }
  
  get context () {
    return this._context
  }
}

const Message = class {
  constructor (x, y) {
    this._x = x
    this._y = y
    this._nextX = 0
    this._nextY = 0
  }
  
  get x () {
    return this._x
  }
  
  get y () {
    return this._y
  }
  
  get nextX () {
    return this._nextX
  }
  
  set nextX (value) {
    this._nextX = value
  }
  
  get nextY () {
    return this._nextY
  }
  
  set nextY (value) {
    this._nextY = value
  }
}

/**
 * 1. 그래프용 리뷰 데이터.
 * 2. 어떤 그래프가 됐든 하나의 포인트 값을 가지면 됨.
 * 3. 추후에 row, column 추가 가능 성 존재. (역할에 따라)
 */
const Review = class {
  // 걍 나중에는 point 말고 y로해.
  constructor (column, point) {
    this._column = column
    this._point = point
    this._next = null
  }
  
  get column () {
    return this._column
  }
  
  get point () {
    return this._point
  }
  
  get next () {
    return this._next
  }
  
  set next (review) {
    this._next = review
  }
}

const ReviewGraphController = class {
  constructor (data, renderer) {
    this._messageToReview = new WeakMap()
    this._reviewToMessage = new WeakMap()
    this._totalReviews = new Set()
    this._newReviews = new Set()
    this._renderer = renderer
    this._renderer.controller = this
    this._add(data)
    this._renderer.action()
    this._currentNewReview = null
  }
  
  _add (data) {
    data.forEach((data, i) => {
      this._addTotalReview(i, data.total)
      this._addNewReview(i, data.new)
    })
  }
  
  _addTotalReview (x, point) {
    const review = new Review(x, point)
    const message = new Message(x, point)
    this._totalReviews.add(review)
    this._messageToReview.set(message, review)
    this._reviewToMessage.set(review, message)
    this._renderer.addRectRenderer(message)
  }
  
  _addNewReview (x, point) {
    const review = new Review(x, point)
    const message = new Message(x, point)
    
    if (this._currentNewReview) {
      this._currentNewReview.next = review
    }
    this._currentNewReview = review
    this._newReviews.add(review)
    this._messageToReview.set(message, review)
    this._reviewToMessage.set(review, message)
    this._renderer.addArcRenderer(message)
    this._renderer.addLineRenderer(message)
  }
  
  getNextReviewMessage (message) {
    const review = this._messageToReview.get(message)
    if (!review) {
      return
    }
    const next = review.next
    if (!next) {
      return
    }
    message.nextX = next.column
    message.nextY = next.point
    return message
  }
}

const DATA = [{
  total: 300,
  new: 100
}, {
  total: 400,
  new: 200
}, {
  total: 500,
  new: 300
}, {
  total: 200,
  new: 100
}, {
  total: 100,
  new: 50
}, {
  total: 500,
  new: 200
}]
const renderer = new CanvasRenderer(document.getElementById('canvas'))
new ReviewGraphController(DATA, renderer)
