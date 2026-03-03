package com.tdd.bowling.impl2.api;

import com.tdd.bowling.impl2.BowlingGame;

public record GameState(int score, int frame, boolean complete) {
    public GameState(BowlingGame game) {
        this(game.score(), game.currentFrameIndex(), game.isComplete());
    }
}