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
        return rolls.stream().mapToInt(Integer::intValue)
                .sum();
    }
}
