const IteratorValue = class {
  static DONE = Object.assign(Object.create(null), {value: undefined, done: true})
  
  #value
  #done
  
  constructor (value, done) {
    this.#value = value
    this.#done = done
  }
  
  get value () {
    return this.#value
  }
  
  get done () {
    return this.#done
  }
}