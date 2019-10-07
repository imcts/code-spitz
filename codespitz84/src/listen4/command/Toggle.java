package listen4.command;

import listen4.task.Task;

public class Toggle implements Command {
    @Override
    public void execute(final Task task) {
        task.toggle();
    }

    @Override
    public void undo(final Task task) {
        task.toggle();
    }
}
