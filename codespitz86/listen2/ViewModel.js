const ViewModel = class {
  static #PRIVATE = Symbol()
  
  #key
  #model
  #stop
  
  static from (data) {
    Assertion.assertObject(data)
    return new ViewModel(ViewModel.#PRIVATE, data)
  }
  
  constructor (PRIVATE, data) {
    if (PRIVATE !== ViewModel.#PRIVATE) {
      throw new Error('Constructor must be called by from method.')
    }
    this.#model = new Map([
      ['style', {}],
      ['property', {}],
      ['attribute', {}],
      ['event', {}]
    ])
    this.#stop = false
    Object.entries(data).forEach(([k, v]) => {
      if (k === 'key') {
        this.#key = v
      } else {
        this.#model.set(k, v)
      }
    })
    Object.freeze(this)
  }
  
  hasKey (key) {
    Assertion.assertString(key)
    return this.#key === key
  }
  
  getStyle () {
    return this.#model.get('style')
  }
  
  getProperty () {
    return this.#model.get('property')
  }
  
  getAttribute () {
    return this.#model.get('attribute')
  }
  
  getEvent () {
    return this.#model.get('event')
  }
  
  changeColor () {
    this.#model.set('style', Object.assign(this.#model.get('style'), {
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