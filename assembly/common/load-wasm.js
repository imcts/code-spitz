const getEnv = env => Object.assign({
  __memory_base: 0,
  tableBase: 0,
  memory: new WebAssembly.Memory({ initial: 256 }),
  table: new WebAssembly.Table({ initial: 2, element: 'anyfunc' }),
  abort: console.log
}, env)

const loadModule = async (fileName, importObj = {env: {}}) => await WebAssembly.instantiateStreaming(
  fetch(fileName),
  (importObj.env = getEnv(importObj.env), importObj)
)
