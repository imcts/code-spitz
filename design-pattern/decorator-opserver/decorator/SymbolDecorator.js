const SymbolDecorator = class extends Decorator {
  _task (wrapper, task) {
    wrapper.innerHTML = wrapper.innerHTML.replace(/\[(star|clover|coffee|skull)\]/gi, (match, p1) => {
      let symbol

      switch (p1) {
        case 'star':
          symbol = '★'
          break
        case 'clover':
          symbol = '☘'
          break
        case 'coffee':
          symbol = '☕'
          break
        case 'skull':
          symbol = '☠'
          break
        default:
          symbol = ''
          break
      }
      return `<span class="${p1}">${symbol}</span>`
    })
  }
}
