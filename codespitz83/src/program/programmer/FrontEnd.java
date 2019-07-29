package program.programmer;

import program.base.Paper;
import program.base.Programmer;
import program.paper.Language;
import program.paper.Library;

public abstract class FrontEnd<T extends Paper> extends Programmer<T> {
  public Language language;
  public Library library;

  @Override
  protected Program makeProgram(T paper) {
    return new Program();
  }
}
