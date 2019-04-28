const WIDTH = 500
const HEIGHT = 500
const RATIO = 2

const RED = [255, 0, 0, 255]
const GREEN = [0, 255, 0, 255]
const BLUE = [0, 0, 255, 255]
const BLACK = [0, 0, 0, 255]
const COLORS = [RED, GREEN, BLUE]
const IMAGE = []
const ZOOMED_IMAGE = []

/**
 * 1. 원본 이미지를 만든다.
 * 2. 랜덤으로 3가지 색상 중 하나를 만든다.
 */
const makeOriginImage = () => {
  for (let i = 0, limit = WIDTH * HEIGHT; i < limit; i++) {
    IMAGE.push(COLORS[Math.random() * 3 | 0])
  }
}

/**
 * 1. 확대된 이미지의 배열을 만든다.
 * 2. 배열의 값은 검정으로 채운다.
 */
const makeEmptyImage = scale => {
  const width = WIDTH * scale
  const height = HEIGHT * scale
  for (let i = 0, limit = width * height; i < limit; i++) {
    ZOOMED_IMAGE.push(BLACK)
  }
}

/**
 * 1. 최근방 이웃 보간법을 적용한다.
 * 2. 늘어난 값을 원본 이미지의 값으로 채운다.
 *
 * @example
 * - 이미지가 2배로 늘어난 경우.
 * - 0: 검정색으로 비어있다.
 * - 1: 원본색이다.
 *
 * 11111
 * 11111
 * 11111
 * 11111
 * 11111
 *
 * 1010101010
 * 1010101010
 * 1010101010
 * 1010101010
 * 1010101010
 * 1010101010
 *
 * 비율을 구하는 방법.
 * 1. (확대된 이미지의 길이 / 원본의 길이) 공식을 적용한다.
 *  - 400 / 100 => 4배
 * 2. index를 0부터 증가시키면서 해당 비율로 나누고 소수점을 제거하여 position을 구한다.
 * 3. position값을 기본으로 원본 배열에서 색을 찾아서 새로운 배열에 채운다.
 */
const zoomImage = () => {
  const RATIO = ZOOMED_IMAGE.length / IMAGE.length
  for (let i = 0, limit = ZOOMED_IMAGE.length; i < limit; i++) {
    const position = (i / RATIO) | 0
    ZOOMED_IMAGE[i] = IMAGE[position]
  }
}

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const render = (src, ratio = 1) => {
  const image = context.createImageData(WIDTH * ratio, HEIGHT * ratio)
  const data = image.data
  src.forEach((color, i) => {
    const position = i * 4
    data[position] = color[0]
    data[position + 1] = color[1]
    data[position + 2] = color[2]
    data[position + 3] = color[3]
  })
  context.putImageData(image, 0, 0)
}

makeOriginImage()
makeEmptyImage(RATIO)
zoomImage()
render(ZOOMED_IMAGE, RATIO)