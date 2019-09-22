package listen3.calculator;

import listen3.Call;
import listen3.Money;

import java.util.Set;

public interface Calculator {
    Money calculate(Call calls, Money result);
}
