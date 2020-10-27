package generic;
import java.util.ArrayList;
import java.util.Iterator;
class TV{}
class GGG{}
class Phone extends GGG{}
class HandPhone extends Phone{}

public class GenericListMain {
    public static void main(String[] args) {
        ArrayList arr1 = new ArrayList();
        ArrayList<GGG> arr_g = new ArrayList();
        ArrayList<Phone> arr2 = new ArrayList();
        ArrayList<? super Phone> arr22 = new ArrayList();
        ArrayList<? extends Phone> arr2222 = new ArrayList();
        ArrayList<HandPhone> arr3 = new ArrayList();

        arr1.add(new TV());
        arr1.add(new GGG());
        arr1.add(new Phone());
        arr1.add(new HandPhone());


        //arr_g.add(new TV());
        arr_g.add(new GGG());
        arr_g.add(new Phone());
        arr_g.add(new HandPhone());


        //arr2.add(new TV());
        arr2.add(new Phone());
        arr2.add(new HandPhone());


        //arr22.add(new TV());
        //arr22.add(new GGG());  부모 불가
        arr22.add(new Phone());
        arr22.add(new HandPhone());
        //arr22.add(new EEE());


        //불가
//		arr2222.add(new TV());
//		arr2222.add(new GGG());
//		arr2222.add(new Phone());
//		arr2222.add(new HandPhone());

        //arr3.add(new TV());
        //arr3.add(new GGG());
        //arr3.add(new Phone());
        arr3.add(new HandPhone());

        //for (Phone oo : arr1) {}

        for (Phone ph : arr2) {}
        //for (HandPhone ph : arr2) {}

        for (Phone ph : arr3) {}
        for (HandPhone ph : arr3) {}

        meth_1(arr1);
        meth_1(arr_g);
        meth_1(arr2);
        meth_1(arr3);


        //meth_2(arr1);
        //meth_2(arr_g);
        meth_2(arr2);   //자신만 가능
        //meth_2(arr3);


        //meth_3(arr1);
        //meth_3(arr_g);
        //meth_3(arr2);
        meth_3(arr3);   //자신만 가능

        //meth_4(arr1);
        //meth_4(arr_g); 부모불가
        meth_4(arr2);
        meth_4(arr3);   //자식가능


        //meth_5(arr1);
        meth_5(arr_g);  //부모가능
        meth_5(arr2);
        //meth_5(arr3);   자식불가


        Iterator it1;
        it1 = arr1.iterator();
        it1 = arr2.iterator();
        it1 = arr3.iterator();

        Iterator<Phone> it2;
        //it2 = arr1.iterator();
        it2 = arr2.iterator();
        //it2 = arr3.iterator();

        Iterator<HandPhone> it3;
        //it3 = arr1.iterator();
        //it3 = arr2.iterator();
        it3 = arr3.iterator();

        Iterator<? extends Phone> it4;
        //it4 = arr1.iterator();
        it4 = arr2.iterator();
        it4 = arr3.iterator();



    }

    static void meth_1(ArrayList arr) {}
    static void meth_2(ArrayList<Phone> arr) {/// Phone 만  가능
        for (Phone ph : arr) {}
    }


    static void meth_3(ArrayList<HandPhone> arr) {}  //자신만 가능

    static void meth_4(ArrayList<? extends Phone> arr) {}  /// 제너릭으로 지정된 것이 자식도 가능(부모불가)

    static void meth_5(ArrayList<? super Phone> arr) {  // 제너릭으로 지정된 것이 부모도 가능(자식 불가)

    }  /// 제너릭으로 지정된 것이 상속관계도 가능

}