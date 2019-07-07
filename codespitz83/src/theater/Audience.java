package theater;

class Audience {
  private Invitation invitation = Invitation.EMPTY;
  private Ticket ticket = Ticket.EMPTY;
  private long amount;

  static Audience from(long amount) {
    return new Audience(amount);
  }

  private Audience(long amount) {
    this.amount = amount;
  }

  void setInvitation(Invitation invitation) {
    if (invitation == Invitation.EMPTY) {
      return;
    }
    this.invitation = invitation;
  }

  void buyTicket(TicketSeller ticketSeller, Movie movie) {
    this.ticket = ticketSeller.getTicket(this, movie);
  }

  boolean hasAmount (long amount) {
    return this.amount >= amount;
  }

  void minusAmount(long amount) {
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
