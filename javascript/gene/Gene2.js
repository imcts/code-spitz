function* g3() {
  yield 44;
  yield 55;
}

function* g2() {
  yield 11;
  yield* g3();
  yield 22;
  yield 33;
}

async function* g1(generator) {
  yield 1;
  yield* generator();
  yield 2;
}

[1, 2, 3, 4, 5].filter(v => v % 2 === 0).map(v => v * 2);


double(odd([1, 2, 3, 4, 5]));

function* odd(iterable) {
  for (const v of iterable) {
    if (v % 2 === 0) {
      yield v;
    }
  }
}

function* double (iterable) {
  for (const v of iterable) {
    yield v * 2;
  }
}

for (const v of double(odd([1, 2, 3, 4, 5]))) {
  console.log(v);
}

function chain(iterable) {
  iterable.odd = (f) => chain((function* () {
    for (const v of iterable) { //[1, 2, 3, 4, 5]
      if (f(v)) {
        yield v;
      }
    }
  })());
  iterable.double = () => chain((function* () {
    for (const v of iterable) {
      yield v * 2;
    }
  })());
  return iterable;
}

for (const v of chain([1, 2, 3, 4, 5]).odd(v => v % 2 ===0).double(v => v * 2).double(v => v * 2)) {
  console.log(v);
}


//class Stream {
//  constructor (v) {
//    this.v = v;
//  }
//
//  add (gene, ...args) {
//    this.v = gene(this.v, args);
//  }
//
//  run (f) {
//    for (const v of this.v) {
//      f(v);
//    }
//  }
//}
//
//new Stream([1, 2, 3, 4, 5]).add(function* (iterable) {
//  for (const v of iterable) {
//    if (v % 2 === 0) {
//      yield v;
//    }
//  }
//}).add(function* (iterable, limit = 0) {
//  for (const v of iterable) {
//    if (limit-- > 0) {
//      yield v;
//    }
//  }
//}, 2).run(v => console.log(v));


class Stream {
  constructor (v) {
    this.v = v;
  }

  odd () {
    this.v = this._odd(this.v);
    return this;
  }

  *_odd (iterable) {
    for (const v of iterable) {
      if (v % 2 === 0) {
        yield v;
      }
    }
  }

  take (count) {
    this.v = this._take(this.v, count);
    return this;
  }

  *_take (iterable, count) {
    for (const v of iterable) {
      if (count-- > 0) {
        yield v;
      }
    }
  }

  run (f) {
    for (const v of this.v) {
      f(v);
    }
  }
}


new Stream([1, 2, 3, 4, 5]).odd().take(2).run(console.log);
