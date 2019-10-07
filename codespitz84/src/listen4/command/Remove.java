package listen4.command;

import listen4.task.Task;

public class Remove implements Command {
    private final Task oldTask;

    public Remove(final Task oldTask) {
        this.oldTask = oldTask;
    }

    @Override
    public void execute(final Task task) {
        task.remove(oldTask);
    }

    @Override
    public void undo(final Task task) {
        task.add(oldTask.getTitle(), oldTask.getDate());
    }
}
