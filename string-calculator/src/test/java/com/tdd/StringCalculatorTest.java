package com.tdd;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class StringCalculatorTest {
    private StringCalculator stringCalculator;

    @BeforeEach
    void setUp() {
        stringCalculator = new StringCalculator();
    }

    @Test
    void emptyStringReturnsZero() {
        int result = stringCalculator.add("");
        assertEquals(0, result);
    }

    @Test
    void singleNumberReturnsItsValue() {
        int result = stringCalculator.add("5");
        assertEquals(5, result);
    }

    @Test
    void twoNumbersSeparatedByCommaAreSummed() {
        int result = stringCalculator.add("1,2");
        assertEquals(3, result);
    }
}