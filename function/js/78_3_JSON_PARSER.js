const IDENTIFY = {
  OPEN_OBJECT: '{',
  CLOSE_OBJECT: '}',
  OPEN_ARRAY: '[',
  CLOSE_ARRAY: ']',
  DOUBLE_QUOT: '"',
  COLON: ':',
  COMMA: ','
}
const TYPE = {
  OBJECT: 'OBJECT',
  ARRAY: 'ARRAY',
  UNDEFINED: 'undefined',
  NUMBER: 'number'
}
const VALUE = {
  TRUE: 'true',
  FALSE: 'false',
  NULL: 'null',
  BLANK: ''
}
const PASS_IDENTIFIES = [IDENTIFY.COLON, IDENTIFY.COMMA, IDENTIFY.BLANK]
const END_OF_VALUE_IDENTIFIES = [IDENTIFY.COMMA, IDENTIFY.CLOSE_ARRAY, IDENTIFY.CLOSE_OBJECT]
const DEFAULT_KEY_VALUE = undefined

export const parser = (str = '') => {
  str = str.trim()

  let current = {
    target: null,
    type: null,
    back: null
  }
  let key = DEFAULT_KEY_VALUE
  let cursor = 0
  let len = str.length

  while (cursor < len) {
    const currentChar = str[cursor]
    const isCLoseTags = currentChar === IDENTIFY.CLOSE_OBJECT || currentChar === IDENTIFY.CLOSE_ARRAY
    const isFinishedAndBackIsNotNull = isFinished(str, cursor) && current.back !== null
    let findIndex = cursor

    if (!PASS_IDENTIFIES.includes(currentChar)) {
      if (currentChar === IDENTIFY.OPEN_OBJECT) {
        key = makeObject(str, current, key, cursor)
      } else if (currentChar === IDENTIFY.OPEN_ARRAY) {
        key = makeArray(current, key)
      } else if (currentChar === IDENTIFY.DOUBLE_QUOT) {
        const {nextCursor, value} = getStringValue(str, cursor)
        key = setCurrentValue(current, key, value)
        findIndex = nextCursor
      } else if (isCLoseTags && isFinishedAndBackIsNotNull) {
        current = current.back
      } else if (isCLoseTags && !isFinishedAndBackIsNotNull) {
        break
      } else {
        const {nextCursor, value} = getValue(str, cursor)
        key = setCurrentValue(current, key, value)
        findIndex = nextCursor
      }
    }
    cursor = findNonBlankChar(str, findIndex)
  }
  return current.target
}

const getValue = (str, cursor) => {
  const endValueIndex = findEndOfValue(str, cursor)
  const foundValue = str.substring(cursor, endValueIndex)
  return {
    nextCursor: endValueIndex - 1,
    value: getValueByType(foundValue)
  }
}

const findEndOfValue = (str, cursor) => {
  const len = str.length
  for (let i = cursor; i < len; i++) {
    if (END_OF_VALUE_IDENTIFIES.includes(str[i].trim())) {
      return i
    }
  }
  return len
}

const getValueByType = (value) => {
  const trimValue = value.trim()
  if (trimValue === VALUE.TRUE) {
    value = true
  } else if (trimValue === VALUE.FALSE) {
    value = false
  } else if (trimValue === VALUE.NULL) {
    value = null
  } else if (typeof Number(value) === TYPE.NUMBER) {
    value = Number(value)
  }
  return value
}


const getStringValue = (str, cursor) => {
  const startDoubleQuotIndex = cursor + 1
  const endDoubleQuotIndex = str.indexOf(IDENTIFY.DOUBLE_QUOT, startDoubleQuotIndex)
  return {
    nextCursor: endDoubleQuotIndex,
    value: str.substring(startDoubleQuotIndex, endDoubleQuotIndex)
  }
}

const makeObject = (str, current, key, cursor) => {
  const newObject = {}

  if (isUndefined(key)) {
    if (current.type === TYPE.ARRAY) {
      key = setCurrentValue(current, key, newObject)
    }
    current.target = newObject
    current.type = TYPE.OBJECT
    current.back = {...current}
  } else {
    key = setCurrentValue(current, key, newObject)
    current.type = TYPE.OBJECT
    if (isFinished(str, cursor)) {
      current.back = {...current}
    }
    current.target = newObject
  }
  return key
}

const isFinished = (str, cursor) => cursor < str.length - 1

const isUndefined = (value) => typeof value === 'undefined'

const findNonBlankChar = (str, cursor) => {
  const len = str.length
  for (let i = cursor + 1; i < len; i++) {
    if (str[i].trim() !== '') {
      return i
    }
  }
  return len
}

const makeArray = (current, key) => {
  if (isUndefined(key)) {
    current.target = []
    current.type = TYPE.ARRAY
    current.back = {...current}
  } else {
    const newArray = []
    key = setCurrentValue(current, key, newArray)
    current.type = TYPE.ARRAY
    current.target = newArray
  }
  return key
}

const setCurrentValue = (current, key, value) => {
  if (current.type === TYPE.OBJECT) {
    if (isUndefined(key)) {
      key = value
    } else {
      current.target[key] = value
      key = DEFAULT_KEY_VALUE
    }
  } else {
    current.target.push(value)
  }
  return key
}


