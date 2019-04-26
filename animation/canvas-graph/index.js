const DATA = [{
  total: 100,
  new: 80
}, {
  total: 160,
  new: 130
}, {
  total: 80,
  new: 30
}, {
  total: 80,
  new: 50
}, {
  total: 110,
  new: 50
}, {
  total: 30,
  new: 10
}, {
  total: 100,
  new: 40
}]
new ReviewGraphController(DATA, new CanvasRenderer(document.getElementById('canvas')))
