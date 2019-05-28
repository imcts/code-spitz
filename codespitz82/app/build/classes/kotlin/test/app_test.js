if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'app_test'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'app_test'.");
}
if (typeof lib === 'undefined') {
  throw new Error("Error loading module 'app_test'. Its dependency 'lib' was not found. Please, check whether 'lib' is loaded prior to 'app_test'.");
}
if (typeof this['kotlin-test'] === 'undefined') {
  throw new Error("Error loading module 'app_test'. Its dependency 'kotlin-test' was not found. Please, check whether 'kotlin-test' is loaded prior to 'app_test'.");
}
var app_test = function (_, Kotlin, $module$lib, $module$kotlin_test) {
  'use strict';
  var test = $module$lib.test;
  var assertEquals = $module$kotlin_test.kotlin.test.assertEquals_3m0tl5$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var test_0 = $module$kotlin_test.kotlin.test.test;
  var suite = $module$kotlin_test.kotlin.test.suite;
  function SimpleTest() {
  }
  SimpleTest.prototype.testTest = function () {
    assertEquals('hello', test());
  };
  SimpleTest.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SimpleTest',
    interfaces: []
  };
  _.SimpleTest = SimpleTest;
  suite('', false, function () {
    suite('SimpleTest', false, function () {
      test_0('testTest', false, function () {
        return (new SimpleTest()).testTest();
      });
    });
  });
  Kotlin.defineModule('app_test', _);
  return _;
}(typeof app_test === 'undefined' ? {} : app_test, kotlin, lib, this['kotlin-test']);
