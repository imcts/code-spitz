const Stream = class {
  static get(v) {return new Stream(v);}
  constructor(v) {
    this.v = v;
    this.filters = [];
  }
  add(gene, ...arg) {
    this.filters.push(v => gene(v, ...arg));
    return this;
  }
  *gene () {
    let v = this.v;
    debugger
    for(const f of this.filters) {
      // 1. odd를 실행하여 제네레이터를 받아오고
      // 2. take를 실행하여 제네레이터를 전달한다.
      // 3. 값을 전달해서 값을 받고 그 값을 다른 함수로 또 전달한다.
      v = f(v);
    }
    // 4. 마지막에 반환된 함수에서는 제네레이터를 전부 실행하면 될일.
    yield * v;
  }
}

const odd = function * (values) {
  for(const v of values) {
    if(v % 2) {
      yield v;
    }
  }
}

const take = function * (iterator, n) {
  for(const v of iterator) {
    if(n--) {
      yield v;
    } else {
      break;
    }
  }
}

for(const v of Stream.get([1,2,3,4]).add(odd).add(take, 2).gene())
  console.log(v);
