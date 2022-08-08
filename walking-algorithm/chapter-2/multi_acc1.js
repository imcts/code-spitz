const odd = n => n & 0x1
const half = n => n >> 1

/**
 * @param r: na의 일부를 계속 더한 값
 * @param n: 반복할 회수
 * @param a: 숫자
 * @see:
 *  - 홀수일때에는 a를 한번 더 더해주어야 한다.
 */
const multi_acc1 = (r, n, a) => {
  if (n === 1) {
    return r + a
  }
  if (odd(n)) {
    r += a; // 반복해야하는 회수 n이 홀수일때에는 a를 한번 더 더해주어야 한다.
  }
  return multi_acc1(r, half(n), a + a);
}

console.log(multi_acc1(0, 5, 5));