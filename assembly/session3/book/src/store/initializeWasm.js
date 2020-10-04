export default async function initializeWasm() {
  const wasmMemory = new WebAssembly.Memory({ initial: 1024 });
  const {instance: {exports: {free, malloc}}} = await loadModule('./assets/memory.wasm', {env: {
    memory: wasmMemory
  }})
  const {instance: {exports}} = await loadModule('./assets/main.wasm', {env: {
      _free: free,
      _malloc: malloc,
      memoryBase: 0,
      abort: console.log,
      memory: wasmMemory,
      log: console.log
  }})
  return exports
}
