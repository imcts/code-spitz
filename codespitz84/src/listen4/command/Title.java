package listen4.command;

import listen4.task.Task;

public class Title implements Command {
    private final String title;
    private String oldTitle;

    public Title(final String title) {
        this.title = title;
    }

    @Override
    public void execute(final Task task) {
        this.oldTitle = task.getTitle();
        task.setTitle(this.title);
    }

    @Override
    public void undo(final Task task) {
        task.setTitle(this.oldTitle);
    }
}
