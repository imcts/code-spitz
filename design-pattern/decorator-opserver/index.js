/**
 * issued: 1. 5강의 내용을 바탕으로 실제 구동되는 코드를 구현하시오.
 *         2. 현재는 task에만 데코레이터가 적용 되어 있다. folder를 그리는곳도 데코레이터를 적용하라.
 *         3. [심화] 데코레이터가 값 기반이 아닌 객체 기반으로 작성
 *
 * resolved:
 *         1. 기존 Visitor 함수에서 값을 반환하던 로직을 visitor 안으로 숨긴다.
 *           - 부모를 담을 수 있는 parent와 기존 부모를 참조할 수 있도록 저장하는 parents를 만든다.
 *           - 구현해야하는 메소드는 구상 클래스로 전부 위임하고 공통 로직만 Visitor에 작성한다.
 *         2. task가 데코레이터 될 수 있도록 구현한다.
 *         3. folder가 데코레이터 될 수 있도록 구현한다.
 *         4. 데코레이터가 값 기반이 아닌 객체 기반으로 구성한다.
 */
new TodoView('#wrapper', new TodoModel)
