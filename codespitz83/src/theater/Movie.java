package theater;

class Movie {
  private final String title;

  static Movie from(final String title) {
    return new Movie(title);
  }

  private Movie(final String title) {
    this.title = title;
  }
}
