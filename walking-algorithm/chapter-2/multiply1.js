const odd = n => n & 0x1
const half = n => n >> 1

/**
 * @param n: 반복할 회수
 * @param a: 숫자
 * @see:
 *  - 숫자를 곱한다는 것은, 숫자를 정해진 회수만큼 더한 것과 같다.
 *  - 주어진 회수를 절반으로 줄이고 현재 숫자를 2배를 한다.
 */
const multiply1 = (n, a) => {
  if (n === 1) { // 1 * a = a 이다.
    return a
  }
  /**
   * 덧셈의 결합 법칙에 따라 작성할 수 있다.
   * 4a = ((a + a) + a) + a
   *    = (a + a) + (a + a) 와 같다.
   *    반복 회수를 절반으로 줄인다면 a + a를 해줄 수 있다.
   *
   * 3a = (a + a) + a 이다.
   *    그렇기 때문에 홀수의 경우에는 a를 한번 더 더해주어야 한다.
   *
   * 5a = (((a + a) + a) + a) + a
   *    = (a + a) + (a + a) + a
   * 41 -> 20 -> 10 -> 5 -> 2 -> 1
   */
  let result = multiply1(half(n), a + a)
  if (odd(n)) {
    result = result + a
  }
  return result;
}

console.log(multiply1(5, 5));
// const div3= n=>parseInt(n/3)
//int mul(int n, int a){
//  if(n==1) return a
//  int result = mul1(div3(n), a+a+a)
//  if(n%2 == 2) r = r+ a+ a
//  else if(n%2 == 1) r = r + a
//  return r
//}
// 111 11111 -> 결합법칙. 0과 0이 아닌 1.
//

/**
 * TODO
 *  - 지수함수와 로그함수에 대한 학습.
 *  -
 */