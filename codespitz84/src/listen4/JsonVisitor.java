package listen4;

import java.util.stream.IntStream;

public class JsonVisitor implements Visitor {
    private static final String PADDING = " ";

    @Override
    public void render(Task task, int depth) {
        String padding = this.padding(depth);
        System.out.println(padding + "{");

        String contentPadding = padding + JsonVisitor.PADDING;
        System.out.println(contentPadding + "\"title\":" + task.getTitle());
        System.out.println(contentPadding + "\"date\":" +task.getDate());
        System.out.println(contentPadding + "\"sub: [");
    }

    private String padding (int depth) {
        if (depth == 0) {
            return "";
        }
        return IntStream.range(0, depth)
            .mapToObj(v -> JsonVisitor.PADDING)
            .reduce((v1, v2) -> v1 + v2)
            .orElseThrow();
    }

    @Override
    public void end(Task task, int depth, boolean isEnd) {
        String padding = padding(depth);
        System.out.println(padding + JsonVisitor.PADDING + "]");

        if (isEnd) {
            System.out.println(padding + "}");
        } else {
            System.out.println(padding + "},");
        }
    }
}
