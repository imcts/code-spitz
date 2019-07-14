package theater2;

import theater2.base.AmountDiscount;
import theater2.discount.CountAmountDiscount;
import theater2.discount.PeriodAmountDiscount;
import theater2.discount.SequenceAmountDiscount;
import theater2.vo.Money;
import theater2.vo.Movie;

import java.time.Duration;
import java.time.LocalDateTime;

/**
 * @practice#1
 * issue: 본 예제 에서는 Sequence를 통한 할인조건만 구현되어있다.
 *        Period 및 한번에 예약하는 사람의 수가 일정수를 넘어가면 할인해주는 Count조건에 따른 할인 조건을 구현 하라.
 *
 * resolve1: PeriodAmountDisCount
 *  - 생성자에서 할인 시작기간과 종료기간과 할인금액을 인자로 받는다.
 *  - isSatisfiedBy 메소드를 오버라이드하여 현재 시간이 해당 기간에 포함되는지 확인한다.
 *
 * resolve2: CountAmountDisCount
 *  - 생성자에서 할인이 적용할 인원수를 인자로 전달받는다.
 *  - isSatisfiedBy 메소드를 오버라이드하여 예약인원이 저장했던 할인 인원수보다 큰지를 확인한다.
 *
 * @practice#2
 * issue: 현재의 예제는 영화와 상영이라는 컨텍스트로 역할로 예매를 진행한다.
 *        상영은 본디 시간표일 뿐이므로 좌석수 등을 가질 수 없다.
 *        극장이 상영관을 소유하게하고 상영이 상영관과 협력하여 예매시의 잔여좌석수를 관리하도록 개선하라.
 * resolve:
 *  - 상영관(MovieTheater)을 생성한다.
 *  - 상영관에 영화별로 상영을 추가한다.
 *  - 극장에 상영관을 추가한다.
 *  - 고객은 극장에 입장할때 어떤 상영관에 어떤 영화에 어떤 상영을 구매할 것인지 알아야 하므로 추가로 예매할 movieTheater를 전달한다.
 *  - 셀러는 고객의 보유금액을 확인 후 티켓 오피스에 상영관 추가하여 전달한다.
 *  - 티켓 오피스는 자신과 계약한 극장인지 확인하고 극장에게 예매를 요청한다.
 *  - 극장은 자신이 보유한 상영관인지 확인하고, 해당 상영관으로부터 유효한 상영인지 좌석은 남아있는지 확인한다.
 *  - 유효성 검사 후 예매가 가능한 경우 상영관으로부터 좌석을 예매하고 예약을 완료한다.
 *  - 고객이 예매표를 가지고 입장을 시도할 시, 극장은 예매내역으로부터 유효한 표인지, 극장이 자신이 맞는지, 예매 인원수가 맞는지 확인 한다.
 */

@SuppressWarnings("LoopStatementThatDoesntLoop")
public class Main {
  public static void main(String[] args) {
    Theater theater = new Theater(Money.of(100.0));
    Movie movie1 = new Movie<AmountDiscount>(
      "spiderman",
      Duration.ofMinutes(120L),
      Money.of(5000.0),
      new SequenceAmountDiscount(Money.of(1000.0), 10)
    );
    Movie movie2 = new Movie<AmountDiscount>(
      "라이온킹",
      Duration.ofMinutes(120L),
      Money.of(5000.0),
      new PeriodAmountDiscount(Money.of(1000.0), LocalDateTime.of(2018, 9, 10, 0, 0, 0), LocalDateTime.of(2019, 12, 1, 0, 0))
    );
    Movie movie3 = new Movie<AmountDiscount>(
      "라이온킹",
      Duration.ofMinutes(120L),
      Money.of(5000.0),
      new CountAmountDiscount(Money.of(1000.0), 3)
    );

    MovieTheater movieTheater1 = new MovieTheater(100);
    for (int day = 7; day < 32; day++) {
      for (int hour = 10, seq = 1; hour < 24; hour += 3, seq++) {
        movieTheater1.addScreening(movie2, new Screening(seq, LocalDateTime.of(2019, 7, day, hour, 0, 0)));
      }
    }
    theater.addMovieTheater(movieTheater1);

    TicketOffice ticketOffice = new TicketOffice(Money.of(0.0));
    theater.contractTicketOffice(ticketOffice, 10.0);
    TicketSeller seller = new TicketSeller();
    seller.setTicketOffice(ticketOffice);
    Customer customer = new Customer(Money.of(20000.0));

    for (MovieTheater movieTheater : theater.getMovieTheaters()) {
      for (Screening screening : movieTheater.getScreening(movie2)) {
        customer.reserve(seller, theater, movieTheater1, movie2, screening, 2);
        boolean isOk = theater.enter(customer, 2);
        System.out.println(isOk);
        break;
      }
      break;
    }
  }
}
