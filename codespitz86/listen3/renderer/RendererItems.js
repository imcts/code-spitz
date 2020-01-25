const RendererItems = class extends Set {
  static #PRIVATE = Symbol()
  
  static from (elements) {
    Assertion.assertArray(elements)
    return new RendererItems(RendererItems.#PRIVATE, elements.map(RendererItem.from))
  }
  
  constructor (PRIVATE, items) {
    if (PRIVATE !== RendererItems.#PRIVATE) {
      throw new Error(ERROR.DO_NOT_MAKE_INSTANCE)
    }
    super(items)
    Object.freeze(this)
  }
  
  getRendererItem (viewModel) {
    for (const item of this) {
      if (item.hasKey(viewModel)) {
        return item
      }
    }
  }
  
  add (item) {
    Assertion.assertInstanceOf(item, RendererItem)
    super.add(item)
  }

  delete () {}
  clear () {}
  has () {}
}
