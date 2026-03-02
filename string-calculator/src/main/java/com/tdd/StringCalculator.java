package com.tdd;

import java.util.Arrays;
import java.util.List;

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

        List<Integer> integers = Arrays.stream(number.split(delimiter))
                .mapToInt(Integer::parseInt).boxed()
                .toList();

        checkNegatives(integers);

        return integers.stream().mapToInt(Integer::intValue)
                .filter(i -> i < 1001)
                .sum();
    }

    private void checkNegatives(List<Integer> integers) {
        List<Integer> negative = integers.stream().filter(i -> i < 0).toList();

        if(!negative.isEmpty()) {
            StringBuilder builder = createException(negative);
            throw new IllegalArgumentException(builder.toString());
        }
    }

    private StringBuilder createException(List<Integer> negative) {
        StringBuilder builder = new StringBuilder("Negatives not allowed: ");
        for(int i = 0; i< negative.size(); i++) {
            builder.append(negative.get(i));
            if(i+1 != negative.size()) {
               builder.append(",") ;
            }
        }
        return builder;
    }
}
