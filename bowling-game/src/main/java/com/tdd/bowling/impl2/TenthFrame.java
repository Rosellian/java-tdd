package com.tdd.bowling.impl2;

public class TenthFrame implements Frame{
    private int first = -1,  second = -1, third = -1;

    @Override
    public void roll(int pins) {
        if(isComplete()){
            throw new IllegalStateException();
        }
        if(pins > 10) {
            throw new IllegalArgumentException();
        }

        if(first == -1){
            first = pins;
        }
        else if(second == -1){
            if(!isStrike() && first + pins > 10) {
                throw new IllegalArgumentException();
            }
            second = pins;
        }
        else if(third == -1){
            if(!isSpare() && second != 10 && second + pins > 10){
                throw new IllegalArgumentException();
            }
            third = pins;
        }
    }

    @Override
    public boolean isComplete() {
        if(isStrike()){
            return second != -1 &&  third != -1;
        }
        if(isSpare()){
            return third != -1;
        }
        return first != -1 && second != -1;
    }

    @Override
    public int baseScore() {
        return first + second
                + (third != -1 ? third : 0);
    }

    @Override
    public int bonusRollsNeeded() {
        return 0;
    }

    public boolean isSpare() {
        return !isStrike() && first + second == 10;
    }

    public boolean isStrike() {
        return first == 10;
    }
}
