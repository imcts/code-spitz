/**
 * TODO
 *  1. validator를 수행하고 object stringify를 한다.
 *  2. 이터레이터와 accumulator를 전달받는다.
 *  3. 이터레이터를 순차적으로 순회하며 실행한다.
 *    1. 순회가 종료된 경우
 *      1. 스택에 담긴 문자열과 value에 담긴 부모의 래핑타입으로 문자열을 생성한다.
 *        1. 부모가 존재하는 경우 (부모의 순회가 종료되지 않았다.)
 *          1. 부모 객체의 문자열 스택에 내가 만든 문자열을 넣는다.
 *          2. 부모의 이터레이터를 가지고온다.
 *          3. 부모의 스택을 가지고온다.
 *          4. 재귀 함수를 실행한다.
 *        2. 부모가 존재하지 않는 경우 (모든 루프가 종료되었다.)
 *          1. 현재까지의 문자열을 반환한다.
 *    2. 순회가 종료되지 않은 경우.
 *      1. 원소가 배열인 경우
 *        1. 원소가 배열타입이므로 새로운 이터레이터를 생성한다.
 *        2. 부모는 현재 래핑객체 이므로 이터레이터와 문자열 스택을 저장한다.
 *        3. 새로운 문자열 스택을 생성한다.
 *        4. 재귀함수를 실행한다.
 *      2. 원소가 객체인 경우
 *        1. 원소가 객체이므로 새로운 이터레이터를 생성한다.
 *        2. 부모는 현재 래핑 객체이므로 이터레이터와 문자열 스택을 저장한다.
 *        3. 새로운 문자열 스택을 생성한다.
 *        4. 재귀함수를 실행한다.
 *      3. 원소가 값인 경우
 *        1. 이터레이터는 동일하다.
 *        2. 부모는 동일하다.
 *        3. prev도 동일하게 연결한다.
 *        4. stack에는 문자열을 넣어준다.
 *        5. 재귀를 다시 호출한다.
 */
const stringify = (() => {
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
    static #NULL = 'null';

    static #VALUE_TABLE = {
      number: value => value.toString(),
      boolean: value => value.toString(),
      string: value => Escape.escape(value)
    };
    static #OBJECT_TABLE = {
      number: (key, value) => `"${key}":${value}`,
      boolean: (key, value) => `"${key}":${value}`,
      null: (key, value) => `"${key}":${value}`,
      string: (key, value) => `"${key}":${Escape.escape(value)}`,
    };
    static toSingleString (v) {
      return this.#VALUE_TABLE[typeof v]?.(v) ?? 'null';
    }
    static toPairString (key, value) {
      return this.#OBJECT_TABLE[value === null ? this.#NULL : typeof value]?.(key, value) ?? ''
    }
    static dataToString (data) {
      const {key, value} = data
      if (key) {
        return this.toPairString(key, value);
      } else {
        return this.toSingleString(value);
      }
    }
    static toString (type, parent, stack) {
      const [START, END] = type === Type.ARRAY
        ? '[]'
        : type === Type.OBJECT ? '{}' : ['', ''];
      let result = '';
      for (const string of stack) {
        if (string) {
          result += `,${string}`;
        }
      }
      if (type === Type.ARRAY || type === Type.OBJECT) {
        const {key} = parent?.data ?? {};
        if (key) {
          return `"${key}":${START}${result.slice(1)}${END}`;
        } else {
          return `${START}${result.slice(1)}${END}`;
        }
      } else {
        return `${START}${result.slice(1)}${END}`;
      }
    }
  }
  const Type = class {
    static ARRAY = 'array';
    static OBJECT = 'object';
    static VALUE = 'value';
  }
  function * objectValueGenerator (parentKey, value) {
    yield {
      type: Type.VALUE,
      data: {
        array: Validator.isArray(value),
        object: Validator.isObject(value),
        variable: Validator.isVariable(value),
        key: parentKey,
        value
      }
    };
    return {type: Type.VALUE}
  }
  function * valueGenerator (value) {
    yield {
      type: Type.VALUE,
      data: {
        array: Validator.isArray(value),
        object: Validator.isObject(value),
        variable: Validator.isVariable(value),
        value
      }
    };
    return {type: Type.VALUE}
  }
  function * objectGenerator (object) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const value = object[key];
        yield {
          type: Type.OBJECT,
          data: {
            array: Validator.isArray(value),
            object: Validator.isObject(value),
            variable: Validator.isVariable(value),
            key,
            value
          }
        }
      }
    }
    return {type: Type.OBJECT};
  }
  function * arrayGenerator (arr) {
    for (const value of arr) {
      yield {
        type: Type.ARRAY,
        data: {
          array: Validator.isArray(value),
          object: Validator.isObject(value),
          variable: Validator.isVariable(value),
          value
        }
      }
    }
    return {type: Type.ARRAY};
  }

  function * generator (data, parentKey) {
    if (Validator.isObjectType(data)) {
      if (Validator.isJSONOverridden(data)) {
        const value = data.toJSON();
        if (Validator.isObjectType(value)) {
          if (Validator.isArray(value)) {
            return yield * arrayGenerator(value);
          } else {
            return yield * objectGenerator(value);
          }
        } else {
          return yield * objectValueGenerator(parentKey, value);
        }
      } else {
        if (Validator.isArray(data)) {
          return yield * arrayGenerator(data);
        } else {
          return yield * objectGenerator(data);
        }
      }
    } else {
      return yield * valueGenerator(data);
    }
  }
  const Validator = class {
    static #FUNCTION = 'function';
    static #SYMBOL = 'symbol';
    static #OBJECT = 'object';
    static #UNDEFINED = undefined;

    static isJSONOverridden (data) {
      return this.isObjectType(data) && this.isFunction(data.toJSON)
    }
    static isObjectType (data) {
      return this.isArray(data) || this.isObject(data);
    }
    static isArray (data) {
      return Array.isArray(data);
    }
    static isObject (data) {
      return data && !this.isArray(data) && typeof data === this.#OBJECT;
    }
    static isVariable (data) {
      return !this.isObject(data);
    }
    static isFunction (data) {
      return typeof data === this.#FUNCTION;
    }
    static isSymbol (data) {
      return typeof data === this.#SYMBOL;
    }
    static isUndefined (data) {
      return data === this.#UNDEFINED;
    }
    static isUndefinable (data) {
      return this.isSymbol(data) || this.isUndefined(data) || this.isFunction(data);
    }
  }
  const stringify = (iterator, parent, stack, type) => {
    const {value, done} = iterator.next();
    type = value?.type ?? type;
    if (done) {
      const str = Compiler.toString(type, parent, stack);
      if (parent) {
        const {stack: parentStack} = parent;
        parentStack.push(str);
        return stringify(parent.iterator, parent.parent, parentStack, type);
      } else {
        return str;
      }
    } else {
      const {data} = value;
      switch (true) {
        case data.array:
        case data.object:
          return stringify(generator(data.value, data.key), {iterator, parent, data, stack}, [], type);
        case data.variable:
          stack.push(Compiler.dataToString(data));
          return stringify(iterator, parent, stack, type);
        default:
          stack.push(Compiler.dataToString(data));
          return stringify(iterator, parent, stack, type);
      }
    }
  }
  return data => {
    if (Validator.isUndefinable(data)) {
      return undefined;
    } else {
      //return stringify(generator(data), null, [], '');
      let iterator = generator(data);
      let parent = null;
      let stack = [];
      let type = '';
      while (true) {
        const {value, done} = iterator.next();
        type = value?.type ?? type;
        if (done) {
          const str = Compiler.toString(type, parent, stack);
          if (parent) {
            const {stack: parentStack} = parent;
            parentStack.push(str);
            iterator = parent.iterator;
            parent = parent.parent;
            stack = parentStack;
            type = type;
          } else {
            return str;
          }
        } else {
          const {data} = value;
          switch (true) {
            case data.array:
            case data.object:
              parent = {iterator, parent, data, stack};
              iterator = generator(data.value, data.key);
              stack = [];
              type = type;
              break;
            default:
              stack.push(Compiler.dataToString(data));
              iterator = iterator;
              parent = parent;
              stack = stack;
              type = type;
              break;
          }
        }
      }
    }
  }
})();

const arr1 = [];
arr1.toJSON = () => {
  return 1;
}
const arr2 = [];
arr2.toJSON = () => {
  return {a: 3};
}
//
stringify(
  {arr1, arr2, a: [1, '2', Symbol(), null, true, false], b: [], c: 3, e: {f: {}, g: [], h: () => {}}, i: {j: 4, toJSON () {return 4}}, k: {k: 5, toJSON () {return {k: 5, l: 6}}}}
) === JSON.stringify(
  {arr1, arr2, a: [1, '2', Symbol(), null, true, false], b: [], c: 3, e: {f: {}, g: [], h: () => {}}, i: {j: 4, toJSON () {return 4}}, k: {k: 5, toJSON () {return {k: 5, l: 6}}}}
)

export default stringify