const container = document.querySelector('#stage')

new Game({
  row: COUNT_OF_ROW,
  column: COUNT_OF_COLUMN,
  renderer: new SectionRenderer({
    container,
    width: container.offsetWidth,
    height: container.offsetHeight,
    row: COUNT_OF_ROW,
    column: COUNT_OF_COLUMN,
    rendererFactory: DivRenderer.new
  })
})