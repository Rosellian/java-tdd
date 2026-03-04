package com.tdd.bowling.impl2;

import java.util.stream.IntStream;

public interface Frame {
    void roll(int pins);
    boolean isComplete();
    int baseScore();
    int bonusRollsNeeded();
    boolean isStrike();
    boolean isSpare();
    int bonusScore();
    void addBonus(int bonus);

    IntStream getRolls();
}