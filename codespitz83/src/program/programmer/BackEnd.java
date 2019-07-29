package program.programmer;

import program.base.Paper;
import program.base.Programmer;
import program.paper.Language;
import program.paper.Server;

public abstract class BackEnd<T extends Paper> extends Programmer<T> {
  public Server server;
  public Language language;

  @Override
  protected Program makeProgram(T paper) {
    return new Program();
  }
}
