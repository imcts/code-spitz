package theater;

import java.util.ArrayList;

class TicketOffices {
  private final ArrayList<TicketOffice> ticketOffices;

  static TicketOffices newInstance() {
    return new TicketOffices();
  }

  private TicketOffices() {
    this.ticketOffices = new ArrayList();
  }

  void appendTicketOffice(final TicketOffice ticketOffice) {
    if (this.hasTicketOffice(ticketOffice)) {
      return;
    }
    this.ticketOffices.add(ticketOffice);
  }

  void setTicket(final TicketOffice ticketOffice, final Ticket ticket) {
    if (!this.hasTicketOffice(ticketOffice)) {
      return;
    }
    ticketOffice.appendTicket(ticket);
  }

  private boolean hasTicketOffice(final TicketOffice ticketOffice) {
    return this.ticketOffices.contains(ticketOffice);
  }
}
