package test;

import java.util.LinkedHashMap;

public class EnumStudy {
    enum Symbol {
        WONJUN("황원준"), YEONJONG("신연종");

        private String name;
        private static LinkedHashMap map = LinkedHashMap<string, Symbol>.new();

        Enum(String name) {
            this.name = name;
        }

        Enum() {
            this("값이 없음");
        }

        public static for (String key) {
            if (this.map.has(key)) {
                return this.map.get(key);
            } else {
                this.map.set(key, Symbol());
            }
        }

        public String getName () {
            return this.name;
        }
    }

    protected class Const {
        public Object yj = new Object();
        public Object wj = new Object();
    }

    public static void main(String[] args) {
        final Object yj = new Object();
        final Object wj = new Object();

        Enum e = Enum.WONJUN;
        e.getName();


        var o = {
            [Enum.YEONJONG]: "Example"
        };
    }
}
