package listen4.visitor;

import listen4.task.Task;

public interface Visitor {
    void render (Task task, int depth);
    void end (Task task, int depth, boolean isEnd);
}
