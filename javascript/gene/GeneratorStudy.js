{
  class Stream {
    static get (v) {return new Stream(v)}

    constructor (v) {
      this.v = v;
      this.filters = [];
    }

    add (gene, ...arg) {
      this.filters.push(v => gene(v, ...arg));
      return this;
    }

    /**
     * TODO
     *  - Iterable 이어야 하므로, 이터레이터를 반환해야 한다.
     *  - [Symbol.iterator]: function * () {};
     *    - 제네레이터 함수는 실행 시 제네레이터를 반환하지만, 제네레이터는 이터레이터 인터페이스를 구현하고 있으므로 이터레이터이다.
     *  - *[Symbol.iterator] () {}
     *    - 그렇기 때문에 축약 문법을 제공 한다.
     */
    *[Symbol.iterator] () {
      let v = this.v;
      for (const f of this.filters) v = f(v); // 처음엔 odd 제네레이터이다. 제네레이터는 이터러블이므로, 다음 제네레이터 함수에 전달하면서 제네레이터를 받는다.
      yield* v; // yield가 되면 그냥 take 제네레이터를 반환하고 이터레이션이 종료되지만, yield* 는 뒤에있는 이터레이터가 모두 소비될때까지 멈춘다.
    }
  }
  const odd = function* (data) {
    for (const v of data) if (v % 2) yield v;
  }
  const take = function* (data, n) {
    for (const v of data) if (n--) yield v; else break;
  }
  for (const v of Stream.get([1, 2, 3, 4]).add(odd).add(take, 2))
    console.log(v);
}


{
  const take = function* (iter) {
    // TODO yield* 는 이터러블을 받아들이고, 이터러블이 반환한 이터레이터가 전부 소비될 때까지 지연 시킨다.
    yield* iter;
  }
  for (const v of take({
    [Symbol.iterator]() {
      return {
        index: 0,
        next(){
          if (this.index++ === 3) {
            return {done: true}
          }
          return {value: this.index}
        }
      }
    }
  })) console.log(v);
}