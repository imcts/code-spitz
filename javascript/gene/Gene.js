function* gene () {
  let count = 0;
  yield count;
  count++;
  yield count;

  yield* (function* () {
    yield 3;
    yield 4;
  })();
}

const g = gene(); // generator

const v = g.next();
console.log(v); // 5

g.next(5);



/////////////////////

var o = {
  // Iterable
  [Symbol.iterator] () {
    let count = 0;

    // Iterator
    return {
      [Symbol.iterator] () {
        return this;
      },
      next (v) {
        // Iterator Result
        switch (count) {
          case 0: {
            return {
              done: false,
              value: new Promise((r) => {
                // API.done((res) => r(res));
              }),
            }
          }
          case 1: {
            console.log(v);
            return {
              done: true,
              value: undefined,
            }
          }
        }
      }
    }
  }
};
var iter = o[Symbol.iterator]();
iter.next().value.then((res) => {
  console.log(res);
  iter.next(5);
})

function executor (iterator) {
  (({done, value}) => !done ?
    value instanceof Promise
      ? value.then((v) => iter.next(v), (e) => console.error(e))
      : iter.next(value))(iterator.next())
}


function* saga () {
  const response = yield call(() => new Promise((resolve) => {
    setTimeout(resolve, 1000);
  }));
  console.log('done: ', response);
}

executor(saga());


const o = {
  [Symbol.iterator]: function* () {
    yield 3;
    yield 5;
  }
};


function* routine () {

}


for (let i = 0; i < 1000; i++) {
  // A;
  // B;
  // C;
  // D;
}


for (let i = 0; i < 1000; i++) {
  // AB;
  // BC;
  // D;
}
for (let i = 0; i < 1000; i++) {
  // AB;
  // E;
  // D;
}
for (let i = 0; i < 1000; i++) {
  // AB;
  // C;
  // D;
}

function* routine () {
  for (let i = 0; i < 1000; i++) {
    // AB;
    const r = yield i;
    // D(r);
  }
}

function* gg () {
  for (const v of routine()) {
    // E;
  }
}

function* gg () {
  for (const v of routine()) {
    // C;
  }
}

function* odd (iterable) {
  for (const v of iterable) {
    if (v % 2 === 0) {
      yield v;
    }
  }
}

function* double(iterable) {
  for (const v of iterable) {
    yield v * 2;
  }
}

for (const v of double(odd(Array.from({length: 100}, (_, i) => i)))) {
  console.log(v);
}




























