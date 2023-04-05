package method;


class Parent {
    public static void method () {
        System.out.println("parent method");
    }
}

class Child extends Parent {
    public static void method2 () {
        Child.method();
        System.out.println("child method");
    }
}

public class Static {
    public static void main(String[] args) {
        Child.method2();
    }
}
