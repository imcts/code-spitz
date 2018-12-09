const TaskView = class extends Decorator {
  _task (wrapper, task) {
    wrapper.innerHTML = task.title
  }
}
