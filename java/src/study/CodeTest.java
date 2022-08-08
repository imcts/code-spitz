package study;

import org.w3c.dom.ranges.RangeException;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

class Solution1 {
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
        if (N < Solution1.MINIMUM_NUMBER) {
            throw new IllegalArgumentException("The N is less than the minimum number.");
        }
        if (N > Solution1.MAXIMUM_NUMBER) {
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


class Solution2 {
    private static final int MINIMUM_LENGTH = 3;
    private static final int MAXIMUM_LENGTH = 100_000;
    private static final int MINIMUM_VALUE = 0;
    private static final int MAXIMUM_VALUE = 1_000_000_000;
    /**
     배열에서 K의 개수만큼 연속 수를 제하고 가장 큰 수와 가장 작은 수를 뺐을때 그 합이 제일 작은 값을 구한다.
     - 제외할 인덱스를 준비하고 해당 값은 0이 시작값이다.
     - 인덱스부터 K만큼을 제외한다.
     - 나머지 중에서 제일 큰 값과 제일 작은 값을 구한다.
     - 두 값의 차를 구한다.
     - 제일 작은 진폭을 구한다.
     - 반환한다.
     */
    public int solution (int []A, int K) {
        int result = Integer.MAX_VALUE;
        int length = A.length;
        if (length > Solution2.MAXIMUM_LENGTH) {
            throw new IllegalArgumentException("The length of A is bigger than the maximum length.");
        }
        if (length < Solution2.MINIMUM_LENGTH) {
            throw new IllegalArgumentException("The length of A is less than the minimum length.");
        }
        int cursor = 0;
        while (true) {
            if (cursor > length - K) {
                return result;
            }
            int max = Integer.MIN_VALUE;
            int min = Integer.MAX_VALUE;
            for (int value : this.copyArray(A, K, cursor)) {
                if (value > Solution2.MAXIMUM_VALUE) {
                    throw new IllegalArgumentException("The value is bigger than the maximum value.");
                }
                if (value < Solution2.MINIMUM_VALUE) {
                    throw new IllegalArgumentException("The value is less than the miniumum value.");
                }
                if (value > max) {
                    max = value;
                }
                if (value < min) {
                    min = value;
                }
            }
            int amplitude = max - min;
            if (amplitude < result) {
                result = amplitude;
            }
            if (result == 0) {
                return result;
            }
            if (cursor >= Integer.MAX_VALUE) {
                throw new RuntimeException("There is no solution. the cursor is already reached the maximum range.");
            }
            cursor++;
        }
    }

    public List<Integer> copyArray (int [] A, int K, int cursor) {
        List copied = Arrays.stream(A).boxed().collect(Collectors.toList());
        int size = copied.size();
        if (cursor > size - K) {
            throw new ArrayIndexOutOfBoundsException("The cursor have to be less than A.length - K.");
        }
        List array = new ArrayList<Integer>();
        int i = 0;
        while (i < size) {
            if (i == cursor) {
                i += K;
            } else {
                array.add(copied.get(i));
                i++;
            }
        }
        return array;
    }
}

class Solution3 {
    private static final int MINIMUM_VALUE = 0;
    private static final int MAXIMUM_VALUE = 10_000;

    public int solution(int N) {
        if (N < Solution3.MINIMUM_VALUE) {
            throw new IllegalArgumentException("The N is less than the minimum value.");
        }
        if (N > Solution3.MAXIMUM_VALUE) {
            throw new IllegalArgumentException("The N is gibber than the maximum value.");
        }
        List<Integer> numbers = new ArrayList<Integer>();
        int ten = 1;
        for (int i = Solution3.MAXIMUM_VALUE; i > 0; i /= 10) {
            int m = N / i;
            if (m > 0) {
                N = N % i;
                numbers.add(m);
                ten *= 10;
            }
            if (N == 0) {
                break;
            }
        }
        ten /= 10;
        numbers.sort(Collections.reverseOrder());
        int result = 0;
        for (int i = 0, j = ten; i < numbers.size(); i++, j /= 10) {
            result += numbers.get(i) * j;
        }

        return result;
    }
}

public class CodeTest {
    public static void main(String[] args) {
//        // 2가 구해져야됨. [5, 3, 3] 나와야됨.
        int [] a1 = {5, 3, 6, 1, 3};
        int k1 = 2;
        System.out.println(new Solution2().solution(a1, k1));

//        // 0이 구해져야됨. [8, 8] 나와야됨.
        int [] a2 = {8, 8, 4, 3};
        int k2 = 2;
        System.out.println(new Solution2().solution(a2, k2));
//
//        // 1이 구해져야됨. [9, 8] 나와야됨.
        int [] a3 = {3, 5, 1, 3, 9, 8};
        int k3 = 4;
        System.out.println(new Solution2().solution(a3, k3));
    }
}
