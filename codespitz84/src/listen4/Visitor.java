package listen4;

public interface Visitor {
    void render (Task task, int depth);
    void end (Task task, int depth, boolean isEnd);
}
