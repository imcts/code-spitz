import stringify from './for-loop'

describe('listen5 - for-loop', () => {
  it('단일 값인 경우', () => {
    expect(stringify(1)).toBe(JSON.stringify(1));
    expect(stringify('1')).toBe(JSON.stringify('1'));
    expect(stringify(true)).toBe(JSON.stringify(true));
    expect(stringify(Symbol())).toBe(JSON.stringify(Symbol()));
    expect(stringify(null)).toBe(JSON.stringify(null));
    expect(stringify(undefined)).toBe(JSON.stringify(undefined));
  });

  xit('빈 객체나 배열인 경우', () => {
    expect(stringify([])).toBe(JSON.stringify([]))
    expect(stringify({})).toBe(JSON.stringify({}))
  });

  xit('1 차원 배열인 경우', () => {
    expect(stringify([1])).toBe(JSON.stringify([1]))
    expect(stringify([1, 2])).toBe(JSON.stringify([1, 2]))
    expect(stringify(['1'])).toBe(JSON.stringify(['1']))
    expect(stringify(['1', '2'])).toBe(JSON.stringify(['1', '2']))
    expect(stringify([Symbol()])).toBe(JSON.stringify([Symbol()]))
    expect(stringify([Symbol(), Symbol()])).toBe(JSON.stringify([Symbol(), Symbol()]))
    expect(stringify([() => {}])).toBe(JSON.stringify([() => {}]))
    expect(stringify([() => {}, () => {}])).toBe(JSON.stringify([() => {}, () => {}]))
    expect(stringify([true])).toBe(JSON.stringify([true]))
    expect(stringify([true, false])).toBe(JSON.stringify([true, false]))
    expect(stringify([null])).toBe(JSON.stringify([null]))
    expect(stringify([null, null])).toBe(JSON.stringify([null, null]))
    expect(stringify([undefined])).toBe(JSON.stringify([undefined]))
    expect(stringify([undefined, undefined])).toBe(JSON.stringify([undefined, undefined]))
  });

  it('2 차원 배열인 경우', () => {
    expect(stringify([1, []])).toBe(JSON.stringify([1, []]))
    expect(stringify([1, [2]])).toBe(JSON.stringify([1, [2]]))
    expect(stringify([1, [2], 3])).toBe(JSON.stringify([1, [2], 3]))
    expect(stringify([1, [2], 3, [4, 5, 6]])).toBe(JSON.stringify([1, [2], 3, [4, 5, 6]]))
    expect(stringify([1, [2], 3, [4, 5, 6, [], [7, 8]]])).toBe(JSON.stringify([1, [2], 3, [4, 5, 6, [], [7, 8]]]))
  });

  it('1차원 객체인 경우', () => {
    expect(stringify({a: 1})).toBe(JSON.stringify({a: 1}))
    expect(stringify({a: 1, b: 2})).toBe(JSON.stringify({a: 1, b: 2}))
    expect(stringify({a: '1'})).toBe(JSON.stringify({a: '1'}))
    expect(stringify({a: '1', b: '2'})).toBe(JSON.stringify({a: '1', b: '2'}))
    expect(stringify({a: true})).toBe(JSON.stringify({a: true}))
    expect(stringify({a: true, b: false})).toBe(JSON.stringify({a: true, b: false}))
    expect(stringify({a: null})).toBe(JSON.stringify({a: null}))
    expect(stringify({a: null, b: null})).toBe(JSON.stringify({a: null, b: null}))
    expect(stringify({a: undefined})).toBe(JSON.stringify({a: undefined}))
    expect(stringify({a: undefined, b: undefined})).toBe(JSON.stringify({a: undefined, b: undefined}))
    expect(stringify({a: 1, b: '2', c: false, d: undefined, e: null, f: undefined})).toBe(JSON.stringify({a: 1, b: '2', c: false, d: undefined, e: null, f: undefined}))
  });

  it('2 차원 객체인 경우', () => {
    expect(stringify({a: {}})).toBe(JSON.stringify({a: {}}))
    expect(stringify({a: {b: 1, c: 2}})).toBe(JSON.stringify({a: {b: 1, c: 2}}))
    expect(stringify({a: {b: 1, c: 2}, d: 3, e: 5})).toBe(JSON.stringify({a: {b: 1, c: 2}, d: 3, e: 5}))
    expect(stringify({a: {b: 1, c: {}}, d: 3, e: 5})).toBe(JSON.stringify({a: {b: 1, c: {}}, d: 3, e: 5}))
    expect(stringify({a: {b: 1, c: {}}, d: 3, e: 5})).toBe(JSON.stringify({a: {b: 1, c: {}}, d: 3, e: 5}))
    expect(stringify({a: {b: 1, c: [], f: [6, 7, 8, 9, 10]}, d: 3, e: 5})).toBe(JSON.stringify({a: {b: 1, c: [], f: [6, 7, 8, 9, 10]}, d: 3, e: 5}))
    expect(stringify({a: []})).toBe(JSON.stringify({a: []}))
    expect(stringify({a: [1, '2', Symbol(), null, true, false], b: [], c: 3, e: {f: {}, g: [], h: () => {}}})).toBe(JSON.stringify({a: [1, '2', Symbol(), null, true, false], b: [], c: 3, e: {f: {}, g: [], h: () => {}}}))
  });
})