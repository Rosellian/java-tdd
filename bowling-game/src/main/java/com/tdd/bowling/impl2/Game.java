package com.tdd.bowling.impl2;

import java.util.List;

public interface Game {

    void roll(int pins);

    int score();

    Frame currentFrame();

    int currentFrameIndex();

    boolean isComplete();

    List<Integer> getRolls();
}
