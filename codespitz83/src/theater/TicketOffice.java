package theater;

class TicketOffice {
  static TicketOffice EMPTY = TicketOffice.newInstance();
  private static long DEFAULT_AMOUNT = 0L;
  private Theater theater = Theater.EMPTY;
  private final Tickets tickets;
  private long amount;

  static TicketOffice newInstance () {
    return TicketOffice.from(DEFAULT_AMOUNT);
  }

  static TicketOffice from (final long amount) {
    return new TicketOffice(amount);
  }

  private TicketOffice(final long amount) {
    tickets = Tickets.newInstance();
    this.amount = amount;
  }

  void appendTicket(final Ticket ticket) {
    this.tickets.appendTicket(ticket);
  }

  boolean isEmpty() {
    return this == EMPTY;
  }

  boolean hasTheater() {
    return this.theater.isNotEmpty();
  }

  long getTicketPrice(final Movie movie) {
    return this.tickets.getTicketPrice(movie);
  }

  Ticket getTicketWithFee(final Movie movie) {
    Ticket ticket = tickets.getTicket(movie);
    if (ticket.isNotEmpty()) {
      this.amount += ticket.getFee();
    }
    return ticket;
  }

  Ticket getTicketWithNoFee(final Movie movie) {
    return tickets.getTicket(movie);
  }

  void setTheater(Theater theater) {
    this.theater = theater;
  }
}