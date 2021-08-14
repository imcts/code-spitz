package study;

abstract class Base {
    public void doing () {
        System.out.println("먹어.");
        this._doing();
    }

    protected abstract void _doing (); // 이걸 반드시 구현해라. 나를 확장하는 애는 반드시 이걸 구현해야해.

    public void something() {
        // 구현
    }
}

//interface Base {
//     doing 강제.
//    public void doing (); // 공통된 코드가 없습니다. 확언.
//}

class A extends Base {
    public void _doing () {
        System.out.println("나는 A 이야. 걸어");
    }
}

class B extends Base {
    public void _doing () {
        System.out.println("나는 B 이야. 먹어");
    }
}

interface Flyer {
    public void fly ();
}

class C extends Base implements Flyer {
    public void _doing () {
        this.fly();
    }

    @Override
    public void fly() {
        System.out.println("나는 C 이야. 날어");
    }
}

class D implements Flyer {
    @Override
    public void fly() {
        System.out.println("나는 D 이야. 날어");
    }
}

public class JH {
    public static void main(String[] args) {
//        JH.view(new Base());  // 나는 두잉이야!!
        JH.view(new A());  // 먹어. 나는 A 이야!!
        JH.view(new B());  // 먹어. 나는 B 이야!!
        JH.view(new C());  // 먹어. 나는 C 이야!!
    }

    public static void view (Base base) {
        base.doing();
        base.something();
    }
}
