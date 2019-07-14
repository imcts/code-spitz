package theater2.discount;

import theater2.Screening;
import theater2.base.AmountDiscount;
import theater2.vo.Money;

public class CountAmountDiscount extends AmountDiscount {
  private final int count;

  public CountAmountDiscount(Money amount, int count) {
    super(amount);
    this.count = count;
  }

  @Override
  public boolean isSatisfiedBy(Screening screening, int audienceCount) {
    return this.count > audienceCount;
  }
}
