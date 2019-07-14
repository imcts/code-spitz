package theater1;

class Ticket {
  static final Ticket EMPTY = new Ticket(null, null);
  private final Theater theater;
  private final Movie movie;
  private boolean isEntered;

  static Ticket from(final Theater theater, final Movie movie) {
    return new Ticket(theater, movie);
  }

  private Ticket(final Theater theater, final Movie movie) {
    this.theater = theater;
    this.movie = movie;
    this.isEntered = false;
  }

  boolean isEmpty() {
    return this == Ticket.EMPTY;
  }

  boolean isNotEmpty() {
    return !this.isEmpty();
  }

  boolean isValid(final Theater theater) {
    if (this.isEntered || theater != this.theater || this == EMPTY) {
      return false;
    }
    return isEntered = true;
  }

  boolean hasMovie(final Movie movie) {
    return this.movie == movie;
  }

  long getFee () {
    return this.theater.getFee(this.movie);
  }

  Theater getTheater () {
    return this.theater;
  }
}
