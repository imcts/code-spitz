const PriorityDecorator = class extends Decorator {
  _task (wrapper, task) {
    wrapper.innerHTML = wrapper.innerHTML.replace(/\[(urgent|high|normal|low)\]/gi, '<span class="$1">■</span>')
  }
}
