package com.tdd;

public class StringCalculator {

    int add(String number) {
        if (number.isEmpty())
            return 0;
        return Integer.parseInt(number);
    }
}
