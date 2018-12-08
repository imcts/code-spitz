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

    visitor.clear()
    visitor.folders(folders)
    visitor.folder(folder.task)
    visitor.order(orderState)
    visitor.makeParent(folder.task)
    this._render(folder.list)
  }

  _render (list) {
    const visitor = this._visitor
    list.forEach(({task, list}) => {
      visitor.task(task)
      if (list.length) {
        visitor.makeParent(task)
        this._render(list)
        visitor.removeParentNode()
      }
    })
  }
}
