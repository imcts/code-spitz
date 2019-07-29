package program.base;

import program.programmer.Program;

public interface Paper {
  /**
   * Director는 Paper를 여러개 소유하고 있기 때문에 Director의 내부에는 Papers가 존재할 수 밖에 없다.
   * Director와 Paper는 1:N 이지만 Paper입장에서 Director는 1:1이기 때문에 Paper쪽으로 역할을 분리시킨다.
   */
  Program [] run();
}
