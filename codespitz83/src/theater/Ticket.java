package theater;

class Ticket {
  static final Ticket EMPTY = new Ticket(null, null);
  private final Theater theater;
  private final Movie movie;
  private boolean isEntered;

  static Ticket from(Theater theater, Movie movie) {
    return new Ticket(theater, movie);
  }

  private Ticket(Theater theater, Movie movie) {
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

  boolean isValid(Theater theater) {
    if (this.isEntered || theater != this.theater || this == EMPTY) {
      return false;
    }
    return isEntered = true;
  }

  boolean isExchangeAllowed(Invitation invitation) {
    return this.theater == invitation.getTheater();
  }

  boolean hasMovie(Movie movie) {
    return this.movie == movie;
  }

  long getFee () {
    return this.theater.getFee(this.movie);
  }
}
