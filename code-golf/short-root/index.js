const WIDTH = 10
const HEIGHT = 10
const START = 0
const END = 0

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
 * 합계 비용 배열을 생성한다.
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
  Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,
]



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
//
