/**
 * interface Decorator {
 *  task () {
 *    // do common logic
 *    this._task()
 *  }
 *
 *  _task ()
 * }
 *
 * class TaskView extends Decorator{}
 * class TaskMemberView extends Decorator {}
 * class TaskPriorityView extends Decorator {}
 *
 * let result = new TaskView(); // default value.
 * result = new TaskMemberView(result); // decorated value
 * result = new TaskPriorityView(result); // decorated value
 *
 * A -> B -> C...
 * 1. 데코레이터는 순차적으로 A -> B -> C를 실행시키고 나온 결과값을 사용하고자 함이다.
 * 2. 이렇게 되면 매번 A와 B와 C가 생성되자마자 전달되어야 하기 때문에 런타임에 밀어넣긴 힘들다.
 *  - 이 코드를 어디에 위치시킬 것인가. Visitor에?
 *  - Visitor가 데코레이터들의 생성 책임을 다 지게 된다.
 *  - 데코레이터를 추가할때마다 Visitor를 고치는게 말이 되는가.
 *  - 생성자에서 하던일을 Decorator의 setter에서 하면 생성은 app에서 하지만 실행은 비지터가 해줄 수 있다.
 * 3. Visitor에는 this._taskDecorator가 있고, 실행하면 된다.
 *  - this._taskDecorator는 주입된 맨 마지막 데코레이터이다.
 *  - 실행시 C -> B -> A로 재귀적으로 실행하여 A의 결과값을 B한테, B의 결과값을 C한테 주면 된다.
 *  - 실행단에서는 아무것도 알 필요 없이 설정된 데코레이터의 C.run()을 함으로써 언제든 재귀적으로 실행할 수 있다.
 * 4. 실행 순서
 *  - 초기에는 C가 선택되어있으므로 C의 task를 실행한다.
 *  - 그다음 공통 task메소드에서 주입받은 데코레이터가 있다면 먼저 그것을 실행한다.
 *  - 반복해서 실행하다보면 A -> B -> C순서대로 recursion하게 실행된다.
 *  - 즉, 설정을 한번 하고 재귀적으로 실행하는것이 핵심이다.
 */
const Decorator = class extends Observer {
  constructor () {
    super()
    this._decorator = null
  }

  set (decorator) {
    this._decorator = decorator
    return this
  }

  task (wrapper, task) {
    if (this._decorator) {
      this._decorator.task(wrapper, task)
    }
    this._task(wrapper, task)
  }

  _task () {
    throw new Error('This method must be overridden.')
  }
}
