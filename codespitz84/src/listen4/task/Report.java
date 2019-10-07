package listen4.task;

import java.util.ArrayList;
import java.util.List;

/**
 * 1. Task는 자신을 직접 반환하지 않고 자신의 사본을 만들어 반환하도록 한다.
 * 2. Task를 직접 반환하지 않는 이유는 Task 내부에 있는 tasks를 반환할때 변조의 가능성이 있기 때문이다.
 * 3. Task를 복사하지 않는 이유는 Task에는 접대용 method밖에 없기 때문이다.
 */
public class Report {
    private final Task task;
    private final List<Report> reports;

    public Report(Task task) {
        this.task = task;
        this.reports = new ArrayList();
    }

    public void add(Report report) {
        if (report == null) {
            return;
        }
        this.reports.add(report);
    }

    public Task getTask() {
        return this.task;
    }

    public List<Report> getReports() {
        return this.reports;
    }
}
