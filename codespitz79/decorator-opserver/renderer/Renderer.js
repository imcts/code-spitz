const Renderer = class extends Observer {
  constructor (visitor) {
    if(!(visitor instanceof Visitor)) {
      throw new TypeError('The visitor must be the type of Visitor.')
    }
    super()
    this._visitor = visitor
    this._visitor.addObserver(this)
  }

  render ({folders, folder, orderState}) {
    const visitor = this._visitor

    visitor.clear()
    visitor.folders(folders)
    visitor.folder(folder.task)
    visitor.order(orderState)
    visitor.makeParent(folder.task)
    this._render(folder.list)
    return this
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

  observe (event, ...args) {
    this.notify(event, ...args)
  }
}
