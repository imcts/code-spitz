package listen3;

import listen3.policy.Policy;

import java.util.Set;

/**
 * 1. Calc는 자신에게 전달 받은 calls를 순회하면서 전달받은 정책(Policy)에게 작업을 위임한다.
 */
public class Calc {
    private Policy policy;

    public Calc(Policy policy) {
        this.policy = policy;
    }

    Money calc(Set<Call> calls, Money result){
        Money sum = Money.ZERO;
        for(Call call: calls) {
            sum = this.policy.calculate(call, sum);
        }
        return result.plus(sum);
    }
}
