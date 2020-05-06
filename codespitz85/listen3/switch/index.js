/**
 * // 해당 제네레이터를 switch iterable을 구현해보는 것으로 바벨을 학습해본다.
 * const gene = function * (a) {
 *   let b
 *   yield a
 *   b = a
 *   yield b
 * }
 *
 * 1. generator는 실행시 iterable을 반환한다.
 * 2. iterable은 iterable protocol과 iterator protocol을 반환한다.
 * 3. for...of 구문은 iterable을 받아들여서 순차적으로 실행한다.
 */

const gene = a => {
  let b;
  return new Iterable(context => {
    while (1) {
      switch (context.prev = context.next) {
        case 0:
          context.next = 2
          return a
        case 2:
          context.next = 5
          return b = a
        case 5:
        case 'end':
          return context.getStop()
      }
    }
  })
}

const iterable = gene(3)
for (const v of iterable) {
  console.log(v)
}
console.log('done')

const iterator = iterable[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log('done')