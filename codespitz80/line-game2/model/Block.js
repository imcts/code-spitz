const Block = class {
  static new (row, column, type = parseInt(Math.random() * COUNT_OF_TYPES)) {
    return new Block(row, column, type)
  }

  constructor (_row, _column, _type) {
    Object.assign(this, {
      _row,
      _column,
      _type,
      _before: null,
      _selected: false
    })
    this._row = _row
    this._column = _column
  }

  position (row, column) {
    this._row = row
    this._column = column
  }

  select (block) {
    this._before = block
    this._selected = true
    return this
  }

  unselect () {
    this._before = null
    this._selected = false
  }

  hasBlock (block) {
    if (!this._before) {
      return false
    }
    if (this === block) {
      return true
    }
    if (this._before === block) {
      return true
    }
    return this._before.hasBlock(block)
  }

  isNearBlock (block) {
    return Math.abs(this._row - block.row) < LIMIT_OF_BLOCK_DISTANCE && Math.abs(this._column - block.column) < LIMIT_OF_BLOCK_DISTANCE
  }

  isBefore (block) {
    return this._before === block
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

  set type (type) {
    this._type = type
  }

  get selected () {
    return this._selected
  }

  set selected (selected) {
    this._selected = selected
  }
}
