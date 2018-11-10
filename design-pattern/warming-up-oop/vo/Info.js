const Info = class {
  constructor ({title, header, items}) {
    if (!(typeof title === 'string' && title)) {
      throw new TypeError('The title is invalidated.')
    }
    if (!(Array.isArray(header) && header.length)) {
      throw new TypeError('The header is invalidated.')
    }
    if (!(Array.isArray(items) && items.length)) {
      throw new TypeError('The items are invalidated.')
    }
    this._title = title
    this._header = header
    this._items = items
  }

  get title () {
    return this._title
  }

  get header () {
    return this._header
  }

  get items () {
    return this._items
  }
}
