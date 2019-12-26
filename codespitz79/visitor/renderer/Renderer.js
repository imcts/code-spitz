const Renderer = class {
  constructor (wrapper, visitor) {
    if (!wrapper) {
      throw new TypeError('The wrapper has not been existed.')
    }
    if(!(visitor instanceof Visitor)) {
      throw new TypeError('The visitor must be the type of Visitor.')
    }
    this._wrapper = wrapper
    this._visitor = visitor
  }

  render ({folders, folder, orderState}) {
    const visitor = this._visitor
    let wrapper = this._wrapper

    wrapper.innerHTML = ''
    visitor.folders(wrapper, folders)

    wrapper = visitor.folder(wrapper, folder.task)
    visitor.order(wrapper, orderState)
    this._render(visitor.parent(wrapper), folder.list)
  }

  _render (wrapper, list) {
    const visitor = this._visitor
    list.forEach(({task, list}) => this._render(visitor.parent(visitor.task(wrapper, task)), list))
    return wrapper
  }
}
