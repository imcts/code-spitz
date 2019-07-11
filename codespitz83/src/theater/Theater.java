package theater;

import java.util.stream.LongStream;

class Theater {
  private TicketOffice ticketOffice;
  private final Movies movies;
  private final Fee fee;

  static Theater newInstance() {
    return new Theater();
  }

  private Theater() {
    this.ticketOffice = TicketOffice.EMPTY;
    this.movies = Movies.newInstance();
    this.fee = Fee.newInstance();
  }

  void setMovie(final Movie movie, final long fee) {
    this.movies.appendMovie(movie);
    this.fee.addMovieFee(movie, fee);
  }

  void setTicketOffice(final TicketOffice ticketOffice) {
    if (this.ticketOffice.isNotEmpty()) {
      return;
    }
    this.ticketOffice = ticketOffice;
  }

  void setTicket(final Movie movie, final long ticketAmount) {
    LongStream
      .range(0, ticketAmount)
      .forEach(i -> this.ticketOffice.appendTicket(Ticket.from(this, movie)));
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
}
