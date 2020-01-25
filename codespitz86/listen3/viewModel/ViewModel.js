const ViewModel = class extends Observer {
  static #PRIVATE = Symbol()
  
  #key
  #model
  #stop
  
  static from (data) {
    Assertion.assertObject(data)
    return new ViewModel(ViewModel.#PRIVATE, data)
  }
  
  static define (viewModel, category, data) {
    Assertion.assertInstanceOf(viewModel, ViewModel)
    Assertion.assertObject(data)
    return Object.defineProperties(data, Object.entries(data).reduce((accumulator, [k, v]) => {
      accumulator[k] = {
        enumerable: true,
        get: () => v,
        set: newValue => {
          v = newValue
          viewModel.notify(ViewModelValue.of(category, viewModel))
        }
      };
      return accumulator
    }, {}))
  }
  
  constructor (PRIVATE, data) {
    if (PRIVATE !== ViewModel.#PRIVATE) {
      throw new Error(ERROR.DO_NOT_MAKE_INSTANCE)
    }
    super()
    this.#model = new Map([
      [CATEGORY.STYLE, {}],
      [CATEGORY.PROPERTY, {}],
      [CATEGORY.ATTRIBUTE, {}],
      [CATEGORY.EVENT, {}]
    ])
    this.#stop = false
    Object.entries(data).forEach(([k, v]) => {
      if (k === CATEGORY.KEY) {
        this.#key = v
      } else {
        this.#model.set(k, ViewModel.define(this, k, v))
      }
    })
    Object.freeze(this)
  }
  
  hasKey (key) {
    Assertion.assertString(key)
    return this.#key === key
  }
  
  getStyle () {
    return this.#model.get(CATEGORY.STYLE)
  }
  
  getProperty () {
    return this.#model.get(CATEGORY.PROPERTY)
  }
  
  getAttribute () {
    return this.#model.get(CATEGORY.ATTRIBUTE)
  }
  
  getEvent () {
    return this.#model.get(CATEGORY.EVENT)
  }

  changeColor () {
    this.#model.set(CATEGORY.STYLE, Object.assign(this.#model.get(CATEGORY.STYLE), {
      background: `rgb(${Math.random() * 150 + 100}, ${Math.random() * 150 + 100}, ${Math.random() * 150 + 100})`
    }))
  }
  
  stop () {
    this.#stop = true
  }
  
  isStop () {
    return this.#stop
  }
}