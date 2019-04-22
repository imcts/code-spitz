const Review = class {
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