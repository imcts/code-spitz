const parse = (() => {
  const attributeParser = {
    table: {
      data: (dom, name, value) => {
        const [, key] = name.match(/^data-(\w+)/);
        dom.dataset[key] = value;
      },
      style: (dom, name, value) => {
        if (!value) {
          return;
        }
        const styleAttributes = value.match(/(\w+)\s*:\s*(\w+);?/g)
        for (let i = 0; i < styleAttributes.length; i++) {
          const [, key, property] = styleAttributes[i].match(/(\w+)\s*:\s*(\w+);?/);
          dom.style[key] = property;
        }
      },
      id: (dom, name, value) => dom.id = value,
      class: (dom, name, value) => dom.className = value,
      default: (dom, name, value) => dom.setAttribute(name, value)
    },
    getKey (name) {
      return Object.keys(this.table).find(key => name.startsWith(key)) ?? 'default';
    },
    router (dom, attribute) {
      if (!attribute) {
        return;
      }
      const attributes = attribute.match(/([\w-]+=\"[^"|^']*\")/g);
      for (let i = 0; i < attributes.length; i++) {
        const [, name, value] = attributes[i].match(/([\w-]+)=\"([^"|^']+)/);
        this.table[this.getKey(name)](dom, name, value)
      }
    }
  };

  const tagParser = {
    table: {
      closeTag (html) {
        return this.createDom(html.slice(0, html.length - 1))
      },
      openTag (html) {
        return this.createDom(html);
      },
      createDom (str) {
        const [, name, attribute] = str.match(/^<\s*(\w+)\s*(.*)\s*$/);
        const dom = document.createElement(name);
        attributeParser.router(dom, attribute);
        return dom;
      }
    },
    route (html) {
      return this.table[html.endsWith('/') ? 'closeTag' : 'openTag'](html);
    }
  }
  return html => {
    if (!html) {
      throw new TypeError('invalid data');
    }
    let str = html;
    let node = null;
    while (true) {
      str = str.trim();
      if (!str) {
        return node;
      }
      let index;
      switch (str[0]) {
        case '<':
          index = str.indexOf('>');
          if (str[1] === '/') {
            str = str.slice(index + 1);
            node = node?.parentElement ?? node;
            break;
          } else {
            const dom = tagParser.route(str.slice(0, index))
            if (node) {
              node.appendChild(dom)
            }
            node = str[index - 1] === '/' ? (node ?? dom) : dom;
            str = str.slice(index + 1);
            break;
          }
        default:
          index = str.indexOf('<');
          const text = document.createTextNode(str.slice(0, index).trim());
          node.appendChild(text);
          str = str.slice(index);
          node = node;
          break;
      }
    }
  }
})();

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

console.log(parse(str).innerHTML === html.innerHTML);

export default parse