package com.tdd.bowling.impl2;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class BowlingGameTest {

    @Test
    void perfectGameScores300() {
        BowlingGame game = new BowlingGame();

        for (int i = 0; i < 12; i++) {
            game.roll(10);
        }

        assertTrue(game.isComplete());
        assertEquals(300, game.score());
    }

    @Test
    void gutterGameScoresZero() {
        BowlingGame game = new BowlingGame();

        for (int i = 0; i < 20; i++) {
            game.roll(0);
        }

        assertTrue(game.isComplete());
        assertEquals(0, game.score());
    }

    @Test
    void mixedGameScoresCorrectly() {
        BowlingGame game = new BowlingGame();

        // Frame 1: 1 + 4 = 5
        game.roll(1);
        game.roll(4);

        // Frame 2: 4 + 5 = 9
        game.roll(4);
        game.roll(5);

        // Frame 3: spare (6 + 4)
        game.roll(6);
        game.roll(4);

        // Frame 4: 5 + 3 = 8
        game.roll(5);
        game.roll(3);

        // Frame 5: strike
        game.roll(10);

        // Frame 6: 0 + 1 = 1
        game.roll(0);
        game.roll(1);

        // Frame 7: spare (7 + 3)
        game.roll(7);
        game.roll(3);

        // Frame 8: spare (6 + 4)
        game.roll(6);
        game.roll(4);

        // Frame 9: strike
        game.roll(10);

        // Frame 10: spare (2 + 8), bonus 6
        game.roll(2);
        game.roll(8);
        game.roll(6);

        assertTrue(game.isComplete());
        assertEquals(121, game.score());
    }

    @Test
    void gameDoesNotAdvanceBeyondTenthFrame() {
        BowlingGame game = new BowlingGame();

        // 9 open frames
        for (int i = 0; i < 9; i++) {
            game.roll(3);
            game.roll(4);
        }

        // Frame 10: open frame
        game.roll(2);
        game.roll(7);

        assertTrue(game.isComplete());
        assertEquals(10, game.currentFrameIndex());

        assertThrows(IllegalStateException.class, () -> game.roll(5));
    }
}