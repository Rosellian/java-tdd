package com.tdd.bowling.impl2.api;

import com.tdd.bowling.impl2.BowlingGame;

import java.util.List;

public record GameState(int score, int frame, boolean complete, List<Integer> rolls) {
    public GameState(BowlingGame game) {
        this(game.score(), game.currentFrameIndex(), game.isComplete(), game.getRolls());
    }
}