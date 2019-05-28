if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'lib'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'lib'.");
}
var lib = function (_, Kotlin) {
  'use strict';
  function test() {
    return 'hello';
  }
  _.test = test;
  return _;
}(typeof lib === 'undefined' ? {} : lib, kotlin);

//# sourceMappingURL=lib.js.map
