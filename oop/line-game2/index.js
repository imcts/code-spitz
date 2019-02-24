/**
 * #Issue: Renderer 클래스에는 레이어를 위반하는 코드가 포함되어있다. 위반하는부분을찾아고치시오.
 *
 * #Resolve:
 *  1. 기존의 Renderer 안의 add 메소드에는 blockFactory를 호출하면서 blockWidth, blockHeight, image를 전달하고 있었다.
 *  2. 위 지식들은 구상 클래스의 지식이지 베이스 클래스의 지식은 아니다.
 *  3. blockWidth, blockHeight, image는 Renderer가 알 필요가 없는 지식이므로 SectionRenderer에 getBlockSize라는 메소드를 만들어서 사용하도록 변경한다.
 */

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