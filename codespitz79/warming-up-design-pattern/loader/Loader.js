const Loader = class {
  constructor () {
    this._repository = new Map()
  }

  addRepository (repository, id) {
    if (!id) {
      throw new TypeError('The id has not been existed.')
    }
    if (!repository) {
      throw new TypeError('The repository has not been existed.')
    }
    if (!this._repository.has(repository)) {
      this._repository.set(repository, {
        router: new Map(),
        loader: new Github(id, repository)
      })
    }
  }

  addRouter (repository, extensions, parser) {
    if (!this._repository.has(repository)) {
      throw new TypeError('The repository has not been existed.')
    }
    if (!extensions) {
      throw new TypeError('The extensions have not been existed.')
    }
    if (!parser) {
      throw new TypeError('The parser has not been existed.')
    }

    const {router} = this._repository.get(repository)
    extensions
      .toLowerCase()
      .split(',')
      .forEach(extension => router.set(extension, parser))
  }

  load (repository, path) {
    if (!this._repository.has(repository)) {
      throw new TypeError('The repository has not been existed.')
    }
    if (!path) {
      throw new TypeError('The path has not been existed.')
    }

    const {router, loader} = this._repository.get(repository)
    const extension = path.toLowerCase().split('.').pop()

    if (!router.has(extension)) {
      throw new TypeError('The parser has not been existed.')
    }
    loader.parser = router.get(extension)
    return loader.load(path)
  }
}
