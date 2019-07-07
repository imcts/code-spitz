package theater;

import java.util.ArrayList;

class Tickets {
  private final ArrayList<Ticket> tickets;

  static Tickets newInstance() {
    return new Tickets();
  }

  private Tickets() {
    this.tickets = new ArrayList();
  }

  void appendTicket(Ticket ticket) {
    if (this.tickets.contains(ticket)) {
      return;
    }
    this.tickets.add(ticket);
  }

  long getTicketPrice(Movie movie) {
    long price = 0;
    Ticket ticket = this.findTicket(movie);
    if (ticket.isNotEmpty()) {
      price = ticket.getFee();
    }
    return price;
  }

  Ticket getTicket(Movie movie) {
    if (this.tickets.isEmpty()) {
      return Ticket.EMPTY;
    }
    Ticket ticket = this.findTicket(movie);
    if (ticket.isNotEmpty()) {
      this.tickets.remove(ticket);
    }
    return ticket;
  }

  private Ticket findTicket(Movie movie) {
    return this.tickets.stream()
      .filter(t -> t.hasMovie(movie))
      .findFirst()
      .orElse(Ticket.EMPTY);
  }
}
