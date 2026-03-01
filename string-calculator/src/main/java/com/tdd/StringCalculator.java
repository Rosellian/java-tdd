package com.tdd;

import java.util.Arrays;

public class StringCalculator {

    int add(String number) {
        if (number.isEmpty())
            return 0;

        String[] split = number.split("[,\n]");
        return Arrays.stream(split)
                .mapToInt(Integer::parseInt)
                .sum();
    }
}
