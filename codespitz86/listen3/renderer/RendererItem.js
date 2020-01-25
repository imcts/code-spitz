const RendererItem = class {
  #element
  
  static #PRIVATE = Symbol()
  
  static from (element) {
    Assertion.assertInstanceOf(element, HTMLElement)
    return new RendererItem(RendererItem.#PRIVATE, element)
  }
  
  constructor (PRIVATE, element) {
    if (PRIVATE !== RendererItem.#PRIVATE) {
      throw new Error(ERROR.DO_NOT_MAKE_INSTANCE)
    }
    this.#element = element
    Object.freeze(this)
  }

  getElement () {
    return this.#element
  }
  
  getKey () {
    return this.#element.dataset.key
  }
  
  hasKey (viewModel) {
    Assertion.assertInstanceOf(viewModel, ViewModel)
    return viewModel.hasKey(this.getKey())
  }
}
