class Stream {
  #iterable;

  constructor (iterable) {
    this.#iterable = iterable;
  }

  filter (f) {
    this.#iterable = (function* (iterable) {
      for (const v of iterable) {
        if (f(v)) {
          yield v;
        }
      }
    })(this.#iterable);
    return this;
  }

  map (f) {
    this.#iterable = (function* (iterable) {
      for (const v of iterable) {
        yield f(v);
      }
    })(this.#iterable);
    return this;
  }

  collect (f) {
    for (const v of this.#iterable) {
      f(v);
    }
  }
}

new Stream([1, 2, 3, 4, 5]).filter(v => v % 2 === 0).map(v => v * 2).collect(console.log);