const Continuation = class {
  static #PASS = Symbol()
  static #STOP = Symbol()
  
  #key
  #value
  #f
  #context
  #next
  
  constructor (key, f) {
    this.#key = key
    this.#f = f
  }
  
  resume (key, value) {
    this.#value = value || Continuation.#PASS
    if (key !== undefined) {
      this.setNext(this.#context.getContinuation(key))
    }
  }
  
  suspend () {
    this.stop()
    this.#f(this)
  }
  
  stop () {
    this.#value = Continuation.#STOP
  }
  
  set (key, value) {
    this.#context.set(key, value)
  }
  
  get (key) {
    return this.#context.get(key)
  }
  
  isStop () {
    return this.#value === Continuation.#STOP
  }
  
  isPass () {
    return this.#value === Continuation.#PASS
  }
  
  setContext (context) {
    this.#context = context
    this.#context.setContinuation(this.#key, this)
  }
  
  setNext (continuation) {
    this.#next = continuation
  }
  
  getNext () {
    return this.#next
  }
  
  getValue () {
    return this.#value
  }
}

