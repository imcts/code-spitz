/**
 * issued: 1. 5강의 내용을 바탕으로 실제 구동되는 코드를 구현하시오.
 *         2. 현재는 task에만 데코레이터가 적용 되어 있다. folder를 그리는곳도 데코레이터를 적용하라.
 *         3. [심화] 데코레이터가 값 기반이 아닌 객체 기반으로 작성
 * resolved:
 *         1. 기존 Visitor 함수에서 값을 반환하던 로직을 visitor 안으로 숨긴다.
 *           - 부모를 담을 수 있는 parent와 기존 부모를 참조할 수 있도록 저장하는 parents를 만든다.
 *           - 구현해야하는 메소드는 구상 클래스로 전부 위임하고 공통 로직만 Visitor에 작성한다.
 *         2. task가 데코레이터 될 수 있도록 구현한다.
 *          - 데코레이터 인터페이스 Decorator.js를 생성한다.
 *          - 기본 데코레이터인 TaskView.js를 생성한다.
 *          - @멤버를 위한 TaskMemberView.js를 생성한다.
 *          - 우선순위를 위한 TaskPriorityView.js를 생성한다.
 *          - Visitor가 생성될때 데코레이터들을 주입하여 초기화한다.
 *         3. folder가 데코레이터 될 수 있도록 구현한다.
 *          - 폴더도 어차피 Task이기 때문에 기존것을 그대로 사용한다.
 *          - 폴더에는 SymbolDecorator.js를 생성하여 심볼들이 그려질 수 있도록 한다.
 *         4. 데코레이터가 값 기반이 아닌 객체 기반으로 구성한다.
 *          - 엘리먼트를 전달하여 처리하도록 구현.
 *         5. 옵저버 패턴을 적용하여 이벤트를 처리하도록 변경한다.
 *          - 인터페이스 Observer.js를 생성한다.
 *          - Visitor와 Renderer와 TodoView는 Observer를 상속한다.
 *          - task나 folder가 그려지고 onclick 이벤트를 적용한다.
 *          - 클릭이 발생되어 유효한 이벤트인 경우 전파한다.
 *          - TodoView에서 이벤트에 대한 처리를 수행 후 다시 그린다.
 */
new TodoView('#wrapper', new TodoModel)
