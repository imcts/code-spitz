package listen4.renderer;

import listen4.task.Report;
import listen4.task.Task;
import listen4.visitor.Visitor;

import java.util.List;
import java.util.function.Supplier;

/**
 * - Renderer는 재귀적인 데이터를 순회하는 역할을 담당한다.
 * - Visitor는 재귀적인 데이터를 매번 받아들여 실질적인 일을 수행하는 객체로 역할을 구분한다.
 * - 이로인해 어떤 Visitor가 오더라도 Renderer는 순회에 대한 책임만 수행하므로 실질적인 역할을 Visitor에게 위임하게 되어 Visitor에 유연한 코드를 작성할 수 있다.
 * 1. Renderer는 Visitor를 매번 생성하는 factory를 전달 받는다.
 * 2. Renderer는 반복적으로 무한대 깊이의 자료구조 순회하는 역할을 수행한다.
 * 3. Visitor는 무한대 깊이의 자료구조를 Renderer가 순회하며 전달한 데이터를 기반으로 실제 구현해야하는 역할을 담당한다.
 */
public class Renderer {
    private static final int DEPTH_COUNT = 1;
    private final Supplier<Visitor> factory;

    public Renderer(Supplier<Visitor> factory) {
        this.factory = factory;
    }

    public void render(Report report) {
        this.render(this.factory.get(), report, 0, true);
    }

    private void render(Visitor visitor, Report report, int depth, boolean isEnd) {
        Task task = report.getTask();
        visitor.render(task, depth);
        int nextDepth = depth + DEPTH_COUNT;

        List<Report> reports = report.getReports();
        for (int i = 0, size = reports.size(); i < size; i++) {
            this.render(visitor, reports.get(i), nextDepth + 1, i + 1 == size);
        }
        visitor.end(task, depth, isEnd);
    }
}
