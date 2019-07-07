package theater;

class TicketSeller {
  private TicketOffice ticketOffice = TicketOffice.EMPTY;

  static TicketSeller newInstance() {
    return new TicketSeller();
  }

  private TicketSeller() {}

  void setTicketOffice(TicketOffice ticketOffice) {
    if (ticketOffice.isEmpty()) {
      return;
    }
    this.ticketOffice = ticketOffice;
  }

  Ticket getTicket(Audience audience, Movie movie) {
    if (audience.getInvitation().isEmpty()) {
      return this.getTicketWithFee(audience, movie);
    }
    return this.getTicketWithNoFee(audience, movie);
  }

  private Ticket getTicketWithFee(Audience audience, Movie movie) {
    Ticket ticket = Ticket.EMPTY;
    long price = ticketOffice.getTicketPrice(movie);
    if (audience.hasAmount(price)) {
      ticket = ticketOffice.getTicketWithFee(movie);
      if (ticket.isNotEmpty()) {
        audience.minusAmount(price);
      }
    }
    return ticket;
  }

  private Ticket getTicketWithNoFee(Audience audience, Movie movie) {
    Ticket ticket = ticketOffice.getTicketWithNoFee(movie);
    if (ticket.isNotEmpty() && ticket.isExchangeAllowed(audience.getInvitation())) {
      audience.removeInvitation();
    } else {
      ticketOffice.appendTicket(ticket);
      ticket = Ticket.EMPTY;
    }
    return ticket;
  }
}
