package theater2.base;

import theater2.Screening;
import theater2.vo.Money;

public interface DiscountCondition {
  boolean isSatisfiedBy(Screening screening, int audienceCount);
  Money calculateFee(Money fee);
}
