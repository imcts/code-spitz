/**
 * TODO
 *  - [1, 2, 3, 4, 5, 6, 7].filter(i => i % 2).map(i => i * 2)
 *  - 위의 예제를 7번만으로 해결하도록 제네레이터를 작성하시오.
 */
const f = (() => {
  function * filter (arr, map) {
    if (!Array.isArray(arr)) {
      throw new Error('invalid error');
    }
    for (const v of arr) {
      if (v % 2) {
        yield map(v);
      }
    }
  }
  return (arr, map) => [...filter(arr, map)]
})()
f([1, 2, 3, 4, 5, 6, 7], v => v * 2)