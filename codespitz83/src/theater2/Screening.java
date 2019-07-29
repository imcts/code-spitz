package theater2;

import java.time.LocalDateTime;

public class Screening {
  private final int sequence;
  private final LocalDateTime whenScreened;

  public Screening(int sequence, LocalDateTime when) {
    this.sequence = sequence;
    this.whenScreened = when;
  }

  public Boolean isSameSequence (int sequence) {
    return this.sequence == sequence;
  }
  
  public LocalDateTime getWhenScreened() {
    return whenScreened;
  }
}
