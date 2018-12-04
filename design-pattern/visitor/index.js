/**
 * issued: 1. DOM 비지터를 기반으로 정렬과 각 태스크별 완료 체크를 할 수 있게 구현하시오.
 *         2. 근데 너는 앱 만들어와야하지 않냐??
 *
 * resolved:
 *  - folders와 현재 앱의 상태를 담기 위한 TodoModel 생성.
 *  - 렌더러를 호출하고 이벤트를 바인딩하기 위한 TodoView 생성.
 *  - Todo를 렌더링하기 위한 Renderer생성.
 *  - 복잡한 알고리즘을 순회하며 화면을 대신 렌더링해주는 전략객체인 DomVisitor생성.
 *  - Visitor의 인터페이스 Visitor생성.
 *  - 폴더를 그리기 위해 Visitor에 folders 추가.
 *  - 버튼을 렌더링 하기 위해 Visitor에 order추가.
 */
new TodoView('#wrapper', new TodoModel)
