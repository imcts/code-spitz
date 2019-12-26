const Parser = class {
  constructor (element) {
    if (!element) {
      throw new TypeError('The element has not been existed.')
    }
    this._element = element
  }

  parse (content) {
    throw new Error('The load must be overridden.')
  }

  set element (element) {
    if (!element) {
      throw new TypeError('The element has not been existed.')
    }
    if (this._element !== element) {
      this._element = element
    }
  }
}
