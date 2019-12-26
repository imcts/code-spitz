const ReviewGraphController = class {
  constructor (data, renderer) {
    this._messageToReview = new WeakMap()
    this._reviewToMessage = new WeakMap()
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
  
  _addTotalReview (column, point) {
    const review = new Review(column, point)
    const message = new Message(column, point)
    this._messageToReview.set(message, review)
    this._reviewToMessage.set(review, message)
    this._renderer.addRectRenderer(message)
  }
  
  _addNewReview (column, point) {
    const review = new Review(column, point)
    const message = new Message(column, point)
    
    if (this._currentNewReview) {
      this._currentNewReview.next = review
    }
    this._currentNewReview = review
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
    message.nextColumn = next.column
    message.nextPoint = next.point
    return message
  }
}