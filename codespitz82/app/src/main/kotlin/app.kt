import org.w3c.dom.HTMLInputElement
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.document

// 계산기
fun app() {
    document.querySelector("#base")?.innerHTML = """<input id="input/><div id="result"></div>"""
    /**
     * 1. 코틀린에서는 람다에서 return 구문을 사용하면 감싸고 있는 함수인 app을 빠져나가게 된다.
     * 2. 우리가 원하는 목적은 어휘 구문 안의 람다를 빠져나가고 싶은 것인데 이것을 이룰 수가 없다.
     * 3. 게다가 인자로 전달된 람다는 return 구문을 사용할 수 없다.
     * 4. 따라서 해당 람다를 인자로 전달받은 함수명을 입력하면 해당 위치로 빠져나가게 된다.
     */
    document.querySelector("#input")?.addEventListener("keyup", {
        if ((it as KeyboardEvent).keyCode != 13) return@addEventListener
        val input = it.target as HTMLInputElement
        val v = input.value
        document.querySelector("#result")?.innerHTML = "$v = ${calc(v)}"
        input.value = ""
    })
}

/**
 * 불필요한 문자열을 제거한다.
 */
val cleanUp = """[^.\d-+*\/]""".toRegex()

/**
 * 곱하기와 나누기만 먼저 분류한다.
 */
val mulDiv = """((?:\+-)?[.\d]+)([*\/])((?:\+-)?[.\d]+)""".toRegex()

/**
 * 괄호 안에 괄호가 없는 것들을 찾는다.
 */
val paren = """\(([^()]*)\)""".toRegex()

/**
 * 0. '1 + 3 / 5 - 2' 등의 수식을 문자열로 전달받는다.
 * 1. 전달받은 연산식의 불필요한 문자들을 제거한다.
 * 2. - 를 +- 로 변경한다.
 * 3. 나눗셈이나 곱셈을 먼저 계산한다. // 여기에서는 연속된건 고려되지 않았다. 2 / 2 / 2 이런식의 것들.
 * 4. 찾은 곱셈이나 나눗셈을 연산한다.
 * 5. 최종 문자열을 +를 기준으로 더하고 계산하여 반환한다.
 */
fun ex(v:String) = v.replace(cleanUp, "").replace("-", "+-").replace(mulDiv) {
    val (_, left, op, right) = it.groupValues
    val l = left.replace("+", "").toDouble()
    val r = right.replace("+", "").toDouble()
    "${if (op == "*") l * r else l / r}".replace("-", "+-")
}.split('+').fold(0.0) { acc, v -> acc + if (v.isBlank()) 0.0 else v.toDouble() }

/**
 * 0. -2 * ((-3 + 0.4) / -0.2)
 * 1. 계산 수식을 전달받는다.
 * 2. 괄호안에 더이상 괄호가 없는 연산식을 우선 찾는다.
 * 3. 계산하여 해당 값을 찾은 괄호로 replace한다.
 * 4. 괄호가 없을때까지 반복한다.
 * 5. 최종 연산을 실행한다.
 */
fun calc(v:String):Double {
    var r = v
    while (paren.containsMatchIn(r)) r = r.replace(paren){"${ex(it.groupValues[1])}"}
    return ex(r)
}

class A constructor(a:String) {
    private val a:String
    init {
        this.a = a
    }
}
