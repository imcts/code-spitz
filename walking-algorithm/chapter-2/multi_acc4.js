const odd = n => n & 0x1
const half = n => n >> 1

/**
 * @param r: na의 일부를 계속 더한 값
 * @param n: 반복할 회수
 * @param a: 숫자
 * @see:
 *  - 모든 형식 매개변수를 각각에 상응하는 인자로 사용하는 꼬리 재귀 호출을 순 꼬리 재귀 호출이라고 한다.
 *  - 순 꼬리 재귀 호출로 바꾸면 쉽게 반복문으로 바꿀 수 있다.
 */
const multi_acc3 = (r, n, a) => {
  while (true) {
    if (odd(n)) {
      r += a;
      if (n === 1) {
        return r
      }
    }
    n = half(n)
    a = a + a
  }
}

console.log(multi_acc3(0, 5, 5));