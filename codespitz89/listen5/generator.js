/**
 * TODO
 *  - [1, 2, 3, 4, 5, 6, 7].filter(i => i % 2).map(i => i * 2)
 *  - 위의 예제를 7번만으로 해결하도록 제네레이터를 작성하시오.
 */
const f = (() => {
  function * map (iterator) {
    for (const v of iterator) {
      yield v * 2;
    }
  }
  function * filter (iterator) {
    for (const v of iterator) {
      if (v % 2) {
        yield v;
      }
    }
  }
  return (arr) => {
    if (!Array.isArray(arr)) {
      throw new Error('invalid error');
    }
    return [...map(filter(arr))];
  }
})()
f([1, 2, 3, 4, 5, 6, 7]);
