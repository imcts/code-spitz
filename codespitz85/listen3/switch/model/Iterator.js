const Iterator = class {
  #context
  #f
  
  constructor (f) {
    this.#f = f
    this.#context = new ContextIterable()
  }
  
  next () {
    const value = this.#f(this.#context)
    if (this.#context.isStop(value)) {
      return IteratorValue.DONE
    }
    return new IteratorValue(value, false)
  }
}