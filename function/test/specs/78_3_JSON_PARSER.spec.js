const { parser } = require('../../../function/js/78_3_JSON_PARSER')

describe('JSON Parser - ', () => {
  it('{}인 경우.', () => {
    // Given
    const str = '{}'

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual({})
  })

  it('키와 값이 하나인 경우.', () => {
    // Given
    const str = '{"string": "123"}'

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual({
      string: '123'
    })
  })

  it('키와 값이 전부 문자열인 쌍이 2개인 경우', () => {
    // Given
    const str = `{
      "string1": "1", 
      "string2": "2"
    }`

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual({
      string1: '1',
      string2: '2'
    })
  })

  it('객체의 키는 문자열이고 값은 숫자인 경우.', () => {
    // Given
    const str = `{"number": 12345}`

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual({
      number: 12345
    })
  })

  it('객체의 키는 문자열이고 값은 null인 경우.', () => {
    // Given
    const str = `{"null": null}`

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual({
      'null': null
    })
  })

  it('객체의 키는 문자열이고 값은 숫자인게 여러개고 콤마로 구분된 경우.', () => {
    // Given
    const str = `{"number": 12345, "number2": 123}`

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual({
      number: 12345,
      number2: 123
    })
  })

  it('객체의 키는 문자열이고 값은 문자열 또는 숫자인 경우.', () => {
    // Given
    const str = `{"string": "12345", "number2": 123}`

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual({
      string: '12345',
      number2: 123
    })
  })

  it('객체의 키는 문자열이고 값은 불리언인 경우.', () => {
    // Given
    const str = `{"boolean1": true, "boolean2": false}`

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual({
      boolean1: true,
      boolean2: false
    })
  })

  it('[]을 전달한 경우.', () => {
    // Given
    const str = `[]`

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual([])
  })

  it('문자열 1개만 값으로 가지고 있는 배열인 경우.', () => {
    // Given
    const str = `["1"]`

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual(['1'])
  })


  it('객체 안에 문자열 키의 값으로 객체가 있는 경우.', () => {
    // Given
    const str = `{"key": {}}` // 11EA

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual({
      key: {}
    })
  })

  it('객체 안의 객체가 값을 가지고 있는 경우.', () => {
    // Given
    const str = `{"key": {"inner": "123", "inner2": {"inner3": 123}}}`

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual({
      key: {
        inner: '123',
        inner2: {
          inner3: 123
        }
      }
    })
  })

  it('객체 안에 배열이 값으로 있는 경우.', () => {
    // Given
    const str = `{"key": []}`

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual({
      key: []
    })
  })

  it('객체 안에 배열과 객체가 혼합된 경우.', () => {
    // Given
    const str = `
      {
        "object": 33,
        "array": [1, "2", 3]
      }
    `

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual({
      object: 33,
      array: [1, '2', 3]
    })
  })

  it('객체 안의 객체에 배열이 존재하는 경우.', () => {
    // Given
    const str = `
      {
        "object": {
          "array": [1, "2", 3, true]
        }
      }
    `

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual({
      object: {
        array: [1, "2", 3, true]
      }
    })
  })

  it('객체 안의 배열에 객체가 존재하는 경우.', () => {
    // Given
    const str = `
      {
        "array": [{}]
      }
    `

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual({
      array: [{}]
    })
  })

  it('객체 중간에 배열이 존재하는 경우.', () => {
    // Given
    const str = `{
      "number": 1234,
      "array": ["1"],
      "test": "1"
    }`

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual({
      "number": 1234,
      "array": ["1"],
      test: '1'
    })
  })

  it('객체 중간에 배열이 있고 마지막에 객체가 있는 경우', () => {
    // Given
    const str = `{
      "number": 1234,
      "array": ["1", 2, true],
      "bool": false,
      "test": {
        "a": [123]
      }
    }`

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual({
      number: 1234,
      array: ["1", 2, true],
      bool: false,
      test: {
        a: [123]
      }
    })
  })

  it('객체 중간에 배열이 있고 마지막엔 객체가 있는 경우.', () => {
    // Given
    const str = `{
      "number": 1234,
      "array": ["1", 2, true],
      "bool": false,
      "obj": {
        "key": "value",
        "key2": null
      }
    }`

    // When
    const json = parser(str)

    // Then
    expect(json).toEqual({
      number: 1234,
      array: ["1", 2, true],
      bool: false,
      obj: {
        key: "value",
        key2: null
      }
    })
  })
})

