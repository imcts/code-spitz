const JsonData = class extends Data {
  constructor (fileName) {
    super(fileName)
    this._data = null
  }

  async _getData () {
    if (this._data) {
      return this._data
    } else {
      return this._data = await fetchJSON(this._fileName)
    }
  }
}
