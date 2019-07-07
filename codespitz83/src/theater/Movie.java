package theater;

class Movie {
  private final String title;

  static Movie from(String title) {
    return new Movie(title);
  }

  private Movie(String title) {
    this.title = title;
  }
}
