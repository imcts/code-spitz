package theater1;

class Audience {
  private Invitation invitation = Invitation.EMPTY;
  private Ticket ticket = Ticket.EMPTY;
  private long amount;

  static Audience from(final long amount) {
    return new Audience(amount);
  }

  private Audience(final long amount) {
    this.amount = amount;
  }

  void setInvitation(final Invitation invitation) {
    if (invitation == Invitation.EMPTY) {
      return;
    }
    this.invitation = invitation;
  }

  void buyTicket(final TicketSeller ticketSeller, final Movie movie) {
    this.ticket = ticketSeller.getTicket(this, movie);
  }

  boolean hasAmount (final long amount) {
    return this.amount >= amount;
  }

  void minusAmount(final long amount) {
    if (this.amount < amount) {
      return;
    }
    this.amount -= amount;
  }

  void removeInvitation() {
    if (this.invitation.isNotEmpty()) {
      this.invitation = Invitation.EMPTY;
    }
  }

  Invitation getInvitation() {
    return this.invitation;
  }

  Ticket getTicket() {
    return ticket;
  }
}
