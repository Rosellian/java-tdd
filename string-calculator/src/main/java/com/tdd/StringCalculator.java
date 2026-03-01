package com.tdd;

import java.util.Arrays;

public class StringCalculator {

    public static final String DEFAULT_DELIMITER = "[,\n]";

    int add(String number) {
        if (number.isEmpty())
            return 0;

        String delimiter = chooseDelimiter(number);

        return calculateSum(delimiter.equals(DEFAULT_DELIMITER) ? number : number.substring(4),
                delimiter);
    }

    private String chooseDelimiter(String number) {
        if (number.startsWith("//")) {
            return number.substring(2)
                    .split("\n")[0];
        }
        else
            return DEFAULT_DELIMITER;
    }

    private int calculateSum(String number,  String delimiter) {
        String[] split = number.split(delimiter);

        return Arrays.stream(split)
                .mapToInt(Integer::parseInt)
                .sum();
    }
}
