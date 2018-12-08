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
    // TODO 데이터 설정.
    const folder = new Task('79-5-1')
    folder.add('영어회화 학원')
    folder.add('태권도 학원')
    folder.add('ES6 스터디')
    folder.add('영어 문법 스터디', new Date('2018-09-01'))
    folder.add('이펙티브자바 스터디')
    folder.add('코드스피츠 스터디')

    const {list: [{task: es6}, {task: english}]} = folder.byTitle()
    es6.add('블로그에 정리')
    english.add('번역 숙제')

    const {list: [{task: subEnglish}]} = english.byTitle()
    subEnglish.add('12월 7일 영작')



    const folder1 = new Task('79-5-2')
    folder1.add('늦잠자기')
    folder1.add('휴가에 스터디 숙제라니')
    folder1.add('영화나 보러갈까', new Date('2018-09-01'))

    const {list: [{task: late}, {task: movie}]} = folder1.byTitle()
    late.add('점심은 뭐먹지')
    late.add('김치찌개 먹을까')

    movie.add('영화 뭐보지')

    const {list: [{task: title}]} = movie.byTitle()
    title.add('퀸 보러 가야하나')

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
