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

  const arrayStringify = (arr, i, limit, str, stack) => {
    const value = arr[i];
    const acc = !i ? `${str}[` : str;
    /**
     * TODO
     *  - 원소가 배열인 경우
     *  0. 배열의 길이가 없는 경우 그냥 계속해서 다음 회차를 순회한다.
     *    1. 부모 배열이 마지막 차수가 아닌경우 콤마를 붙여준다.
     *  1. 스택에 현재 위치를 저장한다.
     *  2. 자식 배열을 기준으로 순회하기 시작한다.
     */
    if (Array.isArray(value)) {
      if (!value.length) {
        return arrayStringify(arr, i + 1, limit, `${acc}[]${i < limit ? ',' : ''}`, stack);
      } else {
        stack.push({arr, i, limit});
        return arrayStringify(value, 0, value.length - 1, acc, stack);
      }
    } else {
      if (i <= limit) {
        /**
         * TODO
         *  - 배열의 순회가 완료되지 않았으므로 값을 이어붙인다.
         *  - 순회의 마지막 차수 여부에 따라 콤마를 붙인다.
         */
        const str = `${acc}${Compiler.toString(value)}${i < limit ? ',' : ''}`;
        return arrayStringify(arr, i + 1, limit, str, stack);
      } else {
        /**
         * TODO
         *  - 배열의 순회가 완료 되었다.
         *  1. 스택이 남아있는 경우 부모가 존재한다는 의미이다.
         *  2. 스택에서 객체를 꺼내어 parent를 구한다.
         *  3. 현재 값을 acc에 ]를 추가하여 더해준다.
         *  4. 만약 부모의 순회가 끝나지 않은 경우 콤마를 더한다.
         *  5. i가 limit보다 클 때가 있다. 그런 경우라면 v값을 더해주지 않는다.
         */
        if (stack.length) {
          const parent = stack.pop();
          const str = `${acc}${i > limit ? '' : Compiler.toString(value)}]${parent.i < parent.limit ? ',' : ''}`;
          return arrayStringify(parent.arr, parent.i + 1, parent.limit, str, stack);
        } else {
          /**
           * TODO
           *  - 배열의 순회가 완료 되었다.
           *  - ] 를 추가하여 막아준다.
           */
          return `${acc}]`;
        }
      }
    }
  }
  return arr => {
    if (!Array.isArray(arr)) {
      throw new Error('invalid parameter.');
    }
    if (!arr.length) {
      return '[]';
    }
    return arrayStringify(arr, 0, arr.length - 1, '', []);
  }
})();
console.log(arrayStringify([1, 2, ["a", [1, 2], false], 3, ["b", "c", [1, 2]]]) === JSON.stringify([1, 2, ["a", [1, 2], false], 3, ["b", "c", [1, 2]]]));
export default arrayStringify;
