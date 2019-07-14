package theater2.base;

import theater2.vo.Money;

public abstract class AmountDiscount implements DiscountPolicy.AMOUNT, DiscountCondition {
  private final Money amount;

  public AmountDiscount(Money amount) {
    this.amount = amount;
  }

  @Override
  public final Money calculateFee(Money fee) {
    return fee.minus(amount);
  }
}

