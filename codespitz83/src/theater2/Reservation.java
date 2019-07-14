package theater2;

import theater2.vo.Movie;

public class Reservation {
  static final Reservation NONE = new Reservation(null, null, null, null, 0);
  final Theater theater;
  final MovieTheater movieTheater;
  final Movie movie;
  final Screening screening;
  final int count;

  Reservation(Theater theater, MovieTheater movieTheater, Movie movie, Screening screening, int audienceCount) {
    this.theater = theater;
    this.movieTheater = movieTheater;
    this.movie = movie;
    this.screening = screening;
    this.count = audienceCount;
  }
}
