const Observer = class {
  constructor () {
    this._observer = null
  }

  addObserver (observer) {
    if (observer && observer !== this._observer) {
      this._observer = observer
    }
    return this
  }

  notify (event, ...args) {
    const observer = this._observer
    if (observer) {
      observer.observe(event, ...args)
    }
  }

  observe (event, ...args) {
    throw new Error('This method must be overridden.')
  }
}
