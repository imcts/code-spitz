const Visitor = class Visitor {
  order () {
    throw new Error('This method must be overridden.')
  }

  folders () {
    throw new Error('This method must be overridden.')
  }

  folder () {
    throw new Error('This method must be overridden.')
  }

  parent () {
    throw new Error('This method must be overridden.')
  }

  task () {
    throw new Error('This method must be overridden.')
  }
}
