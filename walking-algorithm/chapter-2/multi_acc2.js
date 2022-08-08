const odd = n => n & 0x1
const half = n => n >> 1

/**
 * @param r: na의 일부를 계속 더한 값
 * @param n: 반복할 회수
 * @param a: 숫자
 * @see:
 *  - n이 1인 경우는 거의 없다.
 *  - n이 짝수라면 n이 1인지 확인할 필요도 없다.
 *  - 홀수 여부를 먼저 확인하는 것만으로도 n을 1과 비교하는 횟수자체를 절반으로 날릴 수 있게 된다.
 */
const multi_acc2 = (r, n, a) => {
  console.log('r : ', r, ' n: ', n, ' a:', a);
  debugger
  if (odd(n)) {
    r += a; // n이 홀수인 경우에는 현재까지 계산된 a를 r에 더해준다.
    if (n === 1) {
      return r
    }
  }
  // 짝수인 경우에는 회수를 절반씩 감소시키면서 a를 두배씩 증가시킨다.
  return multi_acc2(r, half(n), a + a);
}

console.log(multi_acc2(0, 5, 5));