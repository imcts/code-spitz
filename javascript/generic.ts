class Animal {
  public speak() {
    return "I'm an animal.";
  }
}

class Dog extends Animal {
  public override speak() {
    return "Woof!";
  }

  public bark () {
    return 'bark';
  }
}

class Cat extends Animal {
  public override speak() {
    return "Meow!";
  }

  public meow() {
    return 'meow';
  }
}

/**
 * TODO
 *  1. 공변: A <- B 에 대하여 타입 안전을 보장한다.
 *  2. 반공변: A -> B 에 대하여 타입 안전을 보장한다.
 *  3. 불변: A = B 에 대하여 완전히 같은 타입인 경우에 타입 안전을 보장한다.
 */

/**
 * TODO
 *  - 인자로 전달되는 함수 타입은 반공변이다.
 */
// 타입 f는 Animal 인자로 갖는 람다 함수 v를 전달받는 함수이다.
const f = (v: (a: Animal) => void) => {
  // f 함수는 Animal 타입의 함수가 전달될 것이라고 판단한다.
  v(new Animal());
};

/**
 * TODO
 *  - Animal 타입의 함수를 전달하면 타입 안전을 보장한다.
 */
f((a: Animal) => {
  a.speak();
});

/**
 * TODO
 *  - 함수 f는 Animal 타입의 함수를 전달받는다.
 *  - Dog 타입의 함수를 전달하면 f 안에서 인자로 전달된 함수가 실행될 때, Animal 타입을 전달해야 하므로 타입 안정성이 깨진다.
 *  - 따라서, Dog 타입의 함수를 전달할 수 없다.
 */
f((d: Dog) => {
  d.bark();
});


/**
 * TODO
 *  - 함수 타입을 제외한 인자로 전달되는 타입은 공변이다.
 */
const f1 = (v: Animal) => {
  console.log(v.speak());
}

/**
 * TODO
 *  - 컴파일러는 함수 타입이 아닌 인자의 경우 공변성을 보장한다.
 */
f1(new Animal()); // Animal 타입 A <- Animal 타입 B
f1(new Dog());    // Animal 타입 A <- Dog 타입 B
f1(new Cat());    // Animal 타입 A <- Cat 타입 B


/**
 * TODO
 *  - 제네릭 extends 제약조건은 공변이다.
 */
const f2 = <T extends Animal>(v: T) => {
  console.log(v.speak());
}
f2(new Animal()); // Animal 타입 A <- Animal 타입 B
f2(new Dog());    // Animal 타입 A <- Dog 타입 B
f2(new Cat());    // Animal 타입 A <- Cat 타입 B

/**
 * TODO
 *  - 반환 타입은 공변이다.
 */
const f3 = <T extends Animal>(v: T) => {
  return v;
}
const return1: Animal = f3(new Animal()); // Animal 타입 A <- Animal 타입 B
const return2: Animal = f3(new Dog());    // Animal 타입 A <- Dog 타입 B
const return3: Animal = f3(new Cat());    // Animal 타입 A <- Cat 타입 B


/**
 * TODO
 *  - 제네릭 extends는 consume만 가능하다는 것은 제네릭 타입 안정성의 지침이다.
 *  - 타입 스크립트의 제네릭은 내부적으로 consume만 가능하도록 강제 하지 않는다.
 *  - 따라서 반환타입을 Array<Animal>로 설정하여 Animal 타입으로 처리하도록 한다.
 */
const f4 = <T extends Array<Animal>>(v: T): Array<Animal> => {
  v[0].speak();         // 최소 타입이 Animal이므로 Animal의 메소드를 사용할 수 있다.
  v.push(new Animal()); // 타입 스크립트는 추가를 허용한다.
  return v;             // 반환 타입은 Animal 타입으로 처리한다.
}
const arr: Array<Cat> = f4([]); // Array<Cat> 타입 A <- Array<Animal> 타입 B (공변)이라 오류.

/**
 * TODO
 *  - 자기 순환 참조 제네릭
 */
class A {
  public a (){}
}

/**
 * TODO
 *  - 타입 스크립트는 제네릭 타입이 없는 미완성 상태의 B 타입을 유효한 타입으로 처리한다.
 *  - 타입 별칭 F는 제네릭 타입이 없는 미완성 상태의 타입 B를 참조한다.
 *  - 실제 컴파일 시 기본값이나, 추론을 통해 제네릭 타입을 유추한다.
 */
type F = B;

/**
 * TODO
 *  - 제네릭 타입을 상속 받는 클래스가 명시적인 제네릭을 전달하지 않는 경우, 기본 값으로 F 타입을 사용한다.
 *  - F 타입은 제네릭 타입이 없는 미완성 상태의 B 타입이다.
 *  - 만약 class B가 추상 클래스가 아니라면, new B()의 경우 제네릭 타입 T는 실제 객체 인스턴스를 기반으로 추론되므로 B<B>타입이 된다.
 */
abstract class B<T extends B = F> extends A {
  private readonly b: Array<T> = [];

  public do () {
    this._do(this.b);
  }

  protected abstract _do (b: Array<T>): void;
}

/**
 * TODO
 *  - C 클래스는 B 클래스를 확장한다.
 *  - B 클래스는 제네릭 타입 T를 받는다.
 *  - C 클래스는 B 클래스를 확장하지만, 제네릭 타입 T를 명시하지 않았다.
 *  - 따라서, B 클래스의 제네릭 타입 T는 기본값으로 F 타입을 사용한다.
 *  - F 타입은 "제네릭 타입이 없는 미완성 상태의 B 클래스"를 참조한다.
 *  - 상속 관계에서 B 클래스의 제네릭 타입 T는 C 클래스로 대체된다.
 *  - 결과적으로, _do 메서드의 b 파라미터는 Array<C> 타입으로 설정된다.
 */
class C extends B {
  protected _do(b: Array<C>): void {
    console.log('do');
  }
}















