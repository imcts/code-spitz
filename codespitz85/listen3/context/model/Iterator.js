const Iterator = class {
  #continuation
  
  constructor (continuation) {
    this.#continuation = continuation
  }
  
  next () {
    const continuation = this.#continuation
    if (!continuation) {
      return IteratorValue.DONE
    }
    continuation.suspend()
    if (continuation.isStop()) {
      return IteratorValue.DONE
    }
    this.#continuation = continuation.getNext()
    if (continuation.isPass()) {
      return this.next()
    }
    return new IteratorValue(continuation.getValue(), false)
  }
}