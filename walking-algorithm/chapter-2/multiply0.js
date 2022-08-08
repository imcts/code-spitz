const odd = n => n & 0x1
const half = n => n >> 1

/**
 * @param n: 반복할 회수
 * @param a: 숫자
 * @see:
 *  - 곱셈이라는 것은 1로 곱할때와 1보다 큰 수로 곱할때로 나뉜다.
 *  - 1a = a;
 *    - 1회 반복할 때에는 a와 같다.
 *  - (n + 1)a = na + a;
 *    - n + 1회수의 a를 반복한다는 것은 n * a + a와 같다.
 */
const multiply0 = (n, a) => {
  if (n === 1) { // 1회 반복하는 것은 a와 같다.
    return a
  }
  return multiply0(n - 1, a) + a; // n회를 계산한 결과에 a를 더한 것과 같다.
}

console.log(multiply0(3, 5)); // 15

n == parseInt(n / 2) + parseInt(n / 2) // 짝수를 구하는 방법.

n == parseInt(n / 2) * 2

/**
 * 1. (n - 1) / 2 은 짝수이기때문.
 */

const even1 = n => n == parseInt(n / 2 ) * 2;
const odd1 = n => even1(n - 1);
const half1 = n => parseInt(n / 2)
