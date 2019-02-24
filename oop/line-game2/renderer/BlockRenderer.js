const BlockRenderer = class {
  constructor (props) {
    Object.assign(this, props)
  }
  get object () {
    throw MESSAGE.OVERRIDE
  }

  render (row, column, selected) {
    this._render(row, column, selected)
  }

  _render (row, column, selected) {
    throw MESSAGE.OVERRIDE
  }

  isRenderer () {
    throw MESSAGE.OVERRIDE
  }

  remove () {
    return this._remove()
  }

  _remove () {
    throw MESSAGE.OVERRIDE
  }

  move (message) {
    return this._move(message)
  }

  _move (message) {
    throw MESSAGE.OVERRIDE
  }
}
