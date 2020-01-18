const Renderer = class {
  static #PRIVATE = Symbol()
  
  #viewModels
  #scanner
  
  static of (viewModels, scanner) {
    Assertion.assertInstanceOf(viewModels, ViewModels)
    Assertion.assertInstanceOf(scanner, Scanner)
    return new Renderer(this.#PRIVATE, viewModels, scanner)
  }
  
  constructor (PRIVATE, viewModels, scanner) {
    if (PRIVATE !== Renderer.#PRIVATE) {
      throw new Error('Constructor must be called by from method.')
    }
    this.#viewModels = viewModels
    this.#scanner = scanner
  }
  
  render () {
    this.#scanner.scan().forEach(rendererItem => {
      const element = rendererItem.getElement()
      const viewModel = this.#viewModels.getViewModel(rendererItem.getKey())
      Object.entries(viewModel.getStyle()).forEach(([k, v]) => element.style[k] = v)
      Object.entries(viewModel.getProperty()).forEach(([k, v]) => element[k] = v)
      Object.entries(viewModel.getAttribute()).forEach(([k, v]) => element.setAttribute(k, v))
      Object.entries(viewModel.getEvent()).forEach(([k, v]) => element[`on${k}`] = e => v(e, viewModel))
    })
  }
}
