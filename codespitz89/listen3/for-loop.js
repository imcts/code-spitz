const arrayStringify = (() => {
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
    static #TABLE = {
      number: v => v.toString(),
      boolean: v => v.toString(),
      string: v => Escape.escape(v)
    };
    static toString (v) {
      return this.#TABLE[typeof v]?.(v) ?? 'null';
    }
  };
  return arr => {
    if (!Array.isArray(arr)) {
      throw new Error('invalid parameter.');
    }
    if (!arr.length) {
      return '[]';
    }
    let array = arr;
    let i = 0;
    let limit = arr.length - 1;
    let str = '';
    let done = false;
    let stack = [];

    while (!done) {
      const value = array[i];
      const acc = !i ? `${str}[` : str;

      if (Array.isArray(value)) {
        if (!value.length) {
          str = `${acc}[]${i < limit ? ',' : ''}`;
          i = i + 1;
        } else {
          stack.push({array, i, limit});
          array = value;
          i = 0;
          limit = value.length - 1;
          str = acc;
          stack = stack;
        }
      } else {
        if (i <= limit) {
          str = `${acc}${Compiler.toString(value)}${i < limit ? ',' : ''}`;
          i = i + 1;
          array = array;
          limit = limit;
          stack = stack;
        } else {
          if (stack.length) {
            const parent = stack.pop();
            str = `${acc}${i > limit ? '' : Compiler.toString(value)}]${parent.i < parent.limit ? ',' : ''}`;
            array = parent.array;
            i = parent.i + 1;
            limit = parent.limit;
            stack = stack;
          } else {
            str = `${acc}]`;
            done = true;
          }
        }
      }
    }
    return str;
  }
})();
console.log(arrayStringify([1, 2, ["a", [1, 2], false], 3, ["b", "c", [1, 2]]]) === JSON.stringify([1, 2, ["a", [1, 2], false], 3, ["b", "c", [1, 2]]]));
export default arrayStringify;
