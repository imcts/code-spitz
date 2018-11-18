const CALL_BACK = 'CALL_BACK'

const Github = class {
  constructor (id, repository) {
    if (!id) {
      throw new TypeError('The id have to be valid.')
    }
    if (!repository) {
      throw new TypeError('The repository have to be valid.')
    }
    if (typeof Github.id === 'undefined') {
      Github.id = 0
    }
    this._base = `https://api.github.com/repos/${id}/${repository}/contents/`
  }

  load (path) {
    const id = `${CALL_BACK}_${Github.id}`
    Github[id] = ({data: {content}}) => {
      delete Github[id]
      document.head.removeChild(script)
      this._loaded(content)
    }

    const script = document.createElement('script')
    script.src = `${this._base + path}?callback=Github.${id}`
    document.head.appendChild(script)
  }

  _loaded (content) {
    throw new Error('This method need to be overridden.')
  }
}
