const odd = n => n & 0x1
const half = n => n >> 1

/**
 * @param r: na의 일부를 계속 더한 값
 * @param n: 반복할 회수
 * @param a: 숫자
 * @see:
 *  - 모든 형식 매개변수를 각각에 상응하는 인자로 사용하는 꼬리 재귀 호출을 순 꼬리 재귀 호출이라고 한다.
 */
const multi_acc3 = (r, n, a) => {
  console.log('r : ', r, ' n: ', n, ' a:', a);
  if (odd(n)) {
    r += a; // n이 홀수인 경우에는 현재까지 계산된 a를 r에 더해준다.
    if (n === 1) {
      return r
    }
  }
  // 짝수인 경우에는 회수를 절반씩 감소시키면서 a를 두배씩 증가시킨다.
  n = half(n)
  a = a + a
  return multi_acc3(r, n, a);
}

console.log(multi_acc3(0, 5, 5));