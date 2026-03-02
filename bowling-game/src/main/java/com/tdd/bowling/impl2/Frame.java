package com.tdd.bowling.impl2;

public interface Frame {
    void roll(int pins);
    boolean isComplete();
    int baseScore();
    int bonusRollsNeeded();
}