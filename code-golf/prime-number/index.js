/**
 * 1. 소수는 2를 제외하고는 전부 홀수이다.
 * 2. 짝수를 제외한 홀수는 각 값만큼마다 반복된다.
 *  - 2, 3, 5, 7, 9인경우 3의 배수는 3번째마다 반복된다.
 * 3. 현재 값의 제곱한 값이 배열의 맨 마지막보다 큰 경우 순회할 필요가 없다.
 * 4. 배열에서 각 배수만큼 index를 증가시키면서 0으로 초기화하고 필터링 한다.
 */

const numbers = [2]

for (let i = 3; i < 20; i+= 2) {
  numbers.push(i)
}

/**
 * 3, 5, 7, 9, 11, 13, 15, 17, 19
 * 1  2  3  4   5   6   7   8  9
 */

console.log(numbers)

const primeNumbers = numbers => {
  for (let i = 1, len = numbers.length, last = numbers[len - 1]; i < len; i++) {
    const v = numbers[i]
    if (v * v > last) {
      break
    }
    for (let value = numbers[i], j = i + value; j < len; j += value) {
      numbers[j] = 0
    }
  }
  return numbers.filter(v => v)
}

console.log(primeNumbers(numbers))