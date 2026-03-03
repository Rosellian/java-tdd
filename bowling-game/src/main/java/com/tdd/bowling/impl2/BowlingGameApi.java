package com.tdd.bowling.impl2;

public interface BowlingGameApi {
    void roll(int pins);
    int score();
    boolean isComplete();
    int currentFrameIndex();
}