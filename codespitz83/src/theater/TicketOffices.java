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

  void appendTicketOffice(TicketOffice ticketOffice) {
    if (this.hasTicketOffice(ticketOffice)) {
      return;
    }
    this.ticketOffices.add(ticketOffice);
  }

  void setTicket(TicketOffice ticketOffice, Ticket ticket) {
    if (!this.hasTicketOffice(ticketOffice)) {
      return;
    }
    ticketOffice.appendTicket(ticket);
  }

  private boolean hasTicketOffice(TicketOffice ticketOffice) {
    return this.ticketOffices.contains(ticketOffice);
  }
}
