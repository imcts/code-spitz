package program.paper;

import program.base.Paper;
import program.base.Programmer;

public abstract class ServerClient implements Paper {
  public Server server = new Server("test");
  public Language backEndLanguage = new Language("java");
  public Language frontEndLanguage = new Language("kotlinJS");
  protected Programmer backEndProgrammer;
  protected Programmer frontEndProgrammer;
}
