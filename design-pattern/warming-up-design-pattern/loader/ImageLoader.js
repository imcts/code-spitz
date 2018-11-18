const ImageLoader = class extends Github {
  constructor (id, repo, img) {
    super(id, repo)
    if (!img) {
      throw new TypeError('The img have to be valid.')
    }
    this._img = img
  }

  _loaded (content) {
    this._img.src = 'data:text/plain;base64,' + content
  }
}
