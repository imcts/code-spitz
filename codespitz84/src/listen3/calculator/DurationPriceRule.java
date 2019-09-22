package listen3.calculator;

import listen3.Call;
import listen3.Money;

import java.time.Duration;

/**
 * 1. 생성자를 prev가 없는 경우와 prev가 있는 경우로 분리한다.
 * 2. 특이점 객체(시작객체)가 생성될때는 prev가 null이다.
 * 3. addRule로 생성되어지는 객체는 prev(this)를 전달받는다.
 * 4. addRule에서 생성되어 반환되는 객체는 항상 마지막 DurationPriceRule이다.
 *  - firstRule - secondRule - ...
 */
public class DurationPriceRule implements Calculator {
    private final Money price;
    private final Duration to;
    private DurationPriceRule prev;

    public DurationPriceRule(Money price, Duration to) {
        this.price = price;
        this.to = to;
        this.prev = null;
    }

    public DurationPriceRule(Money price, Duration to, DurationPriceRule prev) {
        this(price, to);
        this.prev = prev;
    }

    public DurationPriceRule addRule(Money price, Duration to) throws Exception {
        if (price.isLessThan(Money.ZERO)) throw new Exception();
        return new DurationPriceRule(price, to, this);
    }

    /**
     * 1. prev가 null인 경우 전달된 result를 그대로 반환한다.
     * 2. 아닌경우 prev가 가지고 있는 calculate를 다시 실행하면서 전달받은 call과 현재까지 계산된 값을 전달한다.
     */
    @Override
    public Money calculate(Call call, Money result) {
        Duration duration = call.getDuration();
        if (prev == null) return result;
        if (duration.compareTo(prev.to) <= 0) return Money.ZERO;
        return prev.calculate(call, price.times((duration.compareTo(to) > 0 ? to : duration).minus(prev.to).getSeconds()));
    }
}
