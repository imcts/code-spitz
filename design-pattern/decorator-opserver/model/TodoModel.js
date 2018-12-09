const ORDER_BY = {
  TITLE: 'title',
  DATE: 'date',
  GROUP: 'group'
}

const TodoModel = class {
  constructor () {
    this._order = ORDER_BY.TITLE
    this._group = false
    this._folder = null
    this._folders = []
    this._fetchFolder()
  }

  _fetchFolder () {
    // Set mock data.
    const folder = new Task('[star] 79-5-1 @dolen')
    folder.add('[urgent] 영어회화 학원 @dolen @sirupe')
    folder.add('[high] 태권도 학원 @dolen @sirupe')
    folder.add('[low] ES6 스터디 @dolen')
    folder.add('[low] 영어 문법 스터디 @dolen @sirupe', new Date('2018-09-01'))
    folder.add('[normal] 헤드퍼스트 디자인패턴 스터디 @dolen @sirupe')
    folder.add('[urgent] 코드스피츠 스터디 @dolen')

    const {list: [{task: es6}, {task: english}]} = folder.byTitle()
    es6.add('[low] 블로그에 정리 @dolen')
    english.add('[high] 번역 숙제 @dolen')

    const {list: [{task: subEnglish}]} = english.byTitle()
    subEnglish.add('[high] 12월 7일 영작 @dolen')



    const folder1 = new Task('[skull] 79-5-2 @dolen')
    folder1.add('[low] 늦잠자기')
    folder1.add('[normal] 와 오랜만에 밤새보네 -ㅁ -')
    folder1.add('[low] 영화나 보러갈까', new Date('2018-09-01'))

    const {list: [{task: late}, {task: movie}]} = folder1.byTitle()
    late.add('[high] 점심은 뭐먹지')
    late.add('[urgent] 김치찌개 먹을까')

    movie.add('[low] 영화 뭐보지')

    const {list: [{task: title}]} = movie.byTitle()
    title.add('[low] 퀸 보러 가야하나')

    this._folder = folder
    this._folders.push(folder)
    this._folders.push(folder1)
  }

  getData () {
    return {
      folders: this._getFolders(),
      folder: this._getFolder(),
      orderState: this._getOrderState()
    }
  }

  _getFolders () {
    return this._folders.map(folder => folder)
  }

  _getFolder () {
    if (this._order === ORDER_BY.TITLE) {
      return this._folder.byTitle(this._group)
    } else {
      return this._folder.byDate(this._group)
    }
  }

  _getOrderState () {
    return {
      order: this._order,
      group: this._group
    }
  }

  _clearOrderState () {
    this._order = ORDER_BY.TITLE
    this._group = false
  }

  toggleGroup () {
    this._group = !this._group
  }

  set order (order) {
    if (this._order !== order) {
      this._order = order
    }
  }

  set folder (folder) {
    if (this._folders.includes(folder) && this._folder !== folder) {
      this._folder = folder
      this._clearOrderState()
    }
  }
}
