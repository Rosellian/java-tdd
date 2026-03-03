package com.tdd.bowling.impl2;

public class FrameFactory {

    public Frame createFrame(int frameNumber) {
        if(frameNumber < 1 || frameNumber > 10){
            throw new IllegalArgumentException();
        }

        return frameNumber == 10 ? new TenthFrame() : new NormalFrame();
    }
}