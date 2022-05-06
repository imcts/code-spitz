package study;

import org.w3c.dom.ranges.RangeException;

class Solution {
    private static final int MINIMUM_NUMBER = 0;
    private static final int MAXIMUM_NUMBER = 50;

    public int calculateSum (int value) {
        if (value <= 0) {
            return 0;
        }
        int sum = 0;
        while (value > 0) {
            // 10으로 나머지 연산을 하여 뒤의 1의 자리만 얻어서 더한다. 79인 경우 9만 더해짐.
            sum += value % 10;
            // 79 / 10 7.9 이지만 7만 들어감.
            value = value / 10;
        }
        return sum;
    }

    public int solution (int N) {
        if (N < Solution.MINIMUM_NUMBER) {
            throw new IllegalArgumentException("The N is less than the minimum number.");
        }
        if (N > Solution.MAXIMUM_NUMBER) {
            throw new IllegalArgumentException("The N is bigger than the maximum number.");
        }
        for (int i = 0;; i++) {
            if (this.calculateSum(i) == N) {
                return i;
            }
            if (i >= Integer.MAX_VALUE) {
                throw new RuntimeException("There is no solution.");
            }
        }
    }
}

public class CodeTest {
    public static void main(String[] args) {
        System.out.println(new Solution().solution(0));
        System.out.println(new Solution().solution(7));
        System.out.println(new Solution().solution(16));
        System.out.println(new Solution().solution(19));
    }
}