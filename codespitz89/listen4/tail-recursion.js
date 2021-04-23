const objectStringify = (() => {
  function * objectGenerator (object) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        yield [key, object[key]];
      }
    }
  }
  const Escape = class {
    static #TABLE = [['\"', '\\\"'], ['\n', '\\n'], ['\t', '\\t']];
    static escape (v) {
      let acc = v;
      for (const [regexp, escaped] of this.#TABLE) {
        acc = acc.replace(new RegExp(regexp, 'g'), escaped);
      }
      return `"${acc}"`;
    }
  }
  const Compiler = class {
    static #NULL = 'null'
    static #TABLE = {
      number: (key, value) => `"${key}":${value}`,
      boolean: (key, value) => `"${key}":${value}`,
      null: (key, value) => `"${key}":${value}`,
      string: (key, value) => `"${key}":${Escape.escape(value)}`,
    };
    static compile ([key, value]) {
      return this.#TABLE[value === null ? this.#NULL : typeof value]?.(key, value) ?? ''
    }
    static nodeToString (node) {
      const arr = [];
      let element = node;
      do {
        arr.unshift(Compiler.compile(element.value));
      } while (element = element.prev);
      let result = '';
      for (let i = 0, v; v = arr[i++];) v && (result += `,${v}`);
      return `{${result.slice(1)}}`;
    }
  }
  const objectStringify = (iterator, node) => {
    const {value, done} = iterator.next();
    if (done) {
      return Compiler.nodeToString(node);
    } else {
      return objectStringify(iterator, {prev: node, value});
    }
  }
  return object => {
    if (!object || typeof object !== 'object') {
      throw new TypeError('invalid object');
    }
    return objectStringify(objectGenerator(object), null);
  }
})();

export default objectStringify