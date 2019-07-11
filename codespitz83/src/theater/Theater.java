package theater;

import java.util.stream.LongStream;

class Theater {
  private final TicketOffices ticketOffices;
  private final Movies movies;
  private final Fee fee;

  static Theater EMPTY = Theater.newInstance();

  static Theater newInstance() {
    return new Theater();
  }

  private Theater() {
    this.ticketOffices = TicketOffices.newInstance();
    this.movies = Movies.newInstance();
    this.fee = Fee.newInstance();
  }

  void setMovie(final Movie movie, final long fee) {
    this.movies.appendMovie(movie);
    this.fee.addMovieFee(movie, fee);
  }

  void setTicketOffices(final TicketOffice ticketOffice) {
    if (ticketOffice.hasTheater()) {
      return;
    }
    this.ticketOffices.appendTicketOffice(ticketOffice);
  }

  void setTicket(final TicketOffice ticketOffice, final Movie movie, final long ticketAmount) {
    LongStream
      .range(0, ticketAmount)
      .forEach(i -> ticketOffices.setTicket(ticketOffice, Ticket.from(this, movie)));
  }

  void setInvitation(final Audience audience) {
    if (audience == null) {
      return;
    }
    audience.setInvitation(Invitation.from(this));
  }

  long getFee(final Movie movie) {
    return fee.getFee(movie);
  }

  boolean enter(final Audience audience) {
    return audience.getTicket().isValid(this);
  }

  boolean isEmpty() {
    return this == EMPTY;
  }

  boolean isNotEmpty() {
    return !this.isEmpty();
  }
}
