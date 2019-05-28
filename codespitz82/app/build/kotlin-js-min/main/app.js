if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'app'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'app'.");
}
var app = function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var throwCCE = Kotlin.throwCCE;
  var Unit = Kotlin.kotlin.Unit;
  var replace = Kotlin.kotlin.text.replace_680rmw$;
  var toDouble = Kotlin.kotlin.text.toDouble_pdl1vz$;
  var equals = Kotlin.equals;
  var split = Kotlin.kotlin.text.split_o64adg$;
  var isBlank = Kotlin.kotlin.text.isBlank_gw00vp$;
  var StringBuilder_init = Kotlin.kotlin.text.StringBuilder_init_za3lpa$;
  var ensureNotNull = Kotlin.ensureNotNull;
  var Regex_init = Kotlin.kotlin.text.Regex_init_61zpoe$;
  function app$lambda(it) {
    var tmp$, tmp$_0, tmp$_1;
    println('here!');
    if ((Kotlin.isType(tmp$ = it, KeyboardEvent) ? tmp$ : throwCCE()).keyCode !== 13)
      return;
    var input = Kotlin.isType(tmp$_0 = it.target, HTMLInputElement) ? tmp$_0 : throwCCE();
    var v = input.value;
    (tmp$_1 = document.querySelector('#result')) != null ? (tmp$_1.innerHTML = v + ' = ' + calc(v)) : null;
    input.value = '';
    return Unit;
  }
  function app() {
    var tmp$, tmp$_0;
    (tmp$ = document.querySelector('#base')) != null ? (tmp$.innerHTML = '<input id="input"/><div id="result"><\/div>') : null;
    (tmp$_0 = document.querySelector('#input')) != null ? (tmp$_0.addEventListener('keyup', app$lambda), Unit) : null;
  }
  var cleanUp;
  var mulDiv;
  var paren;
  function ex(v) {
    var $receiver = replace(cleanUp.replace_x2uqeu$(v, ''), '-', '+-');
    var regex = mulDiv;
    var replace_20wsma$result;
    replace_20wsma$break: do {
      var match = regex.find_905azu$($receiver);
      if (match == null) {
        replace_20wsma$result = $receiver.toString();
        break replace_20wsma$break;
      }
      var lastStart = 0;
      var length = $receiver.length;
      var sb = StringBuilder_init(length);
      do {
        var foundMatch = ensureNotNull(match);
        sb.append_ezbsdh$($receiver, lastStart, foundMatch.range.start);
        var tmp$ = sb.append_gw00v9$;
        var tmp$_0 = foundMatch.groupValues;
        var left = tmp$_0.get_za3lpa$(1);
        var op = tmp$_0.get_za3lpa$(2);
        var right = tmp$_0.get_za3lpa$(3);
        var l = toDouble(replace(left, '+', ''));
        var r = toDouble(replace(right, '+', ''));
        tmp$.call(sb, replace((equals(op, '*') ? l * r : l / r).toString(), '-', '+-'));
        lastStart = foundMatch.range.endInclusive + 1 | 0;
        match = foundMatch.next();
      }
       while (lastStart < length && match != null);
      if (lastStart < length) {
        sb.append_ezbsdh$($receiver, lastStart, length);
      }
      replace_20wsma$result = sb.toString();
    }
     while (false);
    var tmp$_1;
    var accumulator = 0.0;
    tmp$_1 = split(replace_20wsma$result, Kotlin.charArrayOf(43)).iterator();
    while (tmp$_1.hasNext()) {
      var element = tmp$_1.next();
      accumulator = accumulator + (isBlank(element) ? 0.0 : toDouble(element));
    }
    return accumulator;
  }
  function calc(v) {
    var r = v;
    while (paren.containsMatchIn_6bul2c$(r)) {
      var $receiver = r;
      var regex = paren;
      var replace_20wsma$result;
      replace_20wsma$break: do {
        var match = regex.find_905azu$($receiver);
        if (match == null) {
          replace_20wsma$result = $receiver.toString();
          break replace_20wsma$break;
        }
        var lastStart = 0;
        var length = $receiver.length;
        var sb = StringBuilder_init(length);
        do {
          var foundMatch = ensureNotNull(match);
          sb.append_ezbsdh$($receiver, lastStart, foundMatch.range.start);
          sb.append_gw00v9$(ex(foundMatch.groupValues.get_za3lpa$(1)).toString());
          lastStart = foundMatch.range.endInclusive + 1 | 0;
          match = foundMatch.next();
        }
         while (lastStart < length && match != null);
        if (lastStart < length) {
          sb.append_ezbsdh$($receiver, lastStart, length);
        }
        replace_20wsma$result = sb.toString();
      }
       while (false);
      r = replace_20wsma$result;
    }
    return ex(r);
  }
  function main() {
    app();
  }
  _.app = app;
  _.ex_61zpoe$ = ex;
  _.calc_61zpoe$ = calc;
  _.main = main;
  cleanUp = Regex_init('[^.\\d-+*\\/]');
  mulDiv = Regex_init('((?:\\+-)?[.\\d]+)([*\\/])((?:\\+-)?[.\\d]+)');
  paren = Regex_init('\\(([^()]*)\\)');
  main();
  return _;
}(typeof app === 'undefined' ? {} : app, kotlin);

//# sourceMappingURL=app.js.map
