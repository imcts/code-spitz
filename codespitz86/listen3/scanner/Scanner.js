const Scanner = class extends Set {
  static #PRIVATE = Symbol()
  
  #element
  
  static from (element) {
    Assertion.assertInstanceOf(element, HTMLElement)
    return new Scanner(this.#PRIVATE, element)
  }
  
  constructor (PRIVATE, element) {
    if (PRIVATE !== Scanner.#PRIVATE) {
      throw new Error(ERROR.DO_NOT_MAKE_INSTANCE)
    }
    super()
    this.#element = element
    Object.freeze(this)
  }
  
  scan () {
    const items = []
    items.push(this.#element)
    const stack = [this.#element.firstElementChild]
    let element
    while (element = stack.pop()) {
      items.push(element)
      const {firstElementChild, nextElementSibling} = element
      firstElementChild && stack.push(firstElementChild)
      nextElementSibling && stack.push(nextElementSibling)
    }
    return items
  }
  
  add () {}
  delete () {}
  clear () {}
  has () {}
}
