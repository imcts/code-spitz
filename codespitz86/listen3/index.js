const model = [
  {
    key: KEY.WRAPPER,
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
    key: KEY.TITLE,
    property: {
      innerHTML: 'Title'
    }
  },
  {
    key: KEY.CONTENT,
    property: {
      innerHTML: 'Contents'
    }
  }
]

const viewModels = ViewModels.from(model)
const renderer = Renderer.of(
  viewModels,
  Scanner.from(document.querySelector('#app'))
)

const wrapperViewModel = viewModels.getViewModel(KEY.WRAPPER)
const f = () => {
  if (wrapperViewModel.isStop()) {
    return
  }
  wrapperViewModel.changeColor()
  requestAnimationFrame(f)
}
requestAnimationFrame(f)
