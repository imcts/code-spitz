const el = (tag, attr = {}) =>
  Object.entries(attr)
        .reduce(
          (el, [prop, val]) => typeof el[prop] === 'function'
            ? (el[prop](val), el)
            : (el[prop] = val, el),
          document.createElement(tag)
        )

const DomVisitor = class extends Visitor {
  order (wrapper, orderState) {
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

    wrapper.appendChild(title)
    wrapper.appendChild(date)
    wrapper.appendChild(group)
  }

  folders (wrapper, folders) {
    const div = el('div', {id: 'folders'})
    const ul = el('ul')
    folders.forEach(folder => ul.appendChild(el('li', {innerHTML: folder.title, folder})))
    div.appendChild(ul)
    wrapper.appendChild(div)
  }

  folder (wrapper, {title}) {
    const div = el('div', {id: 'folder'})
    div.appendChild(el('h1', {innerHTML: title}))
    return wrapper.appendChild(div)
  }

  parent (parent) {
    return parent.appendChild(el('ul'))
  }

  task (parent, task) {
    const li = parent.appendChild(el('li'))
    li.appendChild(el('div', {innerHTML: task.title, task}))
    task.isComplete() && (li.className = 'complete')
    return li
  }
}
