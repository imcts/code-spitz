const Message = class {
  static new (row, column, type) {
    return new Message(row, column, type)
  }

  constructor (_row, _column, _type) {
    Object.assign(this, {
      _row,
      _column,
      _type,
      _selected: false
    })
    this._row = _row
    this._column = _column
    this._type = _type
  }

  get row () {
    return this._row
  }

  set row (value) {
    this._row = value
  }

  get column () {
    return this._column
  }

  set column (value) {
    this._column = value
  }

  get type () {
    return this._type
  }

  set type (value) {
    this._type = value
  }

  get isSelected () {
    return this._selected
  }

  set selected (selected) {
    this._selected = selected
  }
}