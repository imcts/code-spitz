const WIDTH = 10
const HEIGHT = 10
const START = 5
const END = 95

/**
 * 1. 이동 비용 배열을 생성한다.
 */
const costs = [
  5, 5, 4, 2, 1, 1, 1, 2, 2, 3,
  5, 4, 3, 2, 1, 1, 2, 2, 3, 4,
  5, 4, 2, 1, 1, 2, 2, 4, 5, 5,
  4, 4, 2, 1, 1, 2, 2, 4, 5, 5,
  4, 3, 1, 1, 4, 3, 3, 3, 4, 5,
  3, 1, 1, 5, 4, 3, 2, 3, 4, 5,
  2, 1, 3, 4, 3, 3, 2, 2, 3, 4,
  1, 1, 3, 4, 3, 2, 1, 1, 2, 3,
  2, 1, 1, 3, 4, 2, 2, 3, 4, 4,
  3, 2, 1, 1, 3, 3, 3, 3, 4, 5
]


/**
 * 2. 합계 비용 배열을 생성한다.
 */
const summary = [
  Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,
  Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,
  Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,
  Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,
  Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,
  Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,
  Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,
  Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,
  Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,
  Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity
]

/**
 * 0. 초기에는 END로 이동할 것이므로 해당 위치의 값을 0으로 만들기 위해 END지점의 이동비용을 -로 변환하여 전달한다.
 * 1. 다음으로 이동할 위치와 이전 위치의 이동비용을 전달 받는다.
 * 2. 사방위로 이동하며 현재 비용 + 이동한 곳의 비용을 더하여 비용 배열에 저장한다.
 * 3. 만약 이동한 곳의 비용이 현재 비용보다 작거나 같으면 이미 이동해온 곳이므로 이동하지 않는다.
 * 4. 반복하여 합계비용 배열을 생성한다. (골인 지점이 합계비용이 가장 낮고, 멀어질 수록 합계 비용은 증가하게 된다.)
 */

const stack = []
stack.push({position: END, cost: -costs[END]})
while (stack.length) {
  let {position, cost} = stack.shift()
  cost += costs[position]
  if (cost >= summary[position]) {
    continue
  }
  summary[position] = cost
  if (position % WIDTH !== 0) {
    stack.unshift({position: position - 1, cost})
  }
  if (position - WIDTH >= 0) {
    stack.unshift({position: position - WIDTH, cost})
  }
  if (position % WIDTH !== WIDTH - 1) {
    stack.unshift({position: position + 1, cost})
  }
  if (position + WIDTH < WIDTH * HEIGHT) {
    stack.unshift({position: position + WIDTH, cost})
  }
}

console.log(summary)

// var costs = [
//   33, 28, 23, 19, 18, 19, 20, 22, 24, 27,
//   28, 23, 19, 17, 17, 18, 19, 21, 24, 28,
//   25, 20, 16, 15, 16, 17, 17, 21, 26, 31,
//   21, 17, 14, 14, 16, 15, 15, 17, 21, 26,
//   17, 13, 12, 13, 17, 13, 12, 14, 18, 23,
//   13, 10, 11, 16, 14, 10,  9, 11, 15, 20,
//   11,  9, 12, 14, 10,  7,  7,  8, 11, 15,
//    9,  8,  9, 11,  7,  4,  5,  6,  8, 11,
//    9,  7,  6,  7,  6,  2,  4,  7, 11, 15,
//   10,  7,  5,  4,  3,  0,  3,  6, 10, 15
// ]

/**
 * 1. 포지션을 전달받는다.
 * 2. 상하좌우를 비교하고 가장 값이 저렴한 쪽으로 이동한다.
 * 3. 이동 경로 배열에 push 한다.
 * 4. 끝(0)을 만나면 종료한다.
 */
let position = START
let cost = summary[position]
const positions = []

while (cost) {
  positions.push(position)

  let tmpPosition = position
  if (position % WIDTH !== 0) {
    const newPosition = position - 1
    const newCost = summary[newPosition]
    if (cost > newCost) {
      cost = newCost
      tmpPosition = newPosition
    }
  }
  if (position - WIDTH >= 0) {
    const newPosition = position - WIDTH
    const newCost = summary[newPosition]
    if (cost > newCost) {
      cost = newCost
      tmpPosition = newPosition
    }
  }
  if (position % WIDTH !== WIDTH - 1) {
    const newPosition = position + 1
    const newCost = summary[newPosition]
    if (cost > newCost) {
      cost = newCost
      tmpPosition = newPosition
    }
  }
  if (position + WIDTH < WIDTH * HEIGHT) {
    const newPosition = position + WIDTH
    const newCost = summary[newPosition]
    if (cost > newCost) {
      cost = newCost
      tmpPosition = newPosition
    }
  }
  position = tmpPosition
}

/**
 * 1. 얻어진 이동 경로.
 */
console.log(positions)