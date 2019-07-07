package theater;

public class Invitation {
  public static final Invitation EMPTY = new Invitation(null);
  private final Theater theater;

  static Invitation from(final Theater theater) {
    return new Invitation(theater);
  }

  private Invitation(final Theater theater) {
    this.theater = theater;
  }

  boolean isEmpty() {
    return this == EMPTY;
  }

  boolean isNotEmpty() {
    return !this.isEmpty();
  }

  Theater getTheater() {
    return this.theater;
  }
}
