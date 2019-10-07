package listen4.command;

import listen4.task.Task;

import java.time.LocalDateTime;

public class Date implements Command {
    private final LocalDateTime date;
    private LocalDateTime oldDate;

    public Date(LocalDateTime date) {
        this.date = date;
    }

    @Override
    public void execute(Task task) {
        this.oldDate = task.getDate();
        task.setDate(this.date);
    }

    @Override
    public void undo(Task task) {
        task.setDate(this.oldDate);
    }
}
