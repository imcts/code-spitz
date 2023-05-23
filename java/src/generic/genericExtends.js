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
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.a = function () { };
    ;
    A.prototype.b = function () { };
    ;
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.a = function () { };
    ;
    B.prototype.b = function () { };
    ;
    return B;
}(A));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C.prototype.a = function () { };
    ;
    C.prototype.b = function () { };
    ;
    C.prototype.c = function () { };
    ; // C의 케이스.
    return C;
}(A));
/**
 * TODO
 *  1. 다운 캐스팅 발생
 *  2. LSP 위반
 *  3. OCP 위반
 *  4. context error 생성
 */
var WrongExecutor = /** @class */ (function () {
    function WrongExecutor() {
    }
    WrongExecutor.prototype.run = function (a) {
        if (a instanceof C) {
            var c = a;
            c.c();
        }
    };
    return WrongExecutor;
}());
/**
 * TODO
 *  1. 다운 캐스팅을 업케스팅으로 변경
 *  2. OCP 안전
 *  3. LSP 안전
 */
var BaseExecutor = /** @class */ (function () {
    function BaseExecutor() {
    }
    return BaseExecutor;
}());
var CExecutor = /** @class */ (function (_super) {
    __extends(CExecutor, _super);
    function CExecutor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CExecutor.prototype.run = function (c) {
        c.c();
    };
    return CExecutor;
}(BaseExecutor));
