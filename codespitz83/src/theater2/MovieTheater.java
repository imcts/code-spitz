package theater2;

import theater2.vo.Movie;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class MovieTheater {
  public static final Set<Screening> EMPTY = new HashSet<>();
  private final Map<Movie, Set<Screening>> movies = new HashMap<>();
  private int seat;

  public MovieTheater(int seat) {
    this.seat = seat;
  }

  void addScreening(Movie movie, Screening screening) {
    this.addMovie(movie);
    movies.get(movie).add(screening);
  }

  private void addMovie(Movie movie) {
    if (movies.containsKey(movie)) {
      return;
    }
    movies.put(movie, new HashSet<>());
  }

  public Set<Screening> getScreening(Movie movie) {
    if (!movies.containsKey(movie) || movies.get(movie).size() == 0) {
      return EMPTY;
    }
    return movies.get(movie);
  }

  boolean isValidScreening(Movie movie, Screening screening) {
    return movies.containsKey(movie) && movies.get(movie).contains(screening);
  }

  boolean hasSeat(int count) {
    return this.seat >= count;
  }

  void reserveSeat(int count) {
    if (hasSeat(count)) {
      this.seat -= count;
    } else {
      throw new RuntimeException("no seat");
    }
  }
}
