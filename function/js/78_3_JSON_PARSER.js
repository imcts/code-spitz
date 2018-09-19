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
const CLOSE_TAGS = [IDENTIFY.CLOSE_OBJECT, IDENTIFY.CLOSE_ARRAY]
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
    let findIndex = cursor

    switch (true) {
      case isObject(currentChar):
        key = makeObject(str, current, key, cursor)
        break
      case isArray(currentChar):
        key = makeArray(current, key)
        break
      case isString(currentChar):
        const strResult = parseString(str, current, cursor, key)
        findIndex = strResult.nextCursor
        key = strResult.nextKey
        break
      case isPassTags(currentChar):
        break
      case isCLoseTags(currentChar):
        if (isParsingFinished(str, cursor)) {
          if (isBreak(current)) {
            return current.target
          } else {
            current = current.back
          }
        }
        break
      default:
        const valueResult = parseValue(str, current, cursor, key)
        key = valueResult.nextKey
        findIndex = valueResult.nextCursor
        break
    }
    cursor = findNonBlankChar(str, findIndex)
  }
  return current.target
}

const isObject = (v) => v === IDENTIFY.OPEN_OBJECT
const isUndefined = (v) => typeof v === 'undefined'
const isArray = (v) => v === IDENTIFY.OPEN_ARRAY
const isString = (v) => v === IDENTIFY.DOUBLE_QUOT
const isPassTags = (v) => PASS_IDENTIFIES.includes(v)
const isCLoseTags = (v) => CLOSE_TAGS.includes(v)
const isParsingFinished = (str, cursor) => cursor < str.length - 1
const isBreak = (current) => current.back === null

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
    if (isParsingFinished(str, cursor)) {
      current.back = {...current}
    }
    current.target = newObject
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

const parseString = (str, current, cursor, key) => {
  const startIndex = cursor + 1
  const endIndex = str.indexOf(IDENTIFY.DOUBLE_QUOT, startIndex)
  return {
    nextCursor: endIndex,
    nextKey: setCurrentValue(current, key, str.substring(startIndex, endIndex))
  }
}

const findNonBlankChar = (str, cursor) => {
  const len = str.length
  for (let i = cursor + 1; i < len; i++) {
    if (str[i].trim() !== '') {
      return i
    }
  }
  return len
}

const parseValue = (str, current, cursor, key) => {
  const {nextCursor, value} = getValue(str, cursor)
  const nextKey = setCurrentValue(current, key, value)
  return {
    nextCursor,
    nextKey
  }
}

const getValue = (str, cursor) => {
  const len = str.length
  let endIndex = len

  for (let i = cursor; i < len; i++) {
    if (END_OF_VALUE_IDENTIFIES.includes(str[i].trim())) {
      endIndex = i
      break
    }
  }

  let value = str.substring(cursor, endIndex).trim()
  if (value === VALUE.TRUE) {
    value = true
  } else if (value === VALUE.FALSE) {
    value = false
  } else if (value === VALUE.NULL) {
    value = null
  } else if (typeof Number(value) === TYPE.NUMBER) {
    value = Number(value)
  }

  return {
    nextCursor: endIndex - 1,
    value
  }
}
