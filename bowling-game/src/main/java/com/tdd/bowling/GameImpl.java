package com.tdd.bowling;

import java.util.ArrayList;
import java.util.List;

public class GameImpl implements Game {
    private List<Frame> frames;
    private Frame currentFrame;

    public GameImpl() {
        frames = new ArrayList<>();
    }

    public void roll(int pins) {
        if (currentFrame == null) {
            currentFrame = new Frame();
        }

        currentFrame.addRoll(pins);

        if (currentFrame.isDone()) {
            frames.add(currentFrame);
            currentFrame = null;
        }
    }

    public int score() {
        Frame lastFrame = frames.getFirst(), lastLastFrame = null;
        int score = lastFrame.getScore();

        for(int i = 1; i < frames.size(); i++) {
            Frame frame = frames.get(i);
            if(i < 10){
                score += frame.getScore(lastFrame,  lastLastFrame);
            }
            else if(i == 10){
                score += frame.getScore(lastFrame, null);
            }
            else {
                score += frame.getScore();
            }

            lastLastFrame = lastFrame;
            lastFrame = frame;
        }

        return score;
    }
}
