const MdParser = class extends Parser {
  static parse (content) {
    return decodeURIComponent(
      atob(content).split('').map(char => '%' + char.charCodeAt(0).toString(16).padStart(2, '0')).join('')
    )
    .split('\n').map(content => {
      let i = 3
      while (i--) {
        const hashCount = i + 1
        if (content.startsWith('#'.repeat(hashCount)))
          return `<h${hashCount}>${content.substr(hashCount)}</h${hashCount}>`
      }
      return content
    }).join('<br>')
  }

  constructor (element) {
    super(element)
  }

  parse (content) {
    this._element.innerHTML = MdParser.parse(content)
  }
}
