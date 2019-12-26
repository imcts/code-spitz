const Data = class {
  constructor (fileName) {
    if (!(typeof fileName === 'string' && fileName)) {
      throw new Error('The fileName is invalidated.')
    }
    this._fileName = fileName
  }

  async getData () {
    const json = await this._getData()
    return new Info(json)
  }

  async _getData () {
    throw new Error('The getData must be overridden.')
  }
}
