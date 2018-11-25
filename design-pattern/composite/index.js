/**
 * @practice1
 * issued: 자식 task가 없는 경우는 ul이 추가되지 않게 개선 하시오.
 * resolved: DomRenderer._render를 실행할때 list.length를 확인하여 그리지 않도록 처리.
 *
 * @practice2
 * issued: 각 태스크의 완료 여부를 체크할 수 있게 개선 하시오.
 * resolved: 각 태스크가 생성될때 엘리먼트에 task reference를 할당하여 클릭 이벤트 발생시 task의
 * toggle메소드를 실행할 수 있도록 구현. task.isComplete를 가지고 있는경우에는 complete 클래스를 할당.
 */
const folder = new Task('79-3')
folder.add('ES6 스터디')
folder.add('영어회화 학원')
folder.add('태권도 학원')
folder.add('영어 문법 스터디')
folder.add('이펙티브자바 스터디')
folder.add('코드스피츠 스터디')

const {list: [{task: es6}, {task: english}]} = folder.byTitle()
es6.add('블로그에 정리')
english.add('번역 숙제')

const {list: [{task: subEnglish}]} = english.byTitle()
subEnglish.add('22일 영작')
subEnglish.add('23일 영작')

new DomRenderer('#wrapper', folder).render()
