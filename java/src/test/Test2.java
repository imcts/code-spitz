package test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Test2 {
    public static int solution(int N) {
        List<Integer> numList = new ArrayList<Integer>();
        int ten = 1;
        for (int i = 10000; i > 0; i /= 10) {
            int m = N / i;
            if (m > 0) {
                N = N % i;
                numList.add(m);
                ten *= 10;
                System.out.println(ten);
            }
            if (N == 0) {
                break;
            }
        }
        ten /= 10;
        numList.sort(Collections.reverseOrder());
        int result = 0;
        for (int i = 0, j = ten; i < numList.size(); i++, j /= 10) {
            System.out.println(numList.get(i)+ "," + j);
            result += numList.get(i) * j;
        }

        return result;
    }
    public static void main(String[] args) {
        int result = solution(321);
        System.out.println(result + " == 213");
    }
}

























