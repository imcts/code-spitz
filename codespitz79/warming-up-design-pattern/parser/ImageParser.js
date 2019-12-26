const ImageParser = class extends Parser {
  constructor (element) {
    super(element)
  }

  parse (content) {
    this._element.src = `data:text/plain;base64,${content}`
  }
}
