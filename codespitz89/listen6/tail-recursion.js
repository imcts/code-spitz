export const Test = class {
  constructor (v1) {
    this.v1 = v1;
  }
}
export const Test1 = class {
  constructor (v1, v2) {
    this.v1 = v1;
    this.v2 = v2;
  }
}

const parse = (() => {
  const Type = class {
    static NUMBER = 'number';
    static CLASS_REG_EXP = /^\"(Test\d?)@(.+)\"$/;
    static DATE_REG_EXP = /^\"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\"$/;

    static isNumber (v) {
      return !isNaN(v) && typeof parseFloat(v) === this.NUMBER;
    }
    static isBoolean (v) {
      return v === Parser.TRUE || v === Parser.FALSE;
    }
    static isNull (v) {
      return v === Parser.NULL;
    }
    static isClass (v) {
      return this.CLASS_REG_EXP.test(v);
    }
    static isDate (v) {
      return this.DATE_REG_EXP.test(v);
    }
    static isString (v) {
      return v.toString().startsWith(Parser.QUOTE);
    }
  }

  const Parser = class {
    static OPEN = '[';
    static CLOSE = ']';
    static TRUE = 'true';
    static FALSE = 'false';
    static NULL = 'null';
    static COMMA = ','
    static QUOTE = '"';
    static PARAMETER_DELIMITER = '&';

    static #VALUE_TABLE = {
      number: v => parseFloat(v),
      boolean: v => v === this.TRUE,
      null: () => null,
      class: v => {
        const [, name, parameter] = v.match(Type.CLASS_REG_EXP);
        const params = parameter.split(this.PARAMETER_DELIMITER);
        switch (name) {
          case 'Test1':
            return new Test1(...params);
          default:
            return new Test(...params)
        }
      },
      date: v => {
        return new Date(v.replace(new RegExp(this.QUOTE, 'g'), ''));
      }
    };
    static parse (v) {
      switch (true) {
        case Type.isNull(v):
          return this.#VALUE_TABLE.null(v);
        case Type.isBoolean(v):
          return this.#VALUE_TABLE.boolean(v);
        case Type.isNumber(v):
          return this.#VALUE_TABLE.number(v);
        case Type.isClass(v):
          return this.#VALUE_TABLE.class(v);
        case Type.isDate(v):
          return this.#VALUE_TABLE.date(v);
        case Type.isString(v):
          return v.replace(new RegExp(this.QUOTE, 'g'), '');
        default:
          throw new TypeError('invalid value.');
      }
    }
  }
  const parse = (string, stack, acc) => {
    const str = string.trim();
    switch (str[0]) {
      case Parser.OPEN:
        stack.push(acc);
        return parse(str.slice(1), stack, []);
      case Parser.CLOSE:
        const parent = stack.pop();
        if (parent) {
          parent.push(acc);
          return parse(str.slice(1), stack, parent)
        } else {
          return acc;
        }
      case Parser.COMMA:
        return parse(str.slice(1), stack, acc);
      default:
        let commaIndex = str.indexOf(Parser.COMMA);
        let closeIndex = str.indexOf(Parser.CLOSE);
        const index = commaIndex !== -1 && commaIndex < closeIndex
          ? commaIndex
          : closeIndex;
        const found = str.slice(0, index);
        acc.push(Parser.parse(found))
        return parse(str.slice(found.length), stack, acc);
    }
  }
  return str => {
    if (!str) {
      throw new TypeError('invalid type');
    }
    return parse(str, [], null);
  }
})();

parse('[1, 2, 3, 4, 5, [], 6, [7, 8, [9, 10]], ["Test1@1"], "2021-05-01T19:20:09.336Z"]');
// result => [1, 2, 3, 4, 5, [], 6, [7, 8, [9, 10]], [new Test1('1')], new Date('2021-05-01T19:20:09.336Z')]

export default parse