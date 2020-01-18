const ViewModels = class extends Set {
  static #PRIVATE = Symbol()
  
  static from (data) {
    Assertion.assertArray(data)
    return new ViewModels(this.#PRIVATE, data.map(ViewModel.from))
  }
  
  constructor (PRIVATE, models) {
    if (PRIVATE !== ViewModels.#PRIVATE) {
      throw new Error('Constructor must be called by from method.')
    }
    super(models)
  }
  
  getViewModel (key) {
    Assertion.assertString(key)
    for (const viewModel of this) {
      if (viewModel.hasKey(key)) {
        return viewModel
      }
    }
  }

  delete () {/* Do nothing */}
  clear () {/* Do nothing */}
  has () {/* Do nothing */}
}