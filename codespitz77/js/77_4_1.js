const iterable = {
  [Symbol.iterator] () {return this},
  data:[{a: [0, 2, 3, 4], b: '-'}, [5, 6, 7], 8, 9],
  next () {
    let value
    /**
     * 배열의 shift 메소드를 호출했을때 값이 없는경우 반환하는 값은 undefined 입니다.
     * 기존의 코드로는 자바스크립트의 falsy(null, NaN, 0, '', undefined, false)가 전부 false 처리되어 반복문에 진입할 수 없습니다.
     * 따라서 this.data.shift()한 결과가 undefined가 아닌 경우에만 진입하게 하였습니다.
     * 물론 의도적으로 undefined를 값으로 할당할 수는 있겠으나 이 경우는 논외로 보았습니다.
     */
    while((value = this.data.shift()) !== undefined) {
      switch(true) {
        case Array.isArray(value):
          this.data.unshift(...value)
          break
        case value && typeof value === 'object':
          /**
           * 원래 코드 설명할때의 의도는 0, 2, 3, 4 - 5, 6, 7, 8, 9가 순차적으로 출력되도록 하는 코드였으나
           * 기존 코드로는 객체의 값을 this.data에 unshift하고 있었기 때문에 - 0 2 3 4 5 6 7 8 9가 출력되고 있어서 수정하였습니다.
           * Object.values는 이 코드에서 사용하지 않았습니다.
           */
          const values = []
          for(const k in value) {
            if (value.hasOwnProperty(k)) {
              values.push(value[k])
            }
          }
          this.data.unshift(...values)
          break
        default:
          return {value, done: false}
      }
    }
    return {done: true}
  }
}
console.log(...iterable)
