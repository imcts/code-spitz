package theater;

class TicketOffice {
  static TicketOffice EMPTY = TicketOffice.newInstance();
  private static long DEFAULT_AMOUNT = 0L;
  private final Tickets tickets;
  private long amount;

  static TicketOffice newInstance () {
    return TicketOffice.from(DEFAULT_AMOUNT);
  }

  static TicketOffice from (long amount) {
    return new TicketOffice(amount);
  }

  private TicketOffice(long amount) {
    tickets = Tickets.newInstance();
    this.amount = amount;
  }

  void appendTicket(Ticket ticket) {
    this.tickets.appendTicket(ticket);
  }

  boolean isEmpty() {
    return this == EMPTY;
  }

  long getTicketPrice(Movie movie) {
    return this.tickets.getTicketPrice(movie);
  }

  Ticket getTicketWithFee(Movie movie) {
    Ticket ticket = tickets.getTicket(movie);
    if (ticket.isNotEmpty()) {
      this.amount += ticket.getFee();
    }
    return ticket;
  }

  Ticket getTicketWithNoFee(Movie movie) {
    return tickets.getTicket(movie);
  }
}
