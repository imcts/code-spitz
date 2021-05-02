import parse, {Test1} from './for-loop'

xdescribe('listen6 - for-loop', () => {
  it('예외처리.', () => {
    expect(() => parse(undefined)).toThrow('invalid type');
    expect(() => parse('')).toThrow('invalid type');
  });

  it('1차원 배열', () => {
    expect(parse('[]')).toEqual(JSON.parse('[]'))
    expect(parse('[1]')).toEqual(JSON.parse('[1]'))
    expect(parse('[1, 2, 3, 4]')).toEqual(JSON.parse('[1, 2, 3, 4]'))
    expect(parse('[false]')).toEqual(JSON.parse('[false]'))
    expect(parse('[true, false]')).toEqual(JSON.parse('[true, false]'))
    expect(() => parse('[undefined]')).toThrow('invalid value');
    expect(parse('[null]')).toEqual(JSON.parse('[null]'));
    expect(parse('[null, null]')).toEqual(JSON.parse('[null, null]'));
    expect(() => parse('[Symbol()]')).toThrow('invalid value');
    expect(() => parse('[()=>{}]')).toThrow('invalid value');
    expect(parse('["문자열"]')).toEqual(JSON.parse('["문자열"]'));
    expect(parse('["문자열1", "문자열2"]')).toEqual(JSON.parse('["문자열1", "문자열2"]'));
  });

  it('2차원 배열', () => {
    expect(parse('[[]]')).toEqual(JSON.parse('[[]]'))
    expect(parse('[1, []]')).toEqual(JSON.parse('[1, []]'))
    expect(parse('[[1], []]')).toEqual(JSON.parse('[[1], []]'))
    expect(parse('[1, [2]]')).toEqual(JSON.parse('[1, [2]]'))
    expect(parse('[1, [2], 3, [4, [5, 6, 7], 8]]')).toEqual(JSON.parse('[1, [2], 3, [4, [5, 6, 7], 8]]'))
  });

  it('클래스 인스턴스 배열', () => {
    expect(parse('["Test1@1"]')).toEqual([
      new Test1('1')
    ])
  });

  it('Date 배열', () => {
    expect(parse('["2021-05-01T19:20:09.336Z"]')).toEqual([
      new Date('2021-05-01T19:20:09.336Z')
    ])
  });

  it('종합 배열', () => {
    expect(parse('[1, 2, 3, 4, 5, [], 6, [7, 8, [9, 10]], ["Test1@1"], "2021-05-01T19:20:09.336Z"]')).toEqual([
      1, 2, 3, 4, 5, [], 6, [7, 8, [9, 10]], [new Test1('1')], new Date('2021-05-01T19:20:09.336Z')
    ])
  });
})

