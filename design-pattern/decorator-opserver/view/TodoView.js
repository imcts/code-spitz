const TodoView = class {
  constructor (selector, model) {
    if (!selector) {
      throw new TypeError('The selector has not been existed.')
    }
    if(!(model instanceof TodoModel)) {
      throw new TypeError('The model must be the type of TodoModel.')
    }
    this._wrapper = document.querySelector(selector)
    this._renderer = new Renderer(this._wrapper, new DomVisitor(this._wrapper))
    this._model = model

    this._renderer.render(model.getData())
    this._bindEvents()
  }

  _bindEvents () {
    this._wrapper.addEventListener('click', this._click.bind(this))
  }

  _click (e) {
    // TODO 여기도 옵저버로 바꿀 수 있으면 좋겠네. 클릭된걸 notify 받으면 좋을테니.
    const {folder, task, dataset} = e.target

    if (folder) {
      this._onClickFolder(folder)
    } else if (task) {
      this._onClickTask(task)
    } else {
      this._onClickOrderButton(dataset.order)
    }
  }

  _onClickFolder (folder) {
    const model = this._model
    model.folder = folder
    this._renderer.render(model.getData())
  }

  _onClickTask (task) {
    task.toggle()
    this._renderer.render(this._model.getData())
  }

  _onClickOrderButton (order) {
    if (!order) {
      return
    }
    const model = this._model
    switch (order) {
      case ORDER_BY.TITLE:
        model.order = ORDER_BY.TITLE
        break;
      case ORDER_BY.DATE:
        model.order = ORDER_BY.DATE
        break;
      case ORDER_BY.GROUP:
        model.toggleGroup()
        break;
    }
    this._renderer.render(model.getData())
  }
}
