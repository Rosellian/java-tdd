import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class BowlingGameTest {
    private Game game;

    @BeforeEach
    void setUp() {game =  new Game();}

    @Test
    void gutterGameScoresZero() {
        rollMany(game, 20, 0);
        assertEquals(0, game.score());
    }

    @Test
    void allOnesScoreTwenty() {
        rollMany(game, 20, 1);
        assertEquals(20, game.score());
    }

    private void rollMany(Game game, int rolls, int pins) {
        for (int i = 0; i < rolls; i++) {
            game.roll(pins);
        }
    }
}