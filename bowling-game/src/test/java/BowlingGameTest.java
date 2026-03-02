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

    @Test
    void oneSpareAddsNextRollAsBonus() {
        game.roll(5);
        game.roll(5);   // spare

        game.roll(3);   // bonus shall be counted here

        rollMany(game, 17, 0);

        assertEquals(16, game.score()); // 10 + 3 + 3
    }

    @Test
    void oneStrikeAddsNextTwoRollsAsBonus() {
        game.roll(10);   // strike

        game.roll(3);
        game.roll(4);    // bonus shall be counted here

        rollMany(game, 16, 0);

        assertEquals(24, game.score()); // 10 + 3 + 4 + 3 + 4
    }

    @Test
    void perfectGameScores300() {
        rollMany(game, 12, 10); // 12 strikes

        assertEquals(300, game.score());
    }

    private void rollMany(Game game, int rolls, int pins) {
        for (int i = 0; i < rolls; i++) {
            game.roll(pins);
        }
    }
}