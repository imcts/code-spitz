package listen4.task;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Task {
    private String title;
    private LocalDateTime date;
    private Boolean completed;
    private final List<Task> tasks;

    public Task(final String title, final LocalDateTime date) {
        if (title == null || date == null) {
            throw new RuntimeException("invalid");
        }
        this.setTitle(title);
        this.setDate(date);
        this.completed = false;
        this.tasks = new ArrayList();
    }

    public void toggle() {
        this.completed = !this.completed;
    }

    public Task add(final String title, final LocalDateTime date) {
        if (title == null || date == null) {
            throw new RuntimeException("invalid");
        }
        Task task = new Task(title, date);
        this.tasks.add(task);
        return task;
    }

    public void remove(final Task task) {
        if (!this.tasks.contains(task)) {
            return;
        }
        this.tasks.remove(task);
    }

    public void removeAll () {
        if (this.tasks.size() == 0) {
            return;
        }
        for (Task task : this.tasks) {
            task.removeAll();
        }
        this.tasks.clear();
    }

    public Report getReport(final Sort sort) {
        Report report = new Report(this);
        this.tasks.sort(sort::compare);
        for (Task task : this.tasks) {
            report.add(task.getReport(sort));
        }
        return report;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(final String title) {
        this.title = title;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(final LocalDateTime date) {
        if (date == null) {
            return;
        }
        this.date = date;
    }

    public Boolean isCompleted() {
        return completed;
    }
}
