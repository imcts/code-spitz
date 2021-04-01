import arrayStringify from './for-loop'

describe('listen2 - for-loop', () => {
  it('배열이 아닌 경우', () => {
    [1, '', true, undefined, null, Symbol(), {}].forEach(v => {
      try {
        arrayStringify(v)
      } catch (e) {
        expect(e.message).toBe('invalid parameter.')
      }
    })
  });

  it('빈 배열인 경우', () => {
    expect(arrayStringify([])).toBe(JSON.stringify([]))
  });

  it('숫자인 경우', () => {
    expect(arrayStringify([1, 2, 3])).toBe(JSON.stringify([1, 2, 3]))
  });

  it('불리언인 경우', () => {
    expect(arrayStringify([true, false])).toBe(JSON.stringify([true, false]))
  });

  it('문자인 경우', () => {
    expect(arrayStringify(['1', '2', '3'])).toBe(JSON.stringify(['1', '2', '3']))
    expect(arrayStringify(['"ab"c"'])).toBe(JSON.stringify(['"ab"c"']))
  });

  it('undefined인 경우', () => {
    expect(arrayStringify([undefined, undefined])).toBe(JSON.stringify([undefined, undefined]))
  });

  it('null인 경우', () => {
    expect(arrayStringify([null, null])).toBe(JSON.stringify([null, null]))
  });

  it('function인 경우', () => {
    expect(arrayStringify([() => {}])).toBe(JSON.stringify([() => {}]))
  });

  it('symbol인 경우', () => {
    expect(arrayStringify([Symbol()])).toBe(JSON.stringify([Symbol()]))
  });

  it('과제', () => {
    // Given
    const arr = [1, '"ab"c"', true, undefined, null, _=>3, Symbol()]

    // When
    const result1 = arrayStringify(arr);
    const result2 = JSON.stringify(arr);

    // Then
    expect(result1).toBe(result2);
  });
})