const model = [
  {
    key: 'wrapper',
    style: {
      width: '50%',
      background: 'red',
      cursor: 'pointer'
    },
    event: {
      click (e, viewModel) {
        viewModel.stop()
      }
    }
  },
  {
    key: 'title',
    property: {
      innerHTML: 'Title'
    }
  },
  {
    key: 'content',
    property: {
      innerHTML: 'Contents'
    }
  }
]

const viewModels = ViewModels.from(model)
const renderer = Renderer.of(viewModels, Scanner.from(document.querySelector('#app')))

const wrapperViewModel = viewModels.getViewModel('wrapper')
const f = () => {
  if (wrapperViewModel.isStop()) {
    return
  }
  renderer.render()
  wrapperViewModel.changeColor()
  requestAnimationFrame(f)
}
requestAnimationFrame(f)