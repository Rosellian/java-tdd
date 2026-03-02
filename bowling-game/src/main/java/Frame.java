import java.util.ArrayList;
import java.util.List;

public class Frame {
    private List<Integer> rolls;
    private boolean strike, spare, done;

    public Frame() {
        rolls = new ArrayList<>();
    }

    public List<Integer> getRolls() {
        return rolls;
    }

    public void addRoll(int roll) {
        if (roll == 10) {
            strike = true;
            this.done = true;
        }

        rolls.add(roll);
        if(rolls.size()==2) {
            this.done = true;
        }

        if (!isStrike() && getScore(1) == 10) {
            spare = true;
        }
    }

    public int getScore(Frame... prevFrame) {
        if(prevFrame.length == 0){
            return getScore(1);
        }

        return rolls.getFirst() * getFirstMultiplier(prevFrame) +
                (rolls.size() == 1 ? 0 : rolls.get(1) * getSecondMultiplier(prevFrame));
    }

    private int getSecondMultiplier(Frame[] prevFrames) {
        int multiplier = 1;
        multiplier += prevFrames[0].strike || prevFrames[0].spare ? 1 : 0;
        multiplier += prevFrames[1] != null && prevFrames[1].strike  ? 1 : 0;

        return multiplier;
    }

    private int getFirstMultiplier(Frame[] prevFrames) {
        int multiplier = 1;
        multiplier += prevFrames[0].spare || prevFrames[0].strike ? 1 : 0;
        multiplier += prevFrames[1] != null && prevFrames[1].strike  ? 1 : 0;

        return multiplier;
    }

    private int getScore(int multiplier) {
        return rolls.stream().map(i -> i * multiplier)
                .reduce(0, Integer::sum);
    }

    public boolean isSpare() {
        return spare;
    }

    public boolean isStrike() {
        return strike;
    }

    public boolean isDone() {
        return done;
    }

    @Override
    public String toString() {
        return "Frame{" +
                "rolls=" + rolls +
                ", strike=" + strike +
                ", spare=" + spare +
                ", done=" + done +
                '}';
    }
}
