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
var Login = /** @class */ (function () {
    function Login() {
    }
    Login.prototype.login = function () {
        // do 1.
        // do 2.
        this._login();
        // move home.
    };
    return Login;
}());
var Naver = /** @class */ (function (_super) {
    __extends(Naver, _super);
    function Naver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Naver.prototype._login = function () {
    };
    return Naver;
}(Login));
var Kakao = /** @class */ (function (_super) {
    __extends(Kakao, _super);
    function Kakao() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Kakao.prototype._login = function () {
    };
    return Kakao;
}(Login));
// Cohesion
// Coincidental Cohesion.
// Logical Cohesion.
// Temporal Cohesion.
// Procedural Cohesion.
// Communicational Cohesion.
// Sequential Cohesion.
// Functional Cohesion. 좋은거.
// Write a function that takes an array of strings and returns the length of each string in an array.
