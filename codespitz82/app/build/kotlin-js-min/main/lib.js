if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'lib'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'lib'.");
}
var lib = function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  function hello() {
    println('hello world!');
  }
  _.hello = hello;
  return _;
}(typeof lib === 'undefined' ? {} : lib, kotlin);

//# sourceMappingURL=lib.js.map
