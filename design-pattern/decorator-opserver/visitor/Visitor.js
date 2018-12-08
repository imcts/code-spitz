const Visitor = class Visitor {
  constructor (wrapper) {
    if (!wrapper) {
      throw new TypeError('The wrapper has not been existed.')
    }
    this._wrapper = wrapper
    this._parent = null
    this._parents = []
  }

  folders () {
    throw new Error('This method must be overridden.')
  }

  folder () {
    throw new Error('This method must be overridden.')
  }

  task () {
    throw new Error('This method must be overridden.')
  }

  order () {
    throw new Error('This method must be overridden.')
  }

  clear () {
    throw new Error('This method must be overridden.')
  }

  makeParent () {
    throw new Error('This method must be overridden.')
  }

  removeParentNode () {
    throw new Error('This method must be overridden.')
  }

  get wrapper () {
    return this._wrapper
  }

  get parent () {
    return this._parent
  }

  set parent (parent) {
    if (this._parent !== parent) {
      this._parent = parent
    }
  }

  get parents () {
    return this._parents
  }

  set parents (parent) {
    this._parents.push(parent)
  }
}
