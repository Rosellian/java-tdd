package com.tdd.bowling.impl2;

import java.util.stream.IntStream;

public class NormalFrame implements Frame{
    private int first = -1, second = -1;
    private int bonusScore = 0, bonusRollsNeeded = 0;

    @Override
    public void roll(int pins) {
        if(isComplete()){
            throw new IllegalStateException();
        }
        if(first + pins > 10){
            throw new IllegalArgumentException();
        }

        if(first == -1){
            first = pins;
        }
        else if(second == -1){
            second = pins;
        }

        if(isStrike()){
            bonusRollsNeeded = 2;
        }
        else if(isSpare()){
            bonusRollsNeeded = 1;
        }
    }

    @Override
    public boolean isComplete() {
        return first == 10 || (first != -1 && second != -1);
    }

    @Override
    public int baseScore() {
        if(isStrike()){
            return first;
        }
        return Math.max(first, 0) + Math.max(second, 0);
    }

    @Override
    public int bonusRollsNeeded() {
        return bonusRollsNeeded;
    }

    @Override
    public int bonusScore() {
        return bonusScore;
    }

    @Override
    public void addBonus(int bonus) {
        bonusScore += bonus;
        bonusRollsNeeded--;
    }

    @Override
    public IntStream getRolls() {
        return IntStream.of(first, second).filter(i -> i > -1);
    }

    public boolean isSpare() {
        return !isStrike() && baseScore() == 10;
    }

    public boolean isStrike() {
        return first == 10;
    }
}
