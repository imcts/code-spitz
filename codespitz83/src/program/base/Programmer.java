package program.base;

import program.programmer.Program;

public abstract class Programmer<T extends Paper> {
  public Program getProgram(T paper) {
    setData(paper);
    return makeProgram(paper);
  }

  public abstract void setData(T paper);

  protected abstract Program makeProgram(T paper);
}
