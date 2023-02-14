
const iteratorCreater = {
  [Symbol.iterator] (count = 100) { // Iterable

    return { // Iterator
      index: 0,
      arr: [1, 2, 3, 4, 5], // 100만개
      next: (value) => {
        if (this.index === this.arr.length - 1) {
          return {
            done: true,
          }
        }
        // 100개씩.
        for (let i = this.index; i < count; i++, this.index++) {
          // do logic;
        }
        return {
          value: 3
        }
      }
    }
  }
};

const iterator = iteratorCreater[Symbol.iterator](100);
new Promise((resolve, reject) => {
  const {done, value} = iterator.next();
  if (done) {
  } else {
    iterator.next(value);
  }
})

function * ge () {
  const v = yield 3;
  // v === 5;
}

const i = ge();
const v = i.next() // v === 3;
i.next(5); // undefined
// m

function * g (count) {
  // 100개씩.
  for (let i = 0; i < count; i++) {
    // do logic;
    if (i % 5 === 0) {
      yield;
    }
  }
}

const executor = (generator) => {
  const iterator = generator();
  const runner = ({value, done}) => {
    if (done) return
    value?.then(v => iterator.next(v)) ?? iterator.next();
  }
  runner(iterator.next());
}



function Controller () {
  function * gene (count) { // 123
    const a = yield Promise.resolve(1);
    console.log('a: ', a)

    const b = yield Promise.resolve(2);
    console.log('b: ', b)

    const c = yield Promise.resolve(3);
    console.log('c: ', c)
  }

  function loop (gene, ...args) {
    const iter = gene(...args)
    const runner = ({value, done}) => {
      if (done) return
      value.then(v => runner(iter.next(v)));
    }
    runner(iter.next())
  }

loop(gene, 123)
}





class Common {
  v = 3;
}

class B {
  constructor (c) {
    this.c = c;
  }

  m () {
    this.c.v;
  }
}

class C {
  constructor (c) {
    this.c = c;
  }

  m () {
    this.c.v;
  }
}




const f = (login) => login();

const downloadKakaoLibrary = () => {};
const certificateKakao = () => {};
const inputID = () => {};
f(new NaverLogin())

const downloadKakaoLibrary = () => {};
const certificateKakao = () => {};
const inputID = () => {};
f(new KakaoLogin())


const downloadKakaoLibrary = () => {};
const certificateKakao = () => {};
const inputID = () => {};
import {inputPassword} from './index'
f(() => {
  /**
   * 1. 카카오 라이브러리를 동적으로 받는다.
   * 2. 인증하는 모듈을 사용한다.
   * 3. 아이디 패스워드를 입력 받는다.
   * 4. 카카오 인증 모달을 띄운다.
   * 5. 인증 성공 했는지 확인한다.
   * 6......
   * 7. 홈으로 이동.
   */
})


const json = {
  created: '',
  updated: '',
  date: [],
  latest: '',
};

const fetch = () => {
  return json.data;
}
































