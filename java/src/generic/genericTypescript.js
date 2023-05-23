// https://ko.wikipedia.org/wiki/%EB%A6%AC%EC%8A%A4%EC%BD%94%ED%94%84_%EC%B9%98%ED%99%98_%EC%9B%90%EC%B9%99
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 1. 원래 element는 string만 있었다.
 * 2. 근데 element에 number도 받게 되었다.
 * 3. class NumberLinkedList, class StringLinkedList...
 * 4. Person내부에 element를 Object로 다 받도록 만든다.
 * 5. 그랬더니 사용하는 쪽에서 모든 타입비교를 하는 코드가 파생되기 시작했다.
 * 6. 그러면, 정의 시점에 타입을 정하지 말고, 사용하는 코드를 작성하는 시점에 타입을 정하게 하자.
 */
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this._list = []; // 사용 시점에 타입을 지정할 수 있도록 변환한다.
    }
    LinkedList.prototype.push = function (v) {
        this._list.push(v);
    };
    return LinkedList;
}());
var ChildLinkedList = /** @class */ (function (_super) {
    __extends(ChildLinkedList, _super);
    function ChildLinkedList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildLinkedList.prototype.getName = function () {
        return 'ChildLinkedList';
    };
    return ChildLinkedList;
}(LinkedList));
/**
 * 부모와 자식의 관계가 아니라, 객체 A와 객체 B의 관계를 나타내고 정의하는 것이다.
 * 객체A, 객체B
 * A -> B를 대체할 수 없다면 무변형성이라고 한다.
 * A -> B를 대체할 수 있다면 공변형성이 성립한다고 한다.
 * B -> A를 대체할 수 있다면 반공변형성이 성립한다고 한다.
 */
/**
 * 기본적으로 모든 제네릭 타입은 무변이다.
 *  - 다른 제네릭 타입에는 할당할 수 없다.
 * 제네릭 타입이 공변형인지 평가하는 기준
 *  1. 타입의 공변형성을 판단한다.
 *  2. 제네릭 타입을 비교한다.
 */
var list1 = new LinkedList(); // 무변
/**
 * // 타입의 공변형성은 LSP를 기준으로 판단한다.
 *
 * LSP
 *  1. 모든 하위 타입은 상위 타입으로 안전하게 대체될 수 있어야 한다.
 */
var list = new ChildLinkedList(); // 공변
/**
 * Extends와 Super
 *  1. extends와 super는 왜 만들어졌나?
 *    - 제네릭 변수 T에 접근해서 값을 사용했기 때문이다.
 *  2. extends 없이 제네릭 변수 T에 접근해서 값을 사용하면 무슨 일이 벌어지나?
 *    - T가 어떤 타입인지 검증하는 코드가 들어가게 된다.
 *    - LSP를 위반하게 된다.
 *  3. 다운캐스팅을 하면 어떤 문제가 발생하나?
 *    - 다운 캐스팅 코드는 런타임에 확인할 수 있다. 컴파일타임에 타입에 대한 검증을 받을 수가 없다.
 *    - 구상 객체들이 추가되거나, 변경될때마다 Apple이 영향을 받는다.
 *    - 다운 캐스팅을 하는 코드가 Apple과 협력하는 객체들로 퍼져나간다.
 *    - 다운 캐스팅을 시도하는 경우 ClassCastingException이 발생할 수도 있다.
 *      - 심지어 이 시점은 Runtime인 경우이다.
 *    - 조건문을 추가하지 않는 경우가 발생할 수 있고, 동시에 모든 조건문이 수정된다는 것을 보장받기 어렵다.
 *    - 결론적으로 코드를 유지보수하기 어려워지고, 오류가 발생하기 쉬워진다.
 *  4. 다운 캐스팅을 하지 않고 LSP를 지켜서 업캐스팅을 하게 만드는 방법 무엇인가?
 *    - T에 모든 타입을 허용했고, T에 접근해서 값을 사용했기 때문에 다운 캐스팅이 발생한다.
 *    - T extends Fruit로 지정하게 되면, "문법적"으로 업캐스팅이 달성된다.
 *    - 문법적으로 선언했기 때문에, 컴파일러가 타입을 추론하고 검증할 수 있다.
 *    - LSP를 달성한다.
 */
var Fruit = /** @class */ (function () {
    function Fruit() {
    }
    return Fruit;
}());
var Apple = /** @class */ (function () {
    function Apple(element) {
        this._element = element;
    }
    Apple.prototype.doSomething = function () {
        // 다운 캐스팅을 진행함으로써 Apple이 Number에 의존성을 갖게 된다.
        if (this.element instanceof Number) {
            // this.element에 접근해서 특정 권한이나 책임을 사용하려 한다.
            console.log(this.element.toFixed(2));
        }
    };
    Object.defineProperty(Apple.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: false,
        configurable: true
    });
    return Apple;
}());
/**
 * 제네릭 프로그래밍에서 메서드의 인수는 LSP를 준수한다.
 * LSP는 새로운 객체 지향 프로그래밍 언어에 채용된 시그니처에 관한 몇 가지 표준적인 요구사항을 강제한다.
 *  - 하위형에서 메서드 인수의 반공변성
 *  - 하위형에서 반환형의 공변성
 *  - 하위형에서 메서드는 상위형 메서드에서 던져진 예외의 하위형을 제외하고 새로운 예외를 던지면 안된다.
 */
var Base = /** @class */ (function () {
    function Base() {
        this.base = 1;
    }
    return Base;
}());
var Parent = /** @class */ (function (_super) {
    __extends(Parent, _super);
    function Parent() {
        var _this = _super.call(this) || this;
        _this.parent = 2;
        return _this;
    }
    return Parent;
}(Base));
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        var _this = _super.call(this) || this;
        _this.child = 3;
        return _this;
    }
    return Child;
}(Parent));
/**
 * "x에 대해 항상 종료할 수 있는 메서드"라는 속성을 q라고 할 때,
 * 임의의 프로그램(예: 컴파일러)이 속성 q가 자료형 T에 대해 참임을 유지한다 하더라도
 * 자료형 T의 어떤 하위형 S에 대해 참을 유지한다는 것을 증명하기란 불가능하다.
 *  - T 는 아래 함수 f의 인자인 v의 타입 Parent이다.
 *  - 속성 q는 T가 가지고 있는 메서드이다.
 *
 * 함수 f의 인자로 공변인 하위타입을 허용하면 발생하는 문제.
 *  1. v:Parent에 하위타입에서 추가한 메서드를 실행할 수 없다?
 *    - f함수는 Parent타입을 받기 때문에 하위타입에 추가되는 메서드를 알 수도 없고, 알 필요도 없다. 문제가 되지 않는다.
 *  2. 하위 타입을 허용하면, 부모의 메서드나 속성을 변환할 수 있게 된다.
 *    - 하위타입에서 부모의 속성 q를 내적동질성을 사용하여 오버라이드할 수 있다.
 *
 *  // 인자의 타입은 반공변성을 유지해야, 컴파일타임에 오버라이드에 의한 안정성을 보장 받는다.
 *  // LSP의 업캐스팅 안정성이다.
 */
// 인자의 반공변성
var contraF;
contraF = function (parent) { return console.log(parent.parent); }; // 컴파일러는 메서드 오버라이드의 위험이 발생하지 않으므로 허용한다.
contraF = function (child) { return console.log(child.child); }; // 컴파일러는 하위타입에서 메소드가 변조될 수 있으므로 허용 하지 않는다. LSP 위반.
contraF = function (base) { return console.log(base); }; // 컴파일러는 Base의 메서드를 Parent가 변조했더라도 함수 f의 타입의 인자가 Parent이므로 허용한다.
// 반환타입의 공변성
var coF;
coF = function () { return new Child(); };
coF = function () { return new Parent(); };
coF = function () { return new Base(); };
/**
 * Extends Produce Super Consumer
 */
var extendsF;
extendsF = function (list) {
    /**
     * let list: Array<Base>;
     * let list: Array<Parent>;
     * let list: Array<Chile>;
     * ...
     *
     * 컴파일러는 리스트에 들어있는 타입을 명확하게 결정할 수 없다.
     */
    list.push(new Base());
    list.push(new Parent());
    list.push(new Child());
    // produce from the list by only the type of Base;
    list.forEach(console.log);
    var value = list[0]; // 컴파일러는 리스트에 최소 안정 타입이 Base타입인 것을 확정할 수 있다.
};
// 많은 타입들중에 적어도 Parent의 부모타입을 제네릭으로 가진 리스트가 전달될 수 있다 라는 의미이다.
/**
 * 1. Array<Parent>가 인수로 전달된 경우.
 *  - new Parent(), new Child()인스턴스를 추가할 수 있는 리스트이다.
 * 2. Array<Base>가 인수로 전달된 경우.
 *  - new Base(), new Parent(), new Child()인스턴스를 추가할 수 있는 리스트이다.
 * 3. Array<Object>가 인수로 전달된 경우.
 *  - new Base(), new Parent(), new Child()인스턴스를 추가할 수 있는 리스트이다.
 * 4. 이 경우 컴파일러는 위의 모든 경우에 대해서, 리스트에 추가할 수 있는 인스턴스의 타입을 확정할 수 있다.
 *  - new Parent(), new Child()를 포함한 Parent의 모든 확장된 자손 타입이다.
 */
var superF, Parent;
 > (list);
Array;
void ;
superF = function (list) {
    // Parent일 수도 있고, Base일수도 있고 Object일 수도 있다.
    // 컴파일러는 타입의 안정성을 보장할 수 없기 때문에, 허용하지 않는다.
    var v = list[0]; // 불가능
    var v = list[0]; // 불가능
    // 모든 객체의 최상위 타입은 오브젝트이기 때문에 컴파일러는 Object타입으로의 변환은 허용할 수 있다.
    var v = list[0]; // 가능
    // Super Consume
    list.push(new Parent());
    list.push(new Child());
    /**
     * 불가능하다.
     * - list가 Array<Parent>, Array<Child>일 수 있다.
     */
    list.push(new Base()); // 불가능하다.
};
/**
 * Extends Produce by Class.
 */
var extendsProduce = /** @class */ (function () {
    function extendsProduce() {
    }
    extendsProduce.prototype.push = function (list) {
        list.push(new Base());
        list.push(new Parent());
        list.push(new Child());
        list.forEach(console.log);
    };
    return extendsProduce;
}());
/**
 * Super Consume by Class.
 */
var superConsume = /** @class */ (function () {
    function superConsume() {
    }
    return superConsume;
}());
_super.Parent > {
    push: function (list) {
        // T가 Parent, Base, Object일 수 있기 때문에 타입을 확정지을 수 없다.
        list.forEach(console.log);
        // Object는 자바스크립트에서 최상위 오브젝트이기때문에 허용한다.
        var o = list[0]; // 허용.
        /**
         * 어떤 타입의 list<? super Parent>가 오더라도, Parent를 포함한 자식은 추가될 수 있다.
         */
        // Super Consume
        list.push(new Parent());
        list.push(new Child());
    }
};
