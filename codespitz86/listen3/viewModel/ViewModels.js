const ViewModels = class extends Observer {
  static #PRIVATE = Symbol()
  static #subjects = new Set()
  static #initialized = false
  
  #viewModels
  #updated
  
  static notify (viewModels) {
    Assertion.assertInstanceOf(viewModels, ViewModels)
    ViewModels.#subjects.add(viewModels)
    if (ViewModels.#initialized) {
      return
    }
    ViewModels.#initialized = true
    const f = () => {
      ViewModels.#subjects.forEach(subject => subject.notify())
      requestAnimationFrame(f)
    }
    requestAnimationFrame(f)
  }
  
  static from (data) {
    Assertion.assertArray(data)
    return new ViewModels(this.#PRIVATE, data.map(ViewModel.from))
  }
  
  constructor (PRIVATE, viewModels) {
    if (PRIVATE !== ViewModels.#PRIVATE) {
      throw new Error(ERROR.DO_NOT_MAKE_INSTANCE)
    }
    super()
    this.#updated = new Set()
    this.#viewModels = viewModels
    this.#viewModels.forEach(viewModel => viewModel.addListener(this))
    ViewModels.notify(this)
    Object.freeze(this)
  }
  
  getViewModel (key) {
    Assertion.assertString(key)
    for (const viewModel of this.#viewModels) {
      if (viewModel.hasKey(key)) {
        return viewModel
      }
    }
  }

  update (viewModelValue) {
    Assertion.assertInstanceOf(viewModelValue, ViewModelValue)
    this.#updated.add(viewModelValue)
  }
  
  notify () {
    if (!this.#updated.size) {
      return
    }
    this.#updated.forEach(viewModelValue => super.notify(viewModelValue))
    this.#updated.clear()
  }
}