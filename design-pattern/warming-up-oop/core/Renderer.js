const Renderer = class {
  constructor (element, data) {
    if (!(typeof element === 'string' && element)) {
      throw new TypeError('The element is invalidated.')
    }
    if(!(data instanceof Data)) {
      throw new TypeError('The data must be the type of Data.')
    }

    this._element = element
    this._data = data
    this._title = ''
    this._header = ''
    this._items = []
  }

  /**
   * Issue:
   *  지금까지 전개한 객체협력모델에서는 여전히 문제가 남아있다.
   *  Info는 Data와 Renderer 사이에 교환을 위한 프로토콜 이다.
   *  Renderer의 자식인 TableRenderer도 Info에 의존적인 상태다.
   *  이를 개선하라.
   *
   * Resolved:
   *  1. Value Object인 Info 클래스는 Data 클래스와 Renderer와 통신할때 사용되는 프로토콜 클래스이다.
   *  2. this._info에 값을 저장하게 되면 구상클래스인 TableRenderer 클래스에서도 info를 알고있어야 한다.
   *  3. this._render메소드에 인자로 title, header, items를 인자로 전달하는 것은 문제가 있다.
   *    - 인자를 전달받아서 사용되는 것은 함수이거나 static 메소드여야지 객체의 private 메소드일 필요가 없기 때문이다.
   *  4. Renderer 클래스는 현재 화면을 그릴때 필요한 Renderer이기 때문에 무엇을 그려야 하는지, 그것을 그리기 위해서는 무슨 값이 필요한지도 알아야 한다.
   *  5. private값에 info에서 전달 받은 값들을 저장하고 this._render를 호출한다.
   *  6. 이로써 구상객체인 TableRenderer는 info에 의존적이지 않고 부모가 가지고 있는 값을 사용해서 렌더링만 수행할 수 있게 된다.
   */
  async render () {
    const {title, header, items} = await this._data.getData()
    this._title = title
    this._header = header
    this._items = items
    this._render()
  }

  _render () {
    throw new Error('The render must be overridden.')
  }
}
