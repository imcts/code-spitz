package listen4.command;

import listen4.task.Task;

public interface Command {
    void execute (final Task task);
    void undo (final Task task);
}
