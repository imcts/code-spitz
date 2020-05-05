const Iterable = class {
  #f
  #iterator
  
  constructor (f) {
    this.#f = f
  }
  
  [Symbol.iterator] () {
    return this.#iterator = new Iterator(this.#f)
  }
  
  next () {
    return this.#iterator.next()
  }
}