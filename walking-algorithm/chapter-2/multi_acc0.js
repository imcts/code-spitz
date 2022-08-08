const odd = n => n & 0x1
const half = n => n >> 1

/**
 * @param r: na의 일부를 계속 더한 값
 * @param n: 반복할 회수
 * @param a: 숫자
 * @see:
 *  - 홀수일때에는 a를 한번 더 더해주어야 한다.
 */
const multi_acc0 = (r, n, a) => {
  if (n === 1) {
    return r + a
  }
  if (odd(n)) {
    return multi_acc0(r + a, half(n), a + a)
  } else {
    return multi_acc0(r, half(n), a + a);
  }
}

console.log(multi_acc0(0, 10, 5));