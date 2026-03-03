package com.tdd.bowling.impl2;

import java.util.ArrayList;
import java.util.List;

public class GameImpl2 implements Game {
    private final FrameFactory frameFactory;
    private final List<Frame> frames;
    private Frame currentFrame;
    private int currentFrameIndex;

    GameImpl2(FrameFactory frameFactory) {
        this.frameFactory = frameFactory;
        frames = new ArrayList<>();

        currentFrameIndex = 1;
        currentFrame = frameFactory.createFrame(currentFrameIndex);
        frames.add(currentFrame);
    }

    public Frame currentFrame() {
        return currentFrame;
    }

    @Override
    public int currentFrameIndex() {
        return currentFrameIndex;
    }

    @Override
    public boolean isComplete() {
        return currentFrameIndex == 10 && currentFrame.isComplete();
    }

    @Override
    public void roll(int pins) {
        if(isComplete()){
            throw new IllegalStateException();
        }

        if (currentFrame.isComplete() && currentFrameIndex < 10) {
            currentFrameIndex++;
            currentFrame = frameFactory.createFrame(currentFrameIndex);
            frames.add(currentFrame);
        }

        for(Frame frame : frames){
            if(frame.bonusRollsNeeded() > 0){
                frame.addBonus(pins);
            }
        }

        currentFrame.roll(pins);
    }

    @Override
    public int score() {
        return frames.stream().map(f -> f.baseScore() + f.bonusScore())
                .reduce(0, Integer::sum);
    }
}