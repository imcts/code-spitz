package theater2;

import theater2.vo.Money;
import theater2.vo.Movie;

public class Customer {
  Reservation reservation = Reservation.NONE;
  private Money amount;

  public Customer(Money amount) {
    this.amount = amount;
  }

  public void reserve(TicketSeller seller, Theater theater, MovieTheater movieTheater, Movie movie, Screening screening, int count) {
    reservation = seller.reserve(this, theater, movieTheater, movie, screening, count);
  }

  boolean hasAmount(Money amount) {
    return this.amount.greaterThen(amount);
  }

  void minusAmount(Money amount) {
    this.amount = this.amount.minus(amount);
  }
}
