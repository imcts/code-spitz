package listen3.policy;

import listen3.Call;
import listen3.Money;

public interface Policy {
    Money calculate(Call calls, Money result);
}
