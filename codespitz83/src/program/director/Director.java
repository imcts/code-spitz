package program.director;

import program.base.Paper;
import program.programmer.Program;

import java.util.HashMap;
import java.util.Map;

public class Director {
  private Map<String, Paper> projects = new HashMap<>();

  public void addProject(String name, Paper paper) {
    projects.put(name, paper);
  }

  public void runProject(String name) {
    if (!projects.containsKey(name)) {
      throw new RuntimeException("no project");
    }
    deploy(name, this.projects.get(name).run());
  }

  private void deploy(String projectName, Program... programs) {
    // Do deploy.
  }
}
