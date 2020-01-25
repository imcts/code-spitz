const Scanner = class extends Set {
  static #PRIVATE = Symbol()
  
  #element
  
  static from (element) {
    Assertion.assertInstanceOf(element, HTMLElement)
    return new Scanner(this.#PRIVATE, element)
  }
  
  constructor (PRIVATE, element) {
    if (PRIVATE !== Scanner.#PRIVATE) {
      throw new Error('Constructor must be called by from method.')
    }
    super()
    this.#element = element
  }
  
  scan () {
    if (this.size) {
      return new Set(this)
    }
    super.clear()
    super.add(RendererItem.from(this.#element))
    const stack = [this.#element.firstElementChild]
    let element
    while (element = stack.pop()) {
      super.add(RendererItem.from(element))
      const {firstElementChild, nextElementSibling} = element
      firstElementChild && stack.push(firstElementChild)
      nextElementSibling && stack.push(nextElementSibling)
    }
    return new Set(this)
  }
  
  add () {}
  delete () {}
  clear () {}
  has () {}
}
