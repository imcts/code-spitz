package theater;

import java.util.Arrays;

/**
 * @practice#1
 * issue: TicketOffice는 암묵적으로 하나의 극장하고만 계약하고 있다는 가정이 있게 구현되어있다.
 * 코드상 이 조건을 강제하도록 개선하라.
 *
 * resolve: TicketOffice를 알고있는건 Theater이다. Theater의 setTicketOffices에서 TicketOffice를 추가할때
 * 이미 등록되어진 TicketOffice인지 검사하는 코드를 추가하여 해결한다. 현재 Theater내부에는 TicketOffices라는 일급 컬렉션 객체가
 * 존재하므로 해당 객체에게 위임한다.
 *
 * @practice#2
 * issue: Theater는 단 하나의 영화만 고정가격으로 상영중이다.
 * 다양한 가격의 영화를 상영할 수 있게 개선하라.
 *
 * resolve:
 * - 영화별 가격은 Theater가 정한다.
 * - 영화는 다른 상영관에서도 상영될 수 있으므로 영화의 정보만 담고 있어야 한다.
 * - Theater는 영화목록과 상영금액을 전달 받고 Fee에 영화별로 상영금액을 저장한다.
 * - Ticket은 티켓 오피스에 티켓을 위탁할때 생성되므로 티켓의 영화도 같이 넘긴다.
 * - Ticket은 Theater뿐 아니라 Movie도 알고 있는다.
 * - TicketSeller에게 Ticket을 구매할때 Audience가 관람하고 싶은 Movie도 함께 전달한다.
 * - TicketSeller는 전달받은 Movie로 TicketOffice에게 영화 금액을 조회하기도 하고, 해당 Ticket을 구해오기도 한다.
 * - 사용자는 TicketSeller를 통하여 Ticket을 구매하고 Theater를 통해 입장한다.
 */
public class Main {
  private static long SAND_SPOON_USER_SEED_MONEY = 0L;
  private static long GOLD_SPOON_USER_SEED_MONEY = 10L;
  private static long NORMAL_TICKET_FEE = 10L;
  private static long PREMIUM_TICKET_FEE = 20L;
  private static long TICKET_AMOUNT_TO_MAKE = 10L;

  public static void main(String[] args) {
    Movie movie1 = Movie.from("알라딘");
    Movie movie2 = Movie.from("스파이더맨");
    Theater theater = Theater.newInstance();
    TicketOffice ticketOffice = TicketOffice.newInstance();
    TicketSeller seller = TicketSeller.newInstance();
    Audience audience1 = Audience.from(SAND_SPOON_USER_SEED_MONEY);
    Audience audience2 = Audience.from(GOLD_SPOON_USER_SEED_MONEY);

    theater.setMovie(movie1, NORMAL_TICKET_FEE);
    theater.setMovie(movie2, PREMIUM_TICKET_FEE);
    theater.setTicketOffices(ticketOffice);
    theater.setTicket(ticketOffice, movie1, TICKET_AMOUNT_TO_MAKE);
    theater.setTicket(ticketOffice, movie2, TICKET_AMOUNT_TO_MAKE);
    theater.setInvitation(audience1);

    seller.setTicketOffice(ticketOffice);

    audience1.buyTicket(seller, movie1);
    audience2.buyTicket(seller, movie2);

    Arrays
      .asList(theater.enter(audience1), theater.enter(audience2))
      .forEach(System.out::println);
  }
}
