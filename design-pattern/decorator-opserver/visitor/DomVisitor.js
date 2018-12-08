const el = (tag, attr = {}) =>
  Object.entries(attr)
        .reduce(
          (el, [prop, val]) => typeof el[prop] === 'function'
            ? (el[prop](val), el)
            : (el[prop] = val, el),
          document.createElement(tag)
        )

const DomVisitor = class extends Visitor {
  folders (folders) {
    const div = el('div', {id: 'folders'})
    const ul = el('ul')
    folders.forEach(folder => ul.appendChild(el('li', {innerHTML: folder.title, folder})))
    div.appendChild(ul)
    this.wrapper.appendChild(div)
  }

  folder ({title}) {
    const div = el('div', {id: 'folder'})
    div.appendChild(el('h1', {innerHTML: title}))
    this.wrapper.appendChild(div)
    this.parent = div
  }

  order (orderState) {
    const [title, date, group] = [
      el('button', {innerHTML: '제목순'}),
      el('button', {innerHTML: '날짜순'}),
      el('button', {innerHTML: '완료순'})
    ]

    if (orderState.order === ORDER_BY.TITLE) {
      title.style.color = 'red'
    }
    if (orderState.order === ORDER_BY.DATE) {
      date.style.color = 'red'
    }
    if (orderState.group) {
      group.style.color = 'red'
    }

    title.dataset.order = ORDER_BY.TITLE
    date.dataset.order = ORDER_BY.DATE
    group.dataset.order = ORDER_BY.GROUP

    const parent = this.parent
    parent.appendChild(title)
    parent.appendChild(date)
    parent.appendChild(group)
  }

  clear () {
    this._wrapper.innerHTML = ''
  }

  makeParent (task) {
    this.parents = this.parent
    this.parent = this.parent.appendChild(el('ul'))
  }

  removeParentNode () {
    const parent = this.parents.pop()
    if (parent && parent.id !== 'folder') {
      this.parent = parent
    }
  }

  task (task) {
    const li = this.parent.appendChild(el('li'))
    li.appendChild(el('div', {innerHTML: task.title, task}))
    task.isComplete() && (li.className = 'complete')
    this.parent = li
  }
}
