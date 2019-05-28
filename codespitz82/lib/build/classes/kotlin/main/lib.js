if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'lib'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'lib'.");
}
var lib = function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  function hello() {
    println('hello world!');
  }
  function test() {
    return 'hello';
  }
  _.hello = hello;
  _.test = test;
  Kotlin.defineModule('lib', _);
  return _;
}(typeof lib === 'undefined' ? {} : lib, kotlin);
