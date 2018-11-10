const TableRenderer = class extends Renderer {
  _render () {
    const element = document.querySelector(this._element)
    if (!element) {
      throw new TypeError('The element is invalidated.')
    }

    element.innerHTML = ''

    const [table, caption, thead] = 'table,caption,thead'.split(',').map(v => document.createElement(v))
    caption.innerHTML = this._title;
    [
      caption,
      this._header.reduce((_, v) => (thead.appendChild(document.createElement('th')).innerHTML = v, thead)),
      ...this._items.map(item => item.reduce(
        (tr, v) => (tr.appendChild(document.createElement('td')).innerHTML = v, tr), document.createElement('tr')
      ))
    ].forEach(el => table.appendChild(el))
    element.appendChild(table)
  }
}
