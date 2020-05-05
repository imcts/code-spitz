const Observer = class extends Set {
  addListener (observer) {
    Assertion.assertInstanceOf(observer, Observer)
    return super.add(observer)
  }
  
  removeListener (observer) {
    Assertion.assertInstanceOf(observer, Observer)
    return super.remove(observer)
  }
  
  notify (data) {
    this.forEach(listener => listener.update(data))
  }
  
  update (data) {
    throw new Error(ERROR.OVERRIDE)
  }
}
