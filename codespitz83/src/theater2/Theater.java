package theater2;

import theater2.vo.Money;
import theater2.vo.Movie;

import java.util.HashSet;
import java.util.Set;

public class Theater {
  private final Set<TicketOffice> ticketOffices = new HashSet<>();
  private final Set<MovieTheater> movieTheaters = new HashSet<>();
  private Money amount;

  public Theater(Money amount) {
    this.amount = amount;
  }

  void addMovieTheater (MovieTheater movieTheater) {
    if (this.movieTheaters.contains(movieTheater)) {
      return;
    }
    this.movieTheaters.add(movieTheater);
  }

  void contractTicketOffice(TicketOffice ticketOffice, Double rate) {
    if (!ticketOffice.contract(this, rate)) {
      return;
    }
    ticketOffices.add(ticketOffice);
  }

  void cancelTicketOffice(TicketOffice ticketOffice) {
    if (!ticketOffices.contains(ticketOffice) || !ticketOffice.cancel(this)) {
      return;
    }
    ticketOffices.remove(ticketOffice);
  }

  void plusAmount(Money amount) {
    this.amount = this.amount.plus(amount);
  }

  boolean enter(Customer customer, int count) {
    Reservation reservation = customer.reservation;
    return reservation != Reservation.NONE && reservation.theater == this && reservation.count == count;
  }

  Reservation reserve(Movie movie, MovieTheater movieTheater, Screening screening, int count) {
    if (!this.movieTheaters.contains(movieTheater) || !movieTheater.isValidScreening(movie, screening) || !movieTheater.hasSeat(count)) {
      return Reservation.NONE;
    }
    movieTheater.reserveSeat(count);
    return new Reservation(this, movieTheater, movie, screening, count);
  }

  public Set<MovieTheater> getMovieTheaters() {
    return movieTheaters;
  }
}
