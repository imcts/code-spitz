package listen4.command;

import listen4.task.Task;

import java.time.LocalDateTime;

public class Add implements Command {
    private final String title;
    private final LocalDateTime date;
    private Task oldTask;

    public Add(String title, LocalDateTime date) {
        this.title = title;
        this.date = date;
    }

    @Override
    public void execute(final Task task) {
        this.oldTask = task.add(this.title, this.date);
    }

    @Override
    public void undo(final Task task) {
        task.remove(this.oldTask);
    }
}
