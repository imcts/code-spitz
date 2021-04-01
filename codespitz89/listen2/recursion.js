/**
 *  TODO
 *   0. 변수란 스코프와 라이프사이클을 갖는다, 메모리와 연산은 상호 교환할 수 있으며 특히 라이프사이클이 관여함
 *   1. 오류와 실패의 관계 -오류는 중간요소의 내결합성 때문에 실패로 이어지지 않을 수 있다 : 오류가 최대한 빨리 실패로 이어지게 짜라. 컨텍스트에러가 더 무서우니까 -> 신뢰성, 안정성(컨텍스트에러발생이 올라감)
 *   2. 코드의 분리 또는 정리 - 수정되는 원인에 따라 :: 변화율(변화율이 같은 애들끼리 코드를 모아라) 변화율의 원인->수정되는 이유
 *   3. 자바스크립트 인터페이스란 함수의 이름 인자 반환값의 형식이 일치하는 경우
 *   4. 인터페이스를 일치시키면 컬렉션으로 묶을 수 있다. -> 일종의 일반화 -> 서로 다른 형태인경우 인터페이스를 일치시켜 일반화를 한다.
 *   5. 데이터와 데이터를 이용한 알고리즘이 이원화 되면 관리가 불가능->데이터를 소유한 쪽에서 데이터를 사용하는 알고리즘을 제공한다.
 *   6. 꼬리최적화함수를 루프로 고칠때 기계적으로 고친다는 의미
 *   7. 결국 루프는 클로저에만 의존하는 함수를 반복시키고, 재귀함수는 인자에만 의존하는 함수를 반복시킨다.
 *   8. 반복되는 코드를 제거하기 위해 집착해라.
 */

const arrayStringify = (() => {
  const Type = class {
    static #NULLISH = [
      v => v === null,
      v => typeof v === 'undefined',
      v => typeof v === 'function',
      v => typeof v === 'symbol'
    ]
    static #TYPE_OF_STRING = 'string'

    static isNullish (v) {
      for (let i = this.#NULLISH.length; i--;) {
        if (this.#NULLISH[i](v)) {
          return true;
        }
      }
      return false;
    }
    static isString (v) {
      return typeof v === this.#TYPE_OF_STRING
    }
  }
  const Encoder = class {
    static #QUOTES = '"'
    static #ESCAPED_QUOTES = '\\"'

    static encode (v) {
      const characters = v.split('')
      let string = '\"';
      for (let i = 0, character = '', length = characters.length; i < length; i++) {
        string += (character = characters[i]) === this.#QUOTES ? this.#ESCAPED_QUOTES : character;
      }
      return string + '\"';
    }
  }
  const STRING_OF_NULL = 'null';
  const getValue = v => Type.isString(v)
    ? Encoder.encode(v)
    : Type.isNullish(v)
      ? STRING_OF_NULL
      :`${v}`
  const arrayStringify = (arr, i, limit) => i < limit
    ? `${getValue(arr[i])},` + arrayStringify(arr, i + 1, limit)
    : getValue(arr[i]);
  return arr => {
    if (!Array.isArray(arr)) {
      throw new Error('invalid parameter.');
    }
    if (!arr.length) {
      return '[]';
    }
    return `[${arrayStringify(arr, 0, arr.length - 1)}]`;
  }
})();
const ARRAY = [1, '"ab"c"', true, undefined, null, _=>3, Symbol()];
console.log(arrayStringify(ARRAY) === JSON.stringify(ARRAY)); // true
export default arrayStringify
