const Context = class {
  static #STOP = Symbol()
  prev = 0
  next = 0
  
  isStop (stop) {
    return stop === Context.#STOP
  }
  
  getStop () {
    return Context.#STOP
  }
}