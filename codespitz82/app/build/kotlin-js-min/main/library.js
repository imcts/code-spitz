if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'library'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'library'.");
}
var library = function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  function hello() {
    println('hello world!');
  }
  _.hello = hello;
  return _;
}(typeof library === 'undefined' ? {} : library, kotlin);

//# sourceMappingURL=library.js.map
