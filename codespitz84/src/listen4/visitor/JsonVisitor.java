package listen4.visitor;

import listen4.task.Task;

import java.util.stream.IntStream;

public class JsonVisitor<T> implements Visitor {
    private static final String PADDING = " ";
    private String json = "";

    @Override
    public void render(Task task, int depth) {
        String padding = this.padding(depth);
        this.json += padding + "{\n";

        String contentPadding = padding + PADDING;
        this.json += contentPadding + "\"title\": \"" + task.getTitle() + "\",\n";
        this.json += contentPadding + "\"date\": \"" +task.getDate() + "\",\n";
        this.json += contentPadding + "\"sub\": [\n";
    }

    private String padding (int depth) {
        if (depth == 0) {
            return "";
        }
        return IntStream.range(0, depth)
            .mapToObj(v -> PADDING)
            .reduce((v1, v2) -> v1 + v2)
            .orElseThrow();
    }

    @Override
    public void end(Task task, int depth, boolean isEnd) {
        String padding = padding(depth);
        this.json += padding + PADDING + "]\n";
        if (isEnd) {
            this.json += padding + "}\n";
        } else {
            this.json += padding + "},\n";
        }
    }

    public String getJson() {
        return this.json;
    }
}
