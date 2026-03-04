package com.tdd.bowling.impl2;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class GameTest {
    private FrameFactory factory;
    private Game game;

    @BeforeEach
    public void setUp() {
        factory = new FrameFactory();
        game = new GameImpl2(factory);
    }

    @Test
    void frameFactoryCreatesCorrectFrameTypes() {
        for (int i = 1; i <= 9; i++) {
            Frame frame = factory.createFrame(i);
            assertInstanceOf(NormalFrame.class, frame, "Frame " + i + " should be NormalFrame");
        }

        Frame tenth = factory.createFrame(10);
        assertInstanceOf(TenthFrame.class, tenth, "Frame 10 should be TenthFrame");
    }

    @Test
    void gameStartsAtFrameOneAndAdvancesWhenFrameIsComplete() {
        // Frame 1: open frame
        game.roll(3);
        game.roll(4);

        assertEquals(1, game.currentFrameIndex());
        assertTrue(game.currentFrame().isComplete());

        // After completion the game shall continue to frame 2
        game.roll(5); // first throw in frame 2

        assertEquals(2, game.currentFrameIndex());
        assertFalse(game.currentFrame().isComplete());
        assertInstanceOf(NormalFrame.class, game.currentFrame());
    }

    @Test
    void gameDoesNotAdvanceBeyondTenthFrame() {
        // Play through 9 frames (open frames for simplicity)
        for (int i = 1; i <= 9; i++) {
            game.roll(3);
            game.roll(4);
        }

        game.roll(2);// start tenth frame
        assertInstanceOf(TenthFrame.class, game.currentFrame());
        assertEquals(10, game.currentFrameIndex());

        // Finish tenth frame (open frame)
        game.roll(7);

        assertTrue(game.currentFrame().isComplete());
        assertEquals(10, game.currentFrameIndex());

        // Try to roll after the game has ended
        assertThrows(IllegalStateException.class, () -> game.roll(5));
    }

    @Test
    void gameCalculatesScoreForAllOpenFrames() {
        // 10 open frames: (3 + 4) * 10 = 70
        for (int i = 0; i < 10; i++) {
            game.roll(3);
            game.roll(4);
        }

        assertTrue(game.isComplete());
        assertEquals(70, game.score());
    }

    @Test
    void gameAddsSpareBonusCorrectly() {
        // Frame 1: spare (6 + 4)
        game.roll(6);
        game.roll(4);

        // Frame 2: first throw gives bonus to frame 1
        game.roll(7);
        game.roll(2);

        // Frame 1 score = 10 + 7 = 17
        // Frame 2 score = 7 + 2 = 9
        // Total = 26
        assertEquals(26, game.score());
    }

    @Test
    void gameAddsStrikeBonusCorrectly() {
        // Frame 1: strike
        game.roll(10);

        // Frame 2: two throw which shall become bonus to frame 1
        game.roll(3);
        game.roll(4);

        // Frame 1 score = 10 + 3 + 4 = 17
        // Frame 2 score = 3 + 4 = 7
        // Total = 24
        assertEquals(24, game.score());
    }

    @Test
    void gameAddsDoubleStrikeBonusCorrectly() {
        // Frame 1: strike
        game.roll(10);

        // Frame 2: strike
        game.roll(10);

        // Frame 3: two throws which shall become bonus to frame 2
        game.roll(3);
        game.roll(4);

        // Frame 1 score = 10 + 10 + 3 = 23
        // Frame 2 score = 10 + 3 + 4 = 17
        // Frame 3 score = 3 + 4 = 7
        // Total = 47
        assertEquals(47, game.score());
    }

    @Test
    void gameAddsTurkeyBonusCorrectly() {
        // Frame 1: strike
        game.roll(10);

        // Frame 2: strike
        game.roll(10);

        // Frame 3: strike
        game.roll(10);

        // Frame 4: two throws which shall become bonus to frame 3
        game.roll(3);
        game.roll(4);

        // Frame 1 score = 10 + 10 + 10 = 30
        // Frame 2 score = 10 + 10 + 3 = 23
        // Frame 3 score = 10 + 3 + 4 = 17
        // Frame 4 score = 3 + 4 = 7
        // Total = 77
        assertEquals(77, game.score());
    }

    @Test
    void gameAddsStrikeThenSpareBonusCorrectly() {
        // Frame 1: strike
        game.roll(10);

        // Frame 2: spare (6 + 4)
        game.roll(6);
        game.roll(4);

        // Frame 3: first throw gives bonus to frame 2
        game.roll(7);
        game.roll(2);

        // Frame 1 score = 10 + 6 + 4 = 20
        // Frame 2 score = 10 + 7 = 17
        // Frame 3 score = 7 + 2 = 9
        // Total = 46
        assertEquals(46, game.score());
    }

    @Test
    void gameAddsStrikeBonusFromFrameNineIntoTenthFrameCorrectly() {
        // Frame 1–8: open frames (3 + 4)
        for (int i = 0; i < 8; i++) {
            game.roll(3);
            game.roll(4);
        }

        // Frame 9: strike
        game.roll(10);

        // Frame 10: 7 + 2 (open frame)
        game.roll(7);
        game.roll(2);

        // Frame 1–8: 8 * 7 = 56
        // Frame 9: 10 + 7 + 2 = 19
        // Frame 10: 7 + 2 = 9
        // Total = 56 + 19 + 9 = 84
        assertEquals(84, game.score());
    }

    @Test
    void perfectGameScoresThreeHundred() {
        // 12 strikes
        for (int i = 0; i < 12; i++) {
            game.roll(10);
        }

        assertTrue(game.isComplete());
        assertEquals(300, game.score());
    }

    @Test
    void gutterGameScoresZero() {
        // 20 throws, all 0
        for (int i = 0; i < 20; i++) {
            game.roll(0);
        }

        assertTrue(game.isComplete());
        assertEquals(0, game.score());
    }

    @Test
    void mixedGameScoresCorrectly() {
        // Frame 1: 1 + 4 = 5
        game.roll(1);
        game.roll(4);

        // Frame 2: 4 + 5 = 9
        game.roll(4);
        game.roll(5);

        // Frame 3: spare (6 + 4)
        game.roll(6);
        game.roll(4);

        // Frame 4: 5 + 3 = 8 (first roll gives bonus to frame 3)
        game.roll(5);
        game.roll(3);

        // Frame 5: strike
        game.roll(10);

        // Frame 6: 0 + 1 = 1 (both rolls give bonus to frame 5)
        game.roll(0);
        game.roll(1);

        // Frame 7: 7 + 3 = spare
        game.roll(7);
        game.roll(3);

        // Frame 8: 6 + 4 = spare
        game.roll(6);
        game.roll(4);

        // Frame 9: strike
        game.roll(10);

        // Frame 10: 2 + 8 = spare, bonus 6
        game.roll(2);
        game.roll(8);
        game.roll(6);

        // Expected scoring:
        // 1: 5
        // 2: 9
        // 3: 10 + 5 = 15
        // 4: 8
        // 5: 10 + 0 + 1 = 11
        // 6: 1
        // 7: 10 + 6 = 16
        // 8: 10 + 10 = 20
        // 9: 10 + 2 + 8 = 20
        // 10: 10 + 6 = 16
        // Total = 121

        assertTrue(game.isComplete());
        assertEquals(121, game.score());
    }

    @Test
    void randomCompleteGameScoresCorrectly() {
        // Frame 1: 8 + 1 = 9
        game.roll(8);
        game.roll(1);

        // Frame 2: strike
        game.roll(10);

        // Frame 3: 7 + 3 = spare
        game.roll(7);
        game.roll(3);

        // Frame 4: 4 + 2 = 6 (first roll gives bonus to frame 3)
        game.roll(4);
        game.roll(2);

        // Frame 5: 9 + 0 = 9
        game.roll(9);
        game.roll(0);

        // Frame 6: strike
        game.roll(10);

        // Frame 7: strike
        game.roll(10);

        // Frame 8: 5 + 4 = 9 (both rolls give bonus to frame 7)
        game.roll(5);
        game.roll(4);

        // Frame 9: 6 + 4 = spare
        game.roll(6);
        game.roll(4);

        // Frame 10: 3 + 7 = spare, bonus 8
        game.roll(3);
        game.roll(7);
        game.roll(8);

        // Scoring breakdown:
        // 1: 9
        // 2: 10 + 7 + 3 = 20
        // 3: 10 + 4 = 14
        // 4: 6
        // 5: 9
        // 6: 10 + 10 + 5 = 25
        // 7: 10 + 5 + 4 = 19
        // 8: 9
        // 9: 10 + 3 = 13
        // 10: 10 + 8 = 18
        // Total = 142

        assertTrue(game.isComplete());
        assertEquals(142, game.score());
    }

    @Test
    void returnsCurrentRolls() {
        game.roll(1);
        game.roll(2);

        assertEquals(List.of(1,2), game.getRolls());

        game.roll(3);
        game.roll(4);
        assertEquals(List.of(1,2,3,4), game.getRolls());

        game.roll(5);
        assertEquals(List.of(1,2,3,4,5), game.getRolls());
    }
}