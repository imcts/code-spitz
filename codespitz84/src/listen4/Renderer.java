package listen4;

import java.util.List;
import java.util.function.Supplier;

public class Renderer {
    private static final int DEPTH_COUNT = 1;
    private final Supplier<Visitor> factory;

    public Renderer(Supplier<Visitor> factory) {
        this.factory = factory;
    }

    public void render (Report report) {
        this.render(this.factory.get(), report, 0, true);
    }

    private void render (Visitor visitor, Report report, int depth, boolean isEnd) {
        Task task = report.getTask();
        visitor.render(task, depth);
        int nextDepth = depth + Renderer.DEPTH_COUNT;

        List<Report> reports = report.getReports();
        for (int i = 0, size = reports.size(); i < size; i++) {
            this.render(visitor, reports.get(i), nextDepth + 1, i + 1 == size);
        }
        visitor.end(task, depth, isEnd);
    }
}
