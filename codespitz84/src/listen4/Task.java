package listen4;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Task {
    private final String title;
    private final LocalDateTime date;
    private Boolean completed;
    private final List<Task> tasks;

    public Task(String title, LocalDateTime date) {
        this.title = title;
        this.date = date;
        this.completed = false;
        this.tasks = new ArrayList();
    }

    public void toggle () {
        this.completed = !this.completed;
    }

    public void add (final String title, final LocalDateTime date) {
        if (title == null || date == null) {
            return;
        }
        Task task = new Task(title, date);
        this.tasks.add(task);
    }

    public void remove (Task task) {
        if (!this.tasks.contains(task)) {
            return;
        }
        this.tasks.remove(task);
    }

    public Report getReport () {
        Report report = new Report(this);
        for (Task childTask : this.tasks) {
            report.add(childTask.getReport());
        }
        return report;
    }

    public String getTitle() {
        return title;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public Boolean isCompleted() {
        return completed;
    }
}
