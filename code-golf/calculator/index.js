/**
 1회째 1+2+3 = 5
 정답은「6」결과는오답
 // [[1, ,+ ,2] ,+ ,3]
 // [[1, 2, +], +, 3]
 // [1, 2, + , ]
 // 1. 숫자-숫자 => 숫자+-숫자 로 변경.
 // 2. 숫자|-숫자*숫자|-숫자 를 찾는다. 또는 나눗셈을 찾는다.
 //
 
 2회째 1+2*3-4 = 7
 정답은「3」결과는오답
 
 3회째 1-2/3+4 = 7
 정답은「4.333333333333333」결과는오답
 
 4회째 10*-20/5+30 = 8
 정답은「-10」결과는오답
 */

const MULTIPLICATION = '*'
const DIVISION = '/'
const PLUS = '+'
const OPERATION_COUNT = 3

const question = '10*-20/5+30'

/**
 * 1. -연산자를 +-로 변경한다.
 * 2. 숫자와 연산자를 분리하는 정규식을 작성한다.
 *
 * @example
 * 1. 입력: '3-3333*3/44-34'
 * 2. 출력: ["3", "+", "-3333", "*", "3", "/", "44", "+", "-34"]
 */
const questions = question.replace(/(\d)-(\d)/g, '$1+-$2').match(/-\d+|\d+|./g)

console.log(questions)

/**
 * 1. 연산자를 찾아서 연산자 앞뒤의 숫자를 배열로 만든다.
 * 2. 해당 배열을 원본 배열의 위치에 집어 넣는다.
 *
 * @example
 * 1. 입력: 1 + 2 + 3
 * 2. 출력: [[1, 2, +], 3, +]
 */
for (let i = 0, len = questions.length; i < len; i++) {
  if (questions[i] === MULTIPLICATION || questions[i] === DIVISION) {
    const start = i - 1
    const end = i + 1
    const values = [questions[start], questions[end], questions[end - 1]]
    questions.splice(start, OPERATION_COUNT, values)
    i -= OPERATION_COUNT
  }
}

for (let i = 0, len = questions.length; i < len; i++) {
  if (questions[i] === PLUS) {
    const start = i - 1
    const end = i + 1
    const values = [questions[start], questions[end], questions[end - 1]]
    questions.splice(start, OPERATION_COUNT, values)
    i -= OPERATION_COUNT
  }
}

console.log(questions)

/**
 * 1. 배열을 전달받는다.
 * 2. 원소중에 배열이 있으면 배열을 풀어 헤친다.
 * 3. 배열이 하나라도 없으면 리턴한다.
 */
function getString (arr) {
  let i = 0
  while (arr.some((v, index) => {
    i = index
    return typeof v !== 'string'
  })) {
    if (typeof arr[i] !== 'string') {
      arr.splice(i, 1, ...arr[i])
    }
  }
  return arr
}

const r = getString(questions)

console.log(r)

const buffer = []

r.forEach(v => {
  switch (v) {
    case PLUS:
      buffer.push(+buffer.pop() + +buffer.pop())
      break
    case MULTIPLICATION:
      buffer.push(+buffer.pop() * +buffer.pop())
      break
    case DIVISION:
      const v2 = +buffer.pop()
      const v1 = +buffer.pop()
      buffer.push(v1 / v2)
      break
    default:
      buffer.push(v)
      break
  }
})

console.log('콘솔 삭제 후 다시 적음.')

console.log(buffer[0])
