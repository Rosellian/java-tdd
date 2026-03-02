import java.util.ArrayList;
import java.util.List;

public class Game {
    private List<Integer> rolls;

    public Game() {
        rolls = new ArrayList<>();
    }

    public void roll(int pins) {
        rolls.add(pins);
    }

    public int score() {
        int score = 0, frameScore = 0;
        boolean spare = false;
        for (int i = 0 ; i < rolls.size(); i++) {
            int rollScore = rolls.get(i);

            if(spare) {
                score += rollScore * 2;
                spare = false;
            }
            else {
                score += rollScore;
            }
            frameScore += rollScore;

            if((i+1) % 2 == 0) {
                if(frameScore >= 10) {
                    spare = true;
                }
                frameScore = 0;
            }
        }

        return score;
    }
}
