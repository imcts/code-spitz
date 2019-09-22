import listen3.*;
import listen3.calculator.DurationPriceRule;
import listen3.policy.DurationPrice;

import java.time.Duration;

/**
 *  - DurationPrice만 리팩토링 한다. 제외한 다른 클래스는 다 제거한다.
 *
 */
public class Main {
    public static void main(String[] args) throws Exception {
        Plan plan = new Plan();

        plan.setCalculator(
            new Calculator() // 여러 요금 계산기들을 순회하며 계산한다.
                .setNext(new Calc(
                    new DurationPrice(
                        new DurationPriceRule(Money.ZERO, Duration.ZERO)
                            .addRule(Money.ZERO, Duration.ZERO)
                    )
                )
            )
        );
        plan.addCall(new Call()); // Call 추가
        plan.calculateFee(); // 추가된 Call들에 대한 계산.
    }
}
