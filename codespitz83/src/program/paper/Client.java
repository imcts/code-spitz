package program.paper;

import program.base.Paper;
import program.base.Programmer;

public abstract class Client implements Paper {
  public Library library = new Library("vieJS");
  public Language language = new Language("kotlinJS");
  protected Programmer programmer;
}
