/**
 * // 앞서 switchIterable에서 작성한 제네레이터를 context iterable을 구현해본다.
 * // 아래 제네레이터를 사용하여 CPS를 달성한다.
 * const gene = a => {
 *  let b;
 *  while (1) {
 *    a++
 *    b = a
 *    yield b
 *  }
 * }
 *
 * 1. 모든 객체는 state management 를 해야하며 본인의 상태를 본인이 책임져야 한다.
 * 2. Continuation 연속성을 달성해야하는 이유
 *  - 병행성이 아닌 동시성을 달성하려면 10번 처리해야할 일을 10개로 나눠서 1개씩 처리하게 하는 방법을 사용해야한다.
 *  - 그래야만 CPU 점유 시간을 줄여서 Blocking을 피할 수 있게 된다.
 *  - 그렇다면 원래 10번을 처리해야할 일을 1번씩 처리하게 하려면 특정 순서를 지킬 수 있게 하는 연속성이 필수적이다.
 *  - Continuation Passing Style 이란 연속성을 달성하여 동시성을 달성할 수 있게 하는 기법이다.
 * 3. Context는 어휘공간을 제공해야 한다.
 */

const gene = a => {
  const KEY0 = Symbol()
  const KEY1 = Symbol()
  return new ContextIterable()
  .set('a', a)
  .set('b', undefined)
  .setNext(
    new Continuation(KEY0, continuation => {
      if (!1) {
        continuation.stop()
      }
      continuation.resume() // 조건에 따라 진행할지 말지를 결정한다.
    })
  )
  .setNext(
    new Continuation(KEY1, continuation => {
      continuation.set('a', continuation.get('a') + 1)
      continuation.set('b', continuation.get('a'))
      continuation.resume(KEY0, continuation.get('b'))
    })
  )
}

const iter = gene(0)

console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
