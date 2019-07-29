package theater2.discount;

import theater2.Screening;
import theater2.base.AmountDiscount;
import theater2.vo.Money;

import java.time.LocalDateTime;

public class PeriodAmountDiscount extends AmountDiscount {
  private final LocalDateTime startDate;
  private final LocalDateTime endDate;

  public PeriodAmountDiscount(Money amount, LocalDateTime startDate, LocalDateTime endDate) {
    super(amount);
    this.startDate = startDate;
    this.endDate = endDate;
  }

  @Override
  public boolean isSatisfiedBy(Screening screening, int audienceCount) {
    final LocalDateTime targetDate = screening.getWhenScreened();
    return targetDate.isAfter(this.startDate) && targetDate.isBefore(this.endDate);
  }
}
