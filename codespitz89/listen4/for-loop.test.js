import objectStringify from './for-loop'

xdescribe('listen4 - for-loop', () => {
  it('객체가 아닌 경우', () => {
    expect(() => objectStringify(null)).toThrow('invalid object')
    expect(() => objectStringify(undefined)).toThrow('invalid object')
    expect(() => objectStringify(3)).toThrow('invalid object')
    expect(() => objectStringify('123123123')).toThrow('invalid object')
    expect(() => objectStringify(function () {})).toThrow('invalid object')
  });

  it('숫자인 경우', () => {
    expect(objectStringify({a: 3})).toBe(JSON.stringify({a: 3}))
    expect(objectStringify({a: 1, b: 2})).toBe(JSON.stringify({a: 1, b: 2}))
  });

  it('문자인 경우', () => {
    expect(objectStringify({a: '"ab"c"'})).toBe(JSON.stringify({a: '"ab"c"'}))
    expect(objectStringify({a: '"ab"c"', b: '123123'})).toBe(JSON.stringify({a: '"ab"c"', b: '123123'}))
  });

  it('불리언인 경우', () => {
    expect(objectStringify({a: true})).toBe(JSON.stringify({a: true}))
    expect(objectStringify({a: false, b: true})).toBe(JSON.stringify({a: false, b: true}))
  });

  it('null인 경우', () => {
    expect(objectStringify({a: null})).toBe(JSON.stringify({a: null}))
    expect(objectStringify({a: null, b: null})).toBe(JSON.stringify({a: null, b: null}))
  });

  it('undefined인 경우', () => {
    expect(objectStringify({a: undefined})).toBe(JSON.stringify({a: undefined}))
    expect(objectStringify({a: undefined, b: undefined})).toBe(JSON.stringify({a: undefined, b: undefined}))
  });

  it('Symbol인 경우', () => {
    expect(objectStringify({a: Symbol()})).toBe(JSON.stringify({a: Symbol()}))
    expect(objectStringify({a: Symbol(), b: Symbol()})).toBe(JSON.stringify({a: Symbol(), b: Symbol()}))
  });

  it('function인 경우', () => {
    expect(objectStringify({a: () => {}})).toBe(JSON.stringify({a: () => {}}))
    expect(objectStringify({a: () => {}, b: () => {}})).toBe(JSON.stringify({a: () => {}, b: () => {}}))
  });
})