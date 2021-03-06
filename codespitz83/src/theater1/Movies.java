package theater1;

import java.util.ArrayList;

class Movies {
  private final ArrayList<Movie> movies;

  static Movies newInstance() {
    return new Movies();
  }

  private Movies() {
    this.movies = new ArrayList();
  }

  void appendMovie(final Movie movie) {
    if (this.movies.contains(movie)) {
      return;
    }
    this.movies.add(movie);
  }
}
