package theater;

import java.util.Arrays;
import java.util.stream.LongStream;

class Theater {
  private final TicketOffices ticketOffices;
  private final Movies movies;
  private final Fee fee;

  static Theater newInstance() {
    return new Theater();
  }

  private Theater() {
    this.ticketOffices = TicketOffices.newInstance();
    this.movies = Movies.newInstance();
    this.fee = Fee.newInstance();
  }

  void setMovie(Movie movie, long fee) {
    this.movies.appendMovie(movie);
    this.fee.addMovieFee(movie, fee);
  }

  void setTicketOffices(TicketOffice ...ticketOffices) {
    Arrays.asList(ticketOffices).forEach(this.ticketOffices::appendTicketOffice);
  }

  void setTicket(TicketOffice ticketOffice, Movie movie, long ticketAmount) {
    LongStream
      .range(0, ticketAmount)
      .forEach(i -> ticketOffices.setTicket(ticketOffice, Ticket.from(this, movie)));
  }

  void setInvitation(Audience audience) {
    if (audience == null) {
      return;
    }
    audience.setInvitation(Invitation.from(this));
  }

  long getFee(Movie movie) {
    return fee.getFee(movie);
  }

  boolean enter(Audience audience) {
    return audience.getTicket().isValid(this);
  }
}
