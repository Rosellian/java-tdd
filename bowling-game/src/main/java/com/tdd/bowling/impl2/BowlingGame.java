package com.tdd.bowling.impl2;

public class BowlingGame implements BowlingGameApi {

    private final Game game;

    public BowlingGame() {
        this.game = new GameImpl2(new FrameFactory());
    }

    public void roll(int pins) {
        game.roll(pins);
    }

    public int score() {
        return game.score();
    }

    public boolean isComplete() {
        return game.isComplete();
    }

    public int currentFrameIndex() {
        return game.currentFrameIndex();
    }
}