const ViewModelValue = class {
  #category
  #viewModel
  
  static of (category, viewModel) {
    Assertion.assertString(category)
    Assertion.assertInstanceOf(viewModel, ViewModel)
    return new ViewModelValue(category, viewModel)
  }
  
  constructor (category, viewModel) {
    this.#category = category
    this.#viewModel = viewModel
  }
  
  getCategory () {
    return this.#category
  }
  
  getViewModel () {
    return this.#viewModel
  }
}
