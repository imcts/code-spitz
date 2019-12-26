const RemoveDecorator = class extends Decorator {
  _task (wrapper, task) {
    const a = el('a', {innerHTML: 'X', className: 'remove', task})
    a.onclick = e => {
      this.notify(EVENT.REMOVE_TASK, task)
      e.stopPropagation()
    }
    wrapper.appendChild(a)
  }
}
