const Message = class {
  constructor (column, point) {
    this._column = column
    this._point = point
    this._nextColumn = 0
    this._nextPoint = 0
  }
  
  get column () {
    return this._column
  }
  
  set column (value) {
    this._column = value
  }
  
  get point () {
    return this._point
  }
  
  set point (value) {
    this._point = value
  }
  
  get nextColumn () {
    return this._nextColumn
  }
  
  set nextColumn (value) {
    this._nextColumn = value
  }
  
  get nextPoint () {
    return this._nextPoint
  }
  
  set nextPoint (value) {
    this._nextPoint = value
  }
}