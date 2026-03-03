package com.tdd.bowling.impl2;

public interface Game {

    void roll(int pins);

    int score();

    Frame currentFrame();

    int currentFrameIndex();

    boolean isComplete();
}
