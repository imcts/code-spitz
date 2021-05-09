import parse from './tail-recursion'

xdescribe('listen7 - tail-recursion', () => {
  it('예외처리.', () => {
    expect(() => parse(undefined)).toThrow('invalid data');
    expect(() => parse('')).toThrow('invalid data');
  })

  it('단일 태그.', () => {
    const html = document.createElement('html')
    expect(parse(`<html></html>`)).toStrictEqual(html);
    expect(parse(`<html/>`)).toStrictEqual(html);
  })

  it('단일 태그 속성.', () => {
    const div = document.createElement('div')
    div.id = 'div';
    expect(parse(`<div id="div"></div>`)).toStrictEqual(div);
    div.className = 'name name2';
    expect(parse(`<div id="div" class="name name2"></div>`)).toStrictEqual(div);
    div.dataset.a = 3;
    expect(parse(`<div id="div" class="name name2" data-a="3"></div>`)).toStrictEqual(div);
    div.style.width = '300px';
    div.style.height = '500px';
    expect(parse(`<div id="div" class="name name2" data-a="3" style="width: 300px; height: 500px"></div>`)).toStrictEqual(div);
  })

  it('이중 태그', () => {
    const html = document.createElement('html');
    const div = document.createElement('div');
    html.appendChild(div);
    expect(parse(`<html><div></div></html>`)).toStrictEqual(html);
    div.className = 'name name2';
    expect(parse(`<html><div class="name name2"></div></html>`)).toStrictEqual(html);
    const text = document.createTextNode('문자열 입니다.');
    div.appendChild(text);
    expect(parse(`<html><div class="name name2">문자열 입니다.</div></html>`)).toStrictEqual(html);
    const div2 = document.createElement('div');
    div.appendChild(div2);
    const text2 = document.createTextNode('문짜열!!');
    div2.appendChild(text2);
    expect(parse(`<html><div class="name name2">문자열 입니다.<div>문짜열!!</div></div></html>`)).toStrictEqual(html);
  })

  it('이중 태그 언페어 태그 중첩', () => {
    const html = document.createElement('html');
    const img = document.createElement('img');
    img.className = 'image';
    img.src = 'http://www.naver.com';
    img.style.width = '300px';
    img.style.height = '300px';
    html.appendChild(img);
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', '입력값 입니다.');
    html.appendChild(input);
    expect(parse(`
        <html>
            <img class="image" src="http://www.naver.com" style="width:300px; height: 300px;"/>
            <input type="text" value="입력값 입니다."/>
        </html>`)).toStrictEqual(html);
  })

  it('finish', () => {
    const str = `
      <html>
        <head></head>
        <body>
            <div class="wrapper">
                <h4>제목 입니다.</h4>
                <main class="container">
                    내용 입니다.
                    <img class="image" src="http://www.naver.com" style="width:300px; height: 300px;"/>
                    <input type="text" value="입력값 입니다."/>
                </main>
            </div>
        </body>
      </html>`
    const html = document.createElement('html');
    const head = document.createElement('head');
    html.appendChild(head);
    const body = document.createElement('body');
    html.appendChild(body);
    const div = document.createElement('div');
    div.className = 'wrapper';
    body.appendChild(div);
    const h4 = document.createElement('h4');
    const hText = document.createTextNode('제목 입니다.');
    h4.appendChild(hText);
    div.appendChild(h4);
    const main = document.createElement('main');
    main.className = 'container';
    div.appendChild(main);
    const mText = document.createTextNode('내용 입니다.');
    main.appendChild(mText);
    const img = document.createElement('img');
    img.className = 'image';
    img.src = 'http://www.naver.com';
    img.style.width = '300px';
    img.style.height = '300px';
    main.appendChild(img);
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', '입력값 입니다.');
    main.appendChild(input);
    expect(parse(str)).toStrictEqual(html);
    expect(parse(str).innerHTML).toBe(html.innerHTML)
  })
})

