const RendererItem = class {
  #element
  
  static #PRIVATE = Symbol()
  
  static from (element) {
    Assertion.assertInstanceOf(element, HTMLElement)
    return new RendererItem(RendererItem.#PRIVATE, element)
  }
  
  constructor (PRIVATE, element) {
    if (PRIVATE !== RendererItem.#PRIVATE) {
      throw new Error('Constructor must be called by from method.')
    }
    this.#element = element
  }
  
  getElement () {
    return this.#element
  }
  
  getKey () {
    return this.#element.dataset.key
  }
}
