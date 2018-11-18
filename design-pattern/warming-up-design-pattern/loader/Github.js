const CALL_BACK = 'CALL_BACK'

const Github = class {
  constructor (id, repository) {
    if (!id) {
      throw new TypeError('The id has not been existed.')
    }
    if (!repository) {
      throw new TypeError('The repository has not been existed.')
    }
    if (typeof Github.id === 'undefined') {
      Github.id = 0
    }
    this._base = `https://api.github.com/repos/${id}/${repository}/contents/`
    this._parser = null
  }

  load (path) {
    return new Promise(res => {
      const id = `${CALL_BACK}_${Github.id++}`
      Github[id] = ({data: {content}}) => {
        delete Github[id]
        document.head.removeChild(script)
        this._parser.parse(content)
        res()
      }
      const script = document.createElement('script')
      script.src = `${this._base + path}?callback=Github.${id}`
      document.head.appendChild(script)
    })
  }

  set parser (parser) {
    if(!(parser instanceof Parser)) {
      throw new TypeError('The parser must be the type of Parser.')
    }
    if (this._parser !== parser) {
      this._parser = parser
    }
  }
}
