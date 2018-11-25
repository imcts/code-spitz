const ORDER_BY = {
  TITLE: 'TITLE',
  DATE: 'DATE'
}

const Task = class {
  constructor (title, date) {
    this._title = title
    this._date = date
    this._complete = false
    this._list = []
  }

  isComplete () {
    return this._complete
  }

  toggle () {
    this._complete = !this._complete
  }

  add (title, date = Date.now()) {
    this._list.push(new Task(title, date))
  }

  remove (task) {
    const list = this._list
    if (list.includes(task)) {
      list.splice(list.indexOf(task), 1)
    }
  }

  byTitle (stateGroup = true) {
    return this.list(ORDER_BY.TITLE, stateGroup)
  }

  byDate (stateGroup = true) {
    return this.list(ORDER_BY.DATE, stateGroup)
  }

  list (orderBy, stateGroup = true) {
    const list = this._list
    const sort = (source, target) => source[orderBy] > target[orderBy]
    const map = task => task.list(orderBy, stateGroup)
    return {
      task: this,
      list: !stateGroup
        ? [...list].sort(sort).map(map)
        : [
          ...list.filter(v => !v.isComplete()).sort(sort).map(map),
          ...list.filter(v => v.isComplete()).sort(sort).map(map)
        ]
    }
  }

  get title () {
    return this._title
  }
}
