package program;

import program.director.Director;
import program.paper.Client;
import program.paper.ServerClient;
import program.programmer.BackEnd;
import program.programmer.FrontEnd;
import program.programmer.Program;

public class Main implements Cloneable {
  public static void main(String[] args) {
    /**
     * 서버사이즈 프로젝트인 경우.
     */
    Director director = new Director();
    director.addProject("A 프로젝트", new ServerClient() {
      @Override
      public Program[] run() {
        this.frontEndProgrammer = new FrontEnd<ServerClient>(){
          @Override
          public void setData(ServerClient paper) {
            this.language = paper.frontEndLanguage;
          }
        };
        this.backEndProgrammer = new BackEnd<ServerClient>(){
          @Override
          public void setData(ServerClient paper) {
            this.server = paper.server;
            this.language = paper.backEndLanguage;
          }
        };
        return new Program[] {
          this.frontEndProgrammer.getProgram(this),
          this.backEndProgrammer.getProgram(this)
        };
      }
    });
    director.runProject("A 프로젝트");


    /**
     * 클라이언트 프로젝트인 경우.
     */
    director.addProject("B 프로젝트", new Client() {
      @Override
      public Program[] run() {
        this.programmer = new FrontEnd<Client>(){
          @Override
          public void setData(Client paper) {
            this.library = paper.library;
            this.language = paper.language;
          }
        };
        return new Program[] {
          this.programmer.getProgram(this)
        };
      }
    });
  }

  @Override
  protected Object clone() throws CloneNotSupportedException {
    return super.clone();
  }
}
