const EVENT = {
  CHANGE_FOLDER: 'CHANGE_FOLDER',
  CHANGE_TASK: 'CHANGE_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  ORDER_TITLE: 'ORDER_TITLE',
  ORDER_DATE: 'ORDER_DATE',
  ORDER_GROUP: 'ORDER_GROUP'
}

const TodoView = class {
  constructor (selector, model) {
    if (!selector) {
      throw new TypeError('The selector has not been existed.')
    }
    if(!(model instanceof TodoModel)) {
      throw new TypeError('The model must be the type of TodoModel.')
    }
    this._wrapper = document.querySelector(selector)
    this._model = model

    this._renderer = new Renderer(
      new DomVisitor(this._wrapper)
        .setTaskDecorator(new PriorityDecorator(), new MemberDecorator(['dolen', 'sirupe']), new RemoveDecorator())
        .setFolderDecorator(new SymbolDecorator(), new PriorityDecorator(), new MemberDecorator(['dolen', 'sirupe']))
    ).render(model.getData())
    this._renderer.addObserver(this)
  }

  observe (event, ...args) {
    switch (event) {
      case EVENT.CHANGE_FOLDER:
        this._onClickFolder(...args)
        break
      case EVENT.CHANGE_TASK:
        this._onClickTask(...args)
        break
      case EVENT.ORDER_TITLE:
      case EVENT.ORDER_DATE:
      case EVENT.ORDER_GROUP:
        this._onClickOrderButton(...args)
        break
      case EVENT.REMOVE_TASK:
        this._removeTask(...args)

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

  _removeTask (task) {
    const model = this._model
    model.removeTask(task)
    this._renderer.render(model.getData())
  }
}
