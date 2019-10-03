package listen4;

import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {
        Task root = new Task("root", LocalDateTime.now());
        root.add("sub1", LocalDateTime.now());
        root.add("sub2", LocalDateTime.now());
        new Renderer(JsonVisitor::new).render(root.getReport());
    }
}
