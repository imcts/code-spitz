package theater2.discount;

import theater2.Screening;
import theater2.base.AmountDiscount;
import theater2.vo.Money;

public class SequenceAmountDiscount extends AmountDiscount {
  private final int sequence;

  public SequenceAmountDiscount(Money amount, int sequence) {
    super(amount);
    this.sequence = sequence;
  }

  @Override
  public boolean isSatisfiedBy(Screening screening, int audienceCount) {
    return screening.isSameSequence(sequence);
  }
}
