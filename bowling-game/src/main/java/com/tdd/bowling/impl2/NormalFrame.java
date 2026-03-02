package com.tdd.bowling.impl2;

public class NormalFrame implements Frame{
    private int first = -1, second = -1;

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
        return first + second;
    }

    @Override
    public int bonusRollsNeeded() {
        if(isStrike()) {
            return 2;
        }
        else if(isSpare()){
            return 1;
        }
        return 0;
    }

    public boolean isSpare() {
        return !isStrike() && baseScore() == 10;
    }

    public boolean isStrike() {
        return first == 10;
    }
}
