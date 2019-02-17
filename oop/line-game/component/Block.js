const Block = class {
  static new (type = parseInt(Math.random() * COUNT_OF_TYPES)) {
    return new Block(type)
  }

  constructor (type) {
    this._type = type
  }

  get url () {
    return `url(./image/block${this._type}.png)`
  }

  get type () {
    return this._type
  }
}