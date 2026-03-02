package com.tdd.bowling.impl2;

import com.tdd.bowling.Game;

public class GameImpl2 implements Game {
    private final int[] rolls = new int[21];
    private int currentRoll = 0;

    @Override
    public void roll(int pins) {
        rolls[currentRoll++] = pins;
    }

    @Override
    public int score() {
        int score = 0, rollIndex = 0;

        for(int frame = 0; frame < 10; frame++) {
            if(isStrike(rollIndex)) {
                score += 10 + strikeBonus(rollIndex);
                rollIndex++;
            }
            else if (isSpare(rollIndex)) {
                score += 10 + spareBonus(rollIndex);
                rollIndex += 2;
            }
            else {
                score += frameScore(rollIndex);
                rollIndex += 2;
            }
        }

        return score;
    }

    private int frameScore(int rollIndex) {
        return rolls[rollIndex] + rolls[rollIndex+1];
    }

    private int spareBonus(int rollIndex) {
        return rolls[rollIndex+2];
    }

    private int strikeBonus(int rollIndex) {
        return rolls[rollIndex+1] + rolls[rollIndex+2];
    }

    private boolean isSpare(int rollIndex) {
        return rolls[rollIndex] + rolls[rollIndex + 1] == 10;
    }

    private boolean isStrike(int rollIndex) {
        return rolls[rollIndex] == 10;
    }
}