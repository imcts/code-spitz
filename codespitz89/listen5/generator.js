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

const chain2= (iterable) => {
  iterable.filter = f => chain2((function* () {
    for (const v of iterable) {
      if (f(v)) {
        yield v;
      }
    }
  })());

  iterable.map = f => chain2((function* () {
    for (const v of iterable) {
      yield f(v);
    }
  })());

  iterable.run = f => {
    for (const v of iterable) {
      f(v);
    }
  }
  return iterable;
};
const c = chain2([1, 2, 3, 4, 5]);
c.filter(v => v % 2 === 0).map(v => v * 2).run(console.log);
c.filter(v => v % 2 === 0).run(console.log);


class A {
  constructor (iterable) {
    this.iterable = iterable;
  }

  add (generatorFunction) {
    this.iterable = generatorFunction(this.iterable);
    return this;
  }

  run (f) {
    for (const v of this.iterable) {
      f(v)
    }
  }
}

new A([1, 2, 3, 4, 5]).add(function* (iterable) {
  for (const v of iterable) {
    if (v % 2 === 0) {
      yield v;
    }
  }
}).add(function* (iterable) {
  let limit = 2;
  let i = 0;
  for (const v of iterable) {
    if (i-- < limit) {
      yield v;
    } else {
      break;
    }
  }
}).run(console.log);