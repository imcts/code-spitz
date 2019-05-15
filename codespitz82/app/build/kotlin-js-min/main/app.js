if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'app'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'app'.");
}
if (typeof lib === 'undefined') {
  throw new Error("Error loading module 'app'. Its dependency 'lib' was not found. Please, check whether 'lib' is loaded prior to 'app'.");
}
var app = function (_, Kotlin, $module$lib) {
  'use strict';
  var hello = $module$lib.hello;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  function main() {
    hello();
    println('this is kotlin!');
  }
  _.main = main;
  main();
  return _;
}(typeof app === 'undefined' ? {} : app, kotlin, lib);

//# sourceMappingURL=app.js.map
