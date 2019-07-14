package theater2;

import theater2.vo.Money;
import theater2.vo.Movie;

import java.util.HashMap;
import java.util.Map;

public class TicketOffice {
  private Money amount;
  private Map<Theater, Double> commissionRate = new HashMap<>();

  public TicketOffice(Money amount) {
    this.amount = amount;
  }

  boolean contract(Theater theater, Double rate) {
    if (commissionRate.containsKey(theater)) return false;
    commissionRate.put(theater, rate);
    return true;
  }

  boolean cancel(Theater theater) {
    if (!commissionRate.containsKey(theater)) return false;
    commissionRate.remove(theater);
    return true;
  }

  Reservation reserve(Theater theater, MovieTheater movieTheater, Movie movie, Screening screening, int count) {
    if (!commissionRate.containsKey(theater)) {
      return Reservation.NONE;
    }
    Reservation reservation = theater.reserve(movie, movieTheater, screening, count);
    if (reservation != Reservation.NONE) {
      Money sales = movie.calculateFee(screening, count);
      Money commission = sales.multi(commissionRate.get(theater));
      amount = amount.plus(commission);
      theater.plusAmount(sales.minus(commission));
    }
    return reservation;
  }

}
