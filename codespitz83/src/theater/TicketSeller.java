package theater;

class TicketSeller {
  private TicketOffice ticketOffice = TicketOffice.EMPTY;

  static TicketSeller newInstance() {
    return new TicketSeller();
  }

  private TicketSeller() {}

  void setTicketOffice(final TicketOffice ticketOffice) {
    if (ticketOffice.isEmpty()) {
      return;
    }
    this.ticketOffice = ticketOffice;
  }

  Ticket getTicket(final Audience audience, final Movie movie) {
    if (audience.getInvitation().isEmpty()) {
      return this.getTicketWithFee(audience, movie);
    }
    return this.getTicketWithNoFee(audience, movie);
  }

  private Ticket getTicketWithFee(final Audience audience, final Movie movie) {
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

  private Ticket getTicketWithNoFee(final Audience audience, final Movie movie) {
    Ticket ticket = ticketOffice.getTicketWithNoFee(movie);
    Invitation invitation = audience.getInvitation();
    if (ticket.isNotEmpty() && this.isSameTheater(ticket, invitation)) {
      audience.removeInvitation();
    } else {
      ticketOffice.appendTicket(ticket);
      ticket = Ticket.EMPTY;
    }
    return ticket;
  }

  private boolean isSameTheater (Ticket ticket, Invitation invitation) {
    return ticket.getTheater() == invitation.getTheater();
  }
}
