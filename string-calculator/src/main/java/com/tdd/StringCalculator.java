package com.tdd;

import java.util.Arrays;

public class StringCalculator {

    int add(String number) {
        if (number.isEmpty())
            return 0;

        String[] split = number.split(",");
        if (split.length == 2)
            return Integer.parseInt(split[0]) + Integer.parseInt(split[1]);
        return Integer.parseInt(split[0]);
    }
}
