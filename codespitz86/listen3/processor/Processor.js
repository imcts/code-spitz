const Processor = class {
  #category
  
  constructor (category) {
    Assertion.assertString(category)
    this.#category = category
  }
  
  process (item, viewModel) {
    Assertion.assertInstanceOf(item, RendererItem)
    Assertion.assertInstanceOf(viewModel, ViewModel)
    this._process(item, viewModel)
  }
  
  _process (item, viewModel) {
    throw new Error(ERROR.OVERRIDE)
  }
  
  hasCategory (category) {
    return this.#category === category
  }
}
