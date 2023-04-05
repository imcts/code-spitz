class A {
  public a () {};
  public b () {};
}

class B extends A {
  public a () {};
  public b () {};
}

class C extends A {
  public a () {};
  public b () {};
  public c () {}; // C의 케이스.
}

/**
 * TODO
 *  1. 다운 캐스팅 발생
 *  2. LSP 위반
 *  3. OCP 위반
 *  4. context error 생성
 */
class WrongExecutor {
  public run (a: A) {
    if (a instanceof C) {
      const c: C = a;
      c.c();
    }
  }
}

/**
 * TODO
 *  1. 다운 캐스팅을 업케스팅으로 변경
 *  2. OCP 안전
 *  3. LSP 안전
 */
abstract class BaseExecutor <T extends A> {
  public abstract run (v: T): void;
}

class CExecutor extends BaseExecutor<C> {
  public run (c: C): void {
    c.c();
  }
}







