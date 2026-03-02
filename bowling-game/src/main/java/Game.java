import java.util.ArrayList;
import java.util.List;

public class Game {
    private List<Frame> frames;
    private Frame currentFrame;

    public Game() {
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
        Frame lastFrame = frames.getFirst();
        int score = lastFrame.getScore(false, false);

        for(int i = 1; i < frames.size(); i++) {
            Frame frame = frames.get(i);
            System.out.println(lastFrame);
            score += frame.getScore(lastFrame.isStrike(), lastFrame.isSpare());
            lastFrame = frame;
        }

        return score;
    }
}
