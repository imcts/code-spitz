package theater;

import java.util.ArrayList;

class Movies {
  private final ArrayList<Movie> movies;

  static Movies newInstance() {
    return new Movies();
  }

  private Movies() {
    this.movies = new ArrayList();
  }

  void appendMovie(Movie movie) {
    if (this.movies.contains(movie)) {
      return;
    }
    this.movies.add(movie);
  }
}
