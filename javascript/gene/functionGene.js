function chain (iterable) {
  iterable.filter = (f) => chain((function* () {
    for (const v of iterable) {
      if (f(v)) {
        yield v;
      }
    }
  })());
  iterable.map = (f) => chain((function* () {
    for (const v of iterable) {
      yield f(v);
    }
  })());
  iterable.run = (f) => {
    for (const v of iterable) {
      f(v);
    }
  }
  return iterable;
}

chain([1, 2, 3, 4, 5]).filter(v => v % 2 === 0).map(v => v * 2).run(console.log);