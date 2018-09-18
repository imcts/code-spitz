// HTML Parser
const NODE_TYPE = {
  NODE: 'node',
  TEXT: 'text'
}
const IDENTIFY = {
  OPEN: '<',
  CLOSE: '>',
  SLASH: '/'
}

const textNode = (input, cursor, current) => {
  const idx = input.indexOf(IDENTIFY.OPEN, cursor)
  const node = makeNode({
    type: NODE_TYPE.NODE,
    text: input.substring(cursor, idx)
  })
  current.node.children.push(node)
  return idx
}

const parseAttribute = (attributes = []) => {
  return attributes.join('')
            .match(/[a-zA-Z-]+={1}"{1}[a-zA-Z:/.;]+"{1}/g)
            .reduce((accumulator, attribute) => {
              let [key, value] = attribute.split('=')
              value = value.match(/^"(.*)"$/i)[1]
              accumulator.push({key, value})
              return accumulator
            }, [])
}

const elementNode = (input, cursor, idx, current) => {
  const isClose = input[idx - 1] === IDENTIFY.SLASH
  const tagInfo = input.substring(cursor + 1, idx - (isClose ? 1 : 0))
  let [name, ...attributes] = tagInfo.split(' ')

  if (attributes.length) {
    attributes = parseAttribute(attributes)
  }

  const node = makeNode({
    name,
    attributes
  })
  current.node.children.push(node)

  if (!isClose) {
    current.back = { ...current }
    current.node = node
  }
}

const makeNode = ({name = '', type = NODE_TYPE.NODE, text = '', attributes = []}) => {
  const node = {
    name,
    type,
    attributes,
    children: []
  }

  if (node.type === NODE_TYPE.NODE && text) {
    node.text = text
  }
  return node
}

const parser = input => {
  input = input.trim()

  const rootNode = makeNode({name: 'ROOT'})
  let current = {node: rootNode, back: null}
  let i = 0
  let j = input.length
  while (i < j) {
    const cursor = i

    if (input[cursor] === IDENTIFY.OPEN) {
      const idx = input.indexOf(IDENTIFY.CLOSE, cursor)
      i = idx + 1

      if (input[cursor + 1] === IDENTIFY.SLASH) {
        current = current.back
      } else {
        elementNode(input, cursor, idx, current)
      }
    } else {
      i = textNode(input, cursor, current)
    }
  }
  return rootNode
}

const HTML = `
<div data-set="test">
  a
  <a href="http://www.naver.com"style="background:red;" class="test">b</a>
  c
  <img src="http://www.naver.com/test.png"/>
  <img/>
  d
</div>
`
console.dir(parser(HTML))
