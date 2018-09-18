/**
 * generator로 작성
 * @param limit
 */
const multiplicationTableGenerator = function * (limit = 9) {
  for (let i = 1; i <= limit; i++) {
    for (let j = 1; j <= limit; j++) {
      yield [i, j, i * j]
    }
  }
}

for (const [i, j, k] of multiplicationTableGenerator()) {
  console.log(`${i} x ${j} = ${k}`);
}


/**
 * Iterable로 작성
 * @param limit
 */
const multiplicationTableIterable = {
  [Symbol.iterator] (limit = 9) {
    let i = 1
    let j = 1

    return {
      next () {
        const result = (i > limit)
          ? { done: true }
          : { value: [i, j, i * j] }

        if (j >= limit) {
          i += 1
          j = 1
        } else {
          j += 1
        }
        return result
      }
    }
  }
}

for (const [i, j, k] of multiplicationTableIterable) {
  console.log(`${i} x ${j} = ${k}`);
}
