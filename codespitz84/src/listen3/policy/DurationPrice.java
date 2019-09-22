package listen3.policy;

import listen3.Call;
import listen3.Money;
import listen3.calculator.Calculator;

/**
 * 1. Calculator를 구현한 구상객체를 전달받고 해당 객체에게 위임한다.
 * 2. DurationPriceRule은 주입 받도록 변경한다.
 */
public class DurationPrice implements Policy {
    Calculator calculator;

    public DurationPrice(Calculator calculator) {
        this.calculator = calculator;
    }

    @Override
    public Money calculate(Call call, Money result) {
        return this.calculator.calculate(call, result);
    }
}
