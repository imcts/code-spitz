const MemberDecorator = class extends Decorator {
  constructor (members = []) {
    super()
    this._regexp = new RegExp(`@(${members.join('|')})`, 'g');
  }
  _task (wrapper, task) {
    wrapper.innerHTML = wrapper.innerHTML.replace(this._regexp, '<a href="#$1">@$1</a>')
  }
}
