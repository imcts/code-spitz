const ContextIterable = class extends Map {
  #iterator
  #continuation
  #keys
  
  constructor () {
    super()
    this.#keys = new Map()
  }
  
  [Symbol.iterator] () {
    return this.#iterator = new Iterator(this.#continuation)
  }
  
  next () {
    if (this.#iterator) {
      return this.#iterator.next()
    }
    return this[Symbol.iterator]().next()
  }
  
  setNext (continuation) {
    continuation.setContext(this) // 등록해 달라고부탁하는 것. 아... 아아..ㅠㅠ 쓸데 없이 getter 만들지 말고 ㅠ
    if (!this.#continuation) {
      this.#continuation = continuation
    } else {
      this.#continuation.setNext(continuation)
    }
    return this
  }
  
  setContinuation (key, continuation) {
    if (this.#keys.has(key)) {
      throw new Error()
    }
    this.#keys.set(key, continuation)
  }
  
  getContinuation (key) {
    if (!this.#keys.has(key)) {
      throw new Error()
    }
    return this.#keys.get(key)
  }
}
