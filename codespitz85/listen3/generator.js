/**
 * Iterable의 Interface.
 * 1. Symbol.iterator를 키로 가지고 있고, 함수로 값을 가지고 있어야 한다.
 * 2. 반드시 Iterator를 반환해야 한다.
 * 3. Iterator는 반드시 next함수를 가지고 있어야 한다.
 * 4. Iterator의 next를 실행할때 객체를 반환해야 하고, 반드시 value, done이라는 키를 가져야한다.
 */
const Iterable = class {
  [Symbol.iterator] () {
    return new Iterator();
  }
}

const Iterator = class {
  #i = 0;
  
  next (v) {
    if (v !== undefined) {
      return {
        value: this.#i + v,
        done: this.#i > 10
      }
    }
    return {
      value: this.#i++,
      done: this.#i > 10
    }
  }
}

const iterator = new Iterable()[Symbol.iterator]()

let r = iterator.next()
r = iterator.next()

// Do something.

r = iterator.next(r.value)


// Generator // Iterable 유사
const generator = function * (session) { // Iterable!
  console.log('session: ', session);
  const id = yield new Promise((res) => res('id'));
  
  console.log('id: ', id);
  const password = yield new Promise((res) => res('password'));
  
  console.log('password: ', password);
  const info = yield new Promise((res) => res('user Info'));
  
  console.log('info: ', info)
}

function executor (iterator) {
  const f = r => {
    if (r.done) {
      return
    }
    r.value.then(v => {
      f(iterator.next(v))
    })
  }
  f(iterator.next())
}

executor(generator('session'))





const f = callback => {
  fetch('/1/')
    .then(response => response.json())
    .then(data => fetch(`/2/${data.id}`))
    .then(response => fetch(`/3/${response.json().name}`))
    .then(callback)
    .catch(console.log)
}

f(data => console.log('do something'))

async function get (url) {
  return (await fetch(url)).json()
}


// Promise
async function f () {
  try {
    const data1 = await get('/1/')
    const data2 = await get(`/2/${data1.id}`)
    const data3 = await get(`/3/${data2.name}`)
    // do something.
  } catch (e) {
    // error
  }
}

// Iterable
function * gene () {
  const param1 = yield get('/1/')
  const param2 = yield get('/2/' + param1)
  yield get('/3/' + param2)
}


const ej = async () => {
  const data1 = await iter.next()
  /**
   * 은정쓰 로직
   */
  const data2 = await iter.next(`${data1.id}`)
  /**
   * 은정쓰 두번째 로직
   */
  const data3 = await iter.next(`${data2.name}`)
}


function executor (iterator) {
  const next = promise => {
    const {value, done} = promise
    if (done) {
      return
    }
    value.then(data => next(iterator.next(data)))
  }
  next(iterator.next())
}
executor(gene())





async function * gene () {
  const param1 = yield get('/1/')
  const param2 = yield get('/2/' + param1)
  yield get('/3/' + param2)
}



function * gene () {
  yield yield fetch(url, {method: "GET"}).then(res => res.json());
}





