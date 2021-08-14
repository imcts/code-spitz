package generic;

import java.util.ArrayList;
import java.util.List;

class A {}

class B extends A {}

class C extends B {}

public class GTest {
    public static void main(String[] args) {
        List list = new ArrayList<String>();
        list.add("1");
        list.add("2");
        GTest.print(list);
    }

    static void print (List<? extends String> list) { // 아하 ㅎㅎ 이거는 제네릭이라기 보다는 제네릭 확장과 수퍼에 대한 이야기구나.
        System.out.println("ㅇㅇ");
        list.forEach(System.out::println);
    }

    void genericExtends (List<? extends A> list) {
        // The expression of the extends enumerates every type of the list of the subtypes.
//        List<? extends A> list = new ArrayList<>();

        // The list is pointing kinds of below.
        List<A> aList;
        List<B> bList;
        List<C> oList;

        // TODO Reading.
        // It can guarantee the type of A because every class is extended A.
        A a = list.get(0);

        // It can't guarantee the type of B because list is pointing the types of A and C
        B b = list.get(0);

        // It can't guarantee the type of B because list is pointing the types of A and B
        C c = list.get(0);

        // TODO Writing.
        // The type of A isn't allowed because list is pointing the types of B and C
        list.add(new A());

        // The type of B isn't allowed because list is pointing the types of A and C
        list.add(new B());

        // The type of C isn't allowed because list is pointing the types of A and B
        list.add(new C());
    }

    void genericSuper () {
        // The expression of the extends enumerates every type of the list of the supertypes.
        List<? super A> list = new ArrayList<>();

        // The list is pointing kinds of below.
        List<A> aList;
        List<Object> oList;

        // TODO Reading.
        // It can't guarantee the type of A because list is pointing the type of B
        A a = list.get(0);

        // It can't guarantee the type of B because list is pointing the type of A
        B b = list.get(0);

        // It can guarantee the type of Object because Object is allowed the type of A and B
        Object o = list.get(0);

        // TODO Writing.
        // These things are allowed the types of A and Object.
        list.add(new A());
        list.add(new B());
        list.add(new C());
    }
}
