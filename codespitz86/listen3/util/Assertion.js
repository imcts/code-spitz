const ERROR = {
  OVERRIDE: 'It must be overridden.',
  NOT_EXIST: 'It must be existed.',
  TYPE_MISS_MATCH: 'The type is mismatched.',
  DO_NOT_MAKE_INSTANCE: 'The constructor of the class is private method.',
  IS_NOT_CHILD_INSTANCE: 'The child is not a instance of the parent.'
}

const Assertion = class {
  static #TYPE_OF_OBJECT = 'object'
  static #TYPE_OF_STRING = 'string'
  static #TYPE_OF_BOOLEAN = 'boolean'
  static #TYPE_OF_NUMBER = 'number'
  static #TYPE_OF_FUNCTION = 'function'

  static assertInstanceOf (child, parent) {
    if (child instanceof parent) {
      return child
    }
    throw new TypeError(ERROR.IS_NOT_CHILD_INSTANCE)
  }

  static assertArray (target) {
    if (Array.isArray(target)) {
      return target
    }
    throw new TypeError(ERROR.TYPE_MISS_MATCH)
  }

  static assertExisting (target) {
    if (target) {
      return target
    }
    throw new TypeError(ERROR.NOT_EXIST)
  }

  static assertObject (target) {
    return this.assertType(target, this.#TYPE_OF_OBJECT)
  }

  static assertString (target) {
    return this.assertType(target, this.#TYPE_OF_STRING)
  }

  static assertFunction (target) {
    return this.assertType(target, this.#TYPE_OF_FUNCTION)
  }

  static assertBoolean (target) {
    return this.assertType(target, this.#TYPE_OF_BOOLEAN)
  }

  static assertNumber (target) {
    return this.assertType(target, this.#TYPE_OF_NUMBER)
  }

  static assertType (target, type) {
    if (typeof target === type) {
      return target
    }
    throw new TypeError(ERROR.TYPE_MISS_MATCH)
  }
}
