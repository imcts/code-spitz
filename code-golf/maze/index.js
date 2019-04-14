const WIDTH = 55
const HEIGHT = 35
const MAZE = new Array(WIDTH * HEIGHT).fill(undefined);

/**
 * 0. 지도의 제일 외곽선은 사용하지 않도록 값을 할당하지 않는다.
 */
for (let y = 1; y < HEIGHT - 1; y++) {
  for (let x = 1; x < WIDTH - 1; x++) {
    MAZE[x + WIDTH * y] = 1;
  }
}

const START_X = WIDTH - 5
const START_Y = 4
const DIRECTION = [[-1, 0], [0, -1], [1, 0], [0, 1]]
const PATTERN = [
   [0, 1, 2, 3]
  ,[0, 1, 3, 2]
  ,[0, 2, 1, 3]
  ,[0, 2, 3, 1]
  ,[0, 3, 1, 2]
  ,[0, 3, 2, 1]
  ,[1, 0, 2, 3]
  ,[1, 0, 3, 2]
  ,[1, 2, 0, 3]
  ,[1, 2, 3, 0]
  ,[1, 3, 0, 2]
  ,[1, 3, 2, 0]
  ,[2, 0, 1, 3]
  ,[2, 0, 3, 1]
  ,[2, 1, 0, 3]
  ,[2, 1, 3, 0]
  ,[2, 3, 0, 1]
  ,[2, 3, 1, 0]
  ,[3, 0, 1, 2]
  ,[3, 0, 2, 1]
  ,[3, 1, 0, 2]
  ,[3, 1, 2, 0]
  ,[3, 2, 0, 1]
  ,[3, 2, 1, 0]
]

/**
 * 10 * 10 기준
 * u === undefined
 * s === start
 * [
 *  u, u, u, u, u, u, u, u, u, u,
 *  u, 1, 1, 1, 1, 1, 1, 1, 1, u,
 *  u, 1, 1, 1, 1, 1, 1, 1, 1, u,
 *  u, 1, 1, 1, 1, 1, 1, 1, 1, u,
 *  u, 1, 1, 1, s, 1, 1, 1, 1, u,
 *  u, 1, 1, 1, 1, 1, 1, 1, 1, u,
 *  u, 1, 1, 1, 1, 1, 1, 1, 1, u,
 *  u, 1, 1, 1, 1, 1, 1, 1, 1, u,
 *  u, 1, 1, 1, 1, 1, 1, 1, 1, u,
 *  u, u, u, u, u, u, u, u, u, u,
 * ]
 *
 * 1. 난수를 생성한다.
 * 2. 패턴을 랜덤하게 정한다.
 * 3. 방향을 랜덤하게 꺼낸다.
 * 4. 현재 위치에서 4방위의 위치를 계산한다.
 *  - 해당 위치가 undefined나 0이 아닌 1이면 해당 위치부터 현재 위치까지 0으로 변경한다.
 */
const dig = (x, y) => {
  const random = (x + 3) * (y + 5) * 7 % PATTERN.length
  const pattern = PATTERN[random]
  for (let i = 0; i < DIRECTION.length; i++) {
    const [first, second] = DIRECTION[pattern[i]]
    const oneStepX = x + first
    const oneStepY = y + second
    const twoStepX = x + first * 2
    const twoStepY = y + second * 2
    const twoStepNext = twoStepX + WIDTH * twoStepY
    
    if (MAZE[twoStepNext] === 1) {
      MAZE[twoStepNext] = 0;
      MAZE[oneStepX + WIDTH * oneStepY] = 0;
      dig(twoStepX, twoStepY);
    }
  }
}

dig(START_X, START_Y)

let res = ''
for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
    if (MAZE[x + WIDTH * y] === 1) {
      res += '■'
    } else if (MAZE[x + WIDTH * y] === undefined) {
      res += 'x'
    } else {
      res += ' '
    }
  }
  res += '\n'
}
console.log(res)
