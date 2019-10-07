package listen4.command;

import listen4.renderer.Renderer;
import listen4.task.Report;
import listen4.task.Sort;
import listen4.task.Task;
import listen4.visitor.JsonVisitor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * - Task를 대신하여 역할을 수행하는 CommandTask객체를 생성한다.
 * - Task가 수행할 행동이나 행위 자체를 캐싱하는 것이 목적인 객체이므로 생성 시 Task 생성자와 동일한 생성자를 가지는게 타당하다.
 * - 뿐만 아니라 Task의 역할을 대신 수행해야 하므로 Task의 모든 메소드를 갖는 것 또한 당연하며 내부 property로 Task를 갖는다.
 * 1. 메소드를 커맨드로 만들어서 해당 커맨드 객체를 저장한다.
 * 2. 행동이나 행위를 객체로 저장하기 때문에 undo / redo 뿐 아니라 lazy한 실행을 수행할 수 있게 된다.
 * 3. removed와 commands를 사용하여 cursor를 대체한다.
 */
public class CommandTask {
    private final Task task;
    private final List<Command> commands;
    private final List<Command> removed;
    private final Map<String, String> saved;

    public CommandTask(final String title, final LocalDateTime date) {
        this.task = new Task(title, date);
        this.commands = new ArrayList();
        this.removed = new ArrayList();
        this.saved = new HashMap();
    }

    private void execute(Command command) {
        this.commands.add(command);
        this.removed.clear();
        command.execute(this.task);
    }

    public void save(String key) {
        JsonVisitor visitor = new JsonVisitor();
        new Renderer(() -> visitor).render(this.getReport(Sort.TITLE_DESC));
        this.saved.put(key, visitor.getJson());
    }

    public void load(String key) {
        if (!this.saved.containsKey(key)) {
            throw new RuntimeException("You have to json before load.");
        }
        String json = this.saved.get(key);
        if (json.trim().charAt(0) != '{') {
            throw new RuntimeException("The format of the JSON is not allowed for loading to CommandTask.");
        }

        int cursor = 0;
        this.task.removeAll();
        this.task.setTitle(this.getValue(json, cursor = this.next("\"title\": \"", json, cursor)));
        this.task.setDate(LocalDateTime.parse(this.getValue(json, cursor = this.next("\"date\": \"", json, cursor))));
        this.load(this.task, json, this.next("\"sub\": [", json, cursor));
    }

    private int load(Task parent, String json, int cursor) {
        Task child = null;
        int length = json.length();
        while (cursor < length) {
            char c = json.charAt(cursor);
            if (c == '{') {
                child = parent.add(
                    this.getValue(json, cursor = this.next("\"title\": \"", json, cursor)),
                    LocalDateTime.parse(this.getValue(json, cursor = this.next("\"date\": \"", json, cursor)))
                );
            }
            if (c == '[' && child != null) {
                cursor = this.load(child, json, cursor);
            }
            if (c == '}') {
                return cursor;
            }
            cursor++;
        }
        return cursor;
    }

    private int next(String target, String json, int cursor) {
        int startIndex = json.indexOf(target, cursor);
        if (startIndex == -1) {
            return cursor;
        }
        return startIndex + target.length();
    }

    private String getValue(String json, int cursor) {
        return json.substring(cursor, json.indexOf("\"", cursor + 1));
    }

    public void redo() {
        if (this.removed.size() == 0) {
            return;
        }
        Command command = this.removed.remove(0);
        command.execute(this.task);
        this.commands.add(command);
    }

    public void undo() {
        final int size = this.commands.size();
        if (size == 0) {
            return;
        }
        Command command = this.commands.remove(size - 1);
        command.undo(this.task);
        this.removed.add(command);
    }

    public void toggle() {
        this.execute(new Toggle());
    }

    public void add(final String title, final LocalDateTime date) {
        this.execute(new Add(title, date));
    }

    public void remove(final Task task) {
        this.execute(new Remove(task));
    }

    public Report getReport (final Sort sort) {
        return this.task.getReport(sort);
    }

    public String getTitle() {
        return this.task.getTitle();
    }

    public void setTitle(String title) {
        this.execute(new Title(title));
    }

    public LocalDateTime getDate() {
        return this.task.getDate();
    }

    public void setDate(final LocalDateTime date) {
        this.execute(new Date(date));
    }

    public Boolean isCompleted() {
        return this.task.isCompleted();
    }
}
