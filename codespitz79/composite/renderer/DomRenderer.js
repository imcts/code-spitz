const el = (tag, attr = {}) =>
  Object.entries(attr)
        .reduce(
          (el, [prop, val]) => typeof el[prop] === 'function'
              ? (el[prop](val), el)
              : (el[prop] = val, el),
          document.createElement(tag)
        )

const DomRenderer = class {
  constructor (selector, model) {
    if (!selector) {
      throw new TypeError('The selector has not been existed.')
    }
    if(!(model instanceof Task)) {
      throw new TypeError('The model must be the type of Task.')
    }
    this._parent = document.querySelector(selector)
    this._model = model
    this._bindEvents()
  }

  _bindEvents () {
    this._parent.addEventListener('click', this._clickTask.bind(this))
  }

  _clickTask (e) {
    const {task} = e.target
    task && task.toggle()
    this.render()
  }

  _toggleChildren (list) {
    list.forEach(({task, list}) => {
      task.toggle()
      list.length && this._toggleChildren(list)
    })
  }

  render () {
    const {task, list} = this._model.list()
    const parent = this._parent
    parent.innerHTML = ''
    parent.appendChild(el('h1', {innerHTML: task.title}))
    parent.appendChild(this._render(el('ul'), list))
  }

  _render (parent, list) {
    list.forEach(({task, list}) => {
      const li = parent.appendChild(el('li'))
      li.appendChild(el('div', {innerHTML: task.title, task, list}))
      task.isComplete() && (li.className = 'complete')
      list.length && li.appendChild(this._render(el('ul'), list))
    })
    return parent
  }
}
