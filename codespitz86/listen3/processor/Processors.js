const Processors = class extends Set {
  static #PRIVATE = Symbol()
  
  static new () {
    return new Processors(Processors.#PRIVATE, [
      new class Style extends Processor {
        _process (item, viewModel) {
          const element = item.getElement()
          Object.entries(viewModel.getStyle()).forEach(([k, v]) => element.style[k] = v)
        }
      }('style'),
      new class Property extends Processor {
        _process (item, viewModel) {
          const element = item.getElement()
          Object.entries(viewModel.getProperty()).forEach(([k, v]) => element[k] = v)
        }
      }('property'),
      new class Attribute extends Processor {
        _process (item, viewModel) {
          const element = item.getElement()
          Object.entries(viewModel.getAttribute()).forEach(([k, v]) => element.setAttribute(k, v))
        }
      }('attribute'),
      new class Event extends Processor {
        _process (item, viewModel) {
          const element = item.getElement()
          Object.entries(viewModel.getEvent()).forEach(([k, v]) => element[`on${k}`] = e => v(e, viewModel))
        }
      }('event')
    ])
  }

  constructor (PRIVATE, processors) {
    if (PRIVATE !== Processors.#PRIVATE) {
      throw new Error(ERROR.DO_NOT_MAKE_INSTANCE)
    }
    super(processors)
    Object.freeze(this)
  }

  add (processor) {
    Assertion.assertInstanceOf(processor, Processor)
    super.add(processor)
  }

  process (item, viewModel) {
    this.forEach(processor => processor.process(item, viewModel))
  }
  
  getProcessor (viewModelValue) {
    Assertion.assertInstanceOf(viewModelValue, ViewModelValue)
    for (const processor of this) {
      if (processor.hasCategory(viewModelValue.getCategory())) {
        return processor
      }
    }
  }

  delete () {}
  clear () {}
  has () {}
}
