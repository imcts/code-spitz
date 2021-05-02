/**
 * TODO
 *  - [1, 2, 3, 4, 5, 6, 7].filter(i => i % 2).map(i => i * 2)
 *  - 위의 예제를 7번만으로 해결하도록 제네레이터를 작성하시오.
 */
const makeChaining = (iterator) => {
  iterator.filter = f => makeChaining((function * () {
    for (const v of iterator) {
      if (f(v)) {
        yield v;
      }
    }
  })())
  iterator.map = f => makeChaining((function * () {
    for (const v of iterator) {
      yield f(v);
    }
  })())
  return iterator;
}

for (const v of makeChaining([1, 2, 3, 4, 5]).filter(v => v % 2).map(v => v * 2)) {
  console.log('v: ', v);
}

/**
 * TODO
 *  - 객체를 체이닝 할 수 있도록 만들어내는 방법.
 */
const chain = (v) => {
  v.filter = (f) => chain((() => {
    if (f(v)) {
      return {a: '새로운거'};
    } else {
      return v;
    }
  })())
  v.map = (f) => chain((() => {
    return f(v);
  })())
  return v;
}
console.log(copy({a: '헌거'}).filter(v => true).map(v => v)) // 새로운거!

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
f([1, 2, 3, 4, 5]);
