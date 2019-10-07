package listen4;

import listen4.command.Command;
import listen4.command.CommandTask;
import listen4.renderer.Renderer;
import listen4.task.Sort;
import listen4.task.Task;
import listen4.visitor.JsonVisitor;

import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {
        CommandTask root = new CommandTask("root", LocalDateTime.now());
        root.add("sub1", LocalDateTime.now());
        root.add("sub2", LocalDateTime.now());

        Task sub1 = root.getReport(Sort.TITLE_ASC).getReports().get(1).getTask();
        sub1.add("sub1_1", LocalDateTime.now());
        sub1.add("sub1_2", LocalDateTime.now());

        Task sub2 = root.getReport(Sort.TITLE_ASC).getReports().get(0).getTask();
        sub2.add("sub2_1", LocalDateTime.now());
        sub2.add("sub2_2", LocalDateTime.now());

        root.save("k");
        root.load("k");

        JsonVisitor visitor = new JsonVisitor();
        new Renderer(() -> visitor).render(root.getReport(Sort.TITLE_DESC));
        System.out.println(visitor.getJson());
    }
}
