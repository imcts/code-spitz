const Renderer = class extends Observer {
  static #PRIVATE = Symbol()
  
  #viewModels
  #rendererItems
  #processors
  
  static of (viewModels, scanner) {
    Assertion.assertInstanceOf(viewModels, ViewModels)
    Assertion.assertInstanceOf(scanner, Scanner)
    return new Renderer(this.#PRIVATE, viewModels, Processors.new(), RendererItems.from(scanner.scan()))
  }
  
  constructor (PRIVATE, viewModels, processors, rendererItems) {
    if (PRIVATE !== Renderer.#PRIVATE) {
      throw new Error(ERROR.DO_NOT_MAKE_INSTANCE)
    }
    super()
    this.#viewModels = viewModels
    this.#viewModels.addListener(this)
    this.#processors = processors
    this.#rendererItems = rendererItems
    this.render()
  }
  
  render () {
    this.#rendererItems.forEach(item => this.#processors.process(item, this.#viewModels.getViewModel(item.getKey())))
  }

  update (viewModelValue) {
    Assertion.assertInstanceOf(viewModelValue, ViewModelValue)
    const viewModel = viewModelValue.getViewModel()
    const rendererItem = this.#rendererItems.getRendererItem(viewModel)
    const processor = this.#processors.getProcessor(viewModelValue)
    processor.process(rendererItem, viewModel)
  }
}
