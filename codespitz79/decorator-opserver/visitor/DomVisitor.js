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
    const wrapper = el('div', {id: 'folders'})
    const ul = el('ul')
    folders.forEach(folder => {
      const li = el('li')
      this.folderRender(li, folder)
      li.onclick = e => {
        if (e.target.nodeName.toLowerCase() === 'li') {
          this.notify(EVENT.CHANGE_FOLDER, folder)
        }
      }
      ul.appendChild(li)
    })
    wrapper.appendChild(ul)
    this.wrapper.appendChild(wrapper)
  }

  folder (task) {
    const wrapper = el('div', {id: 'folder'})
    this.folderRender(wrapper.appendChild(el('h1')), task)
    this.wrapper.appendChild(wrapper)
    this.parent = wrapper
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

    title.onclick = () => this.notify(EVENT.ORDER_TITLE, ORDER_BY.TITLE)
    date.onclick = () => this.notify(EVENT.ORDER_DATE, ORDER_BY.DATE)
    group.onclick = () => this.notify(EVENT.ORDER_GROUP, ORDER_BY.GROUP)

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
    const li = el('li')
    if (task.isComplete()) {
      li.className = 'complete'
    }
    this.taskRender(li.appendChild(el('div')), task)
    li.onclick = e => {
      if (e.target.nodeName.toLowerCase() === 'div') {
        this.notify(EVENT.CHANGE_TASK, task)
      }
      e.stopPropagation()
    }
    this.parent = this.parent.appendChild(li)
  }

  observe (event, ...args) {
    this.notify(event, ...args)
  }
}
