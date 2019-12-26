/**
 * Issue: Task와 Folder를 생성하는 책임이 구상 Renderer에있어 Renderer를 수정하지않으면 Task나 Folder를 수정할수없다.
 *         이 결합도를 해소하기 위해 생성책임자체를 Task와 Folder쪽에 위임하도록 코드를 개선하시오.
 *
 * Solution:
 *  1. selectedFolder는 DomRenderer가 알아야 할 정보가 아니므로 App으로 이동한다.
 *  2. DomRenderer는 이벤트가 발생할시 folder나 task를 생성할때 필요한 title값에 대한 validate만 수행하며 addFolder와 addTask를 호출하며 title을 전달하기만 한다.
 *  3. 생성 책임 자체를 Task와 Folder쪽에 위임해야 하므로 static newInstance를 정의하여 새로운 객체를 각 클래스에서 반환하도록 변경한다.
 *  4. Task 및 Folder의 newInstance메소드에서만 원하는 객체를 반환하기 때문에 각 클래스만 수정하면 되도록 결합도를 낮출 수 있다.
 */
const Task = class {
  static newInstance (title) {
    return new Task(title)
  }

  constructor (title) {
    this.title = title
    this.isComplete = false
  }

  toggle () {
    this.isComplete = !this.isComplete
  }

  getInfo () {
    return {...this}
  }
}


const Folder = class extends Set {
  static newInstance (title) {
    return new Folder(title)
  }

  constructor (title) {
    super()
    this.title = title
  }

  addTask (title) {
    super.add(Task.newInstance(title))
  }

  getTitle () {
    return this.title
  }

  getTasks () {
    return [...super.values()]
  }
}

const App = class extends Set {
  constructor () {
    super()
    this.selectedFolder = null
  }

  addFolder (title) {
    const folder = Folder.newInstance(title)
    this.selectedFolder = folder
    super.add(folder)
  }

  getFolders () {
    return [...this.values()]
  }

  getSelectedFolder () {
    return this.selectedFolder
  }

  setSelectedFolder (folder) {
    if (folder !== this.selectedFolder) {
      this.selectedFolder = folder
    }
  }
}

const Renderer = class {
  constructor (app) {
    this.app = app
  }

  render () {
    this._render()
  }

  _render () {
    throw new Error('_render is have to be override.')
  }
}

const CODE_OF_ENTER_OF_ASCII = 13
const COLOR = {
  BLACK: '#000',
  GRAY: '#777'
}
const DomRenderer = class extends Renderer {
  constructor (parent, app) {
    super(app)
    this.section = parent.appendChild(document.createElement('section'))
    this.section.innerHTML = `
      <nav>
        <input/>
        <ul></ul>
      </nav>
      <section>
        <input/>
        <ul></ul>
      </section>`

    const [folderUl, taskUl] = this.section.querySelectorAll('ul')
    this.folderUl = folderUl
    this.taskUl = taskUl
    this._bindEvents()
  }

  _bindEvents () {
    const [folder, input] = this.section.querySelectorAll('input')

    folder.addEventListener('keyup', e => {
      if (e.keyCode !== CODE_OF_ENTER_OF_ASCII) {
        return
      }
      const title = e.target.value.trim()
      e.target.value = ''
      if (!title) {
        return
      }
      this.app.addFolder(title)
      this.render()
    })
    input.addEventListener('keyup', e => {
      const selectedFolder = this.app.getSelectedFolder()

      if (e.keyCode !== CODE_OF_ENTER_OF_ASCII || !selectedFolder) {
        return
      }

      const title = e.target.value.trim()
      e.target.value = ''

      if (!title) {
        return
      }
      selectedFolder.addTask(title)
      this.render()
    })
  }

  _render () {
    this._renderFolders()
    this._renderTasks()
  }

  _renderFolders () {
    const folders = this.app.getFolders()
    if (!folders.length) {
      return
    }
    const app = this.app
    const selectedFolder = app.getSelectedFolder()
    if (!selectedFolder) {
      app.setSelectedFolder(folders[0])
    }

    this.folderUl.innerHTML = ''
    folders.forEach(folder => {
      const li = document.createElement('li')
      li.innerHTML = folder.getTitle()
      li.style.color = selectedFolder === folder ? COLOR.BLACK : COLOR.GRAY
      li.addEventListener('click', e => {
        app.setSelectedFolder(folder)
        this.render()
      })
      this.folderUl.appendChild(li)
    })
  }

  _renderTasks () {
    const selectedFolder = this.app.getSelectedFolder()
    if (!selectedFolder) {
      return
    }

    this.taskUl.innerHTML = ''
    selectedFolder.getTasks().forEach(task => {
      const li = document.createElement('li')
      const {title, isComplete} = task.getInfo()

      li.innerHTML = (isComplete ? 'completed ' : 'process ') + title
      li.addEventListener('click', e => {
        task.toggle()
        this.render()
      })
      this.taskUl.appendChild(li)
    })
  }
}

new DomRenderer(document.body, new App());
