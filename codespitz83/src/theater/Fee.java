package theater;

import java.util.HashMap;

public class Fee {
  private final long DEFAULT_FEE = 0L;
  private final HashMap<Movie, Long> fee;

  static Fee newInstance() {
    return new Fee();
  }

  private Fee() {
    this.fee = new HashMap();
  }

  void addMovieFee(Movie movie, long fee) {
    this.fee.put(movie, fee);
  }

  long getFee(Movie movie) {
    if (this.fee.containsKey(movie)) {
      return this.fee.get(movie);
    }
    return DEFAULT_FEE;
  }
}
