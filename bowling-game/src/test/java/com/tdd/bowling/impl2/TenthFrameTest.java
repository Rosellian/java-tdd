package com.tdd.bowling.impl2;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class TenthFrameTest {
    private TenthFrame frame;

    @BeforeEach
    public void setUp() {frame = new TenthFrame();}

    @Test
    void tenthFrameAllowsTwoRollsWhenNoStrikeOrSpare() {
        frame.roll(3);
        frame.roll(5);

        assertTrue(frame.isComplete());
        assertEquals(8, frame.baseScore());
        assertEquals(0, frame.bonusRollsNeeded());

        assertThrows(IllegalStateException.class, () -> frame.roll(1));
    }

    @Test
    void tenthFrameAllowsThirdRollAfterSpare() {
        frame.roll(7);
        frame.roll(3);   // spare

        assertFalse(frame.isComplete()); // extra throw left

        frame.roll(5);   // bonus throw

        assertTrue(frame.isComplete());
        assertEquals(15, frame.baseScore()); // 7 + 3 + 5
        assertEquals(0, frame.bonusRollsNeeded()); // tenth frame has no external bonuses
    }

    @Test
    void tenthFrameAllowsTwoBonusRollsAfterStrike() {
        frame.roll(10);   // strike

        assertFalse(frame.isComplete()); // two throws left

        frame.roll(7);
        frame.roll(2);

        assertTrue(frame.isComplete());
        assertEquals(19, frame.baseScore()); // 10 + 7 + 2
        assertEquals(0, frame.bonusRollsNeeded()); // tenth frame has no external bonuses
    }

    @Test
    void tenthFrameDoesNotAllowInvalidBonusRollsAfterStrike() {
        frame.roll(10);   // strike → two bonus throws

        frame.roll(6);    // first bonus throw, not strike

        assertThrows(IllegalArgumentException.class, () -> frame.roll(5));
    }

    @Test
    void tenthFrameAllowsTwoStrikesInBonusRolls() {
        frame.roll(10);   // strike in first throw

        frame.roll(10);   // first bonus throw – strike
        frame.roll(10);   // second bonus throw – strike

        assertTrue(frame.isComplete());
        assertEquals(30, frame.baseScore()); // 10 + 10 + 10
        assertEquals(0, frame.bonusRollsNeeded());
    }

    @Test
    void tenthFrameAllowsStrikeThenStrikeThenOpenBonusRoll() {
        frame.roll(10);   // strike in first throw
        frame.roll(10);   // strike in first bonus throw
        frame.roll(7);    // second bonus throw, open

        assertTrue(frame.isComplete());
        assertEquals(27, frame.baseScore()); // 10 + 10 + 7
        assertEquals(0, frame.bonusRollsNeeded());
    }

    @Test
    void tenthFrameAllowsStrikeThenOpenThenOpenBonusRolls() {
        frame.roll(10);   // strike in first throw

        frame.roll(4);    // first bonus throw, open
        frame.roll(5);    // second bonus throw, open

        assertTrue(frame.isComplete());
        assertEquals(19, frame.baseScore()); // 10 + 4 + 5
        assertEquals(0, frame.bonusRollsNeeded());
    }

    @Test
    void tenthFrameAllowsStrikeThenOpenThenSpareInBonusRolls() {
        frame.roll(10);   // strike in first throw

        frame.roll(4);    // first bonus throw, open
        frame.roll(6);    // second bonus throw, spare (4 + 6 = 10)

        assertTrue(frame.isComplete());
        assertEquals(20, frame.baseScore()); // 10 + 4 + 6
        assertEquals(0, frame.bonusRollsNeeded());
    }

    @Test
    void tenthFrameNeverAllowsMoreThanThreeRolls() {
        frame.roll(10);   // strike → two bonus throws
        frame.roll(10);   // bonus 1
        frame.roll(10);   // bonus 2

        assertTrue(frame.isComplete());

        assertThrows(IllegalStateException.class, () -> frame.roll(1));
    }

    @Test
    void tenthFrameDoesNotAllowPinCountAboveTenInFirstTwoRollsUnlessStrike() {
        frame.roll(7);

        assertThrows(IllegalArgumentException.class, () -> frame.roll(5));
    }

    @Test
    void tenthFrameAllowsSpareInFirstTwoRollsAndOneBonusRoll() {
        frame.roll(6);
        frame.roll(4);   // spare

        assertFalse(frame.isComplete()); // bonus throw left

        frame.roll(7);   // bonus throw

        assertTrue(frame.isComplete());
        assertEquals(17, frame.baseScore()); // 6 + 4 + 7
        assertEquals(0, frame.bonusRollsNeeded());
    }

    @Test
    void tenthFrameDoesNotAllowMoreThanOneBonusRollAfterSpare() {
        frame.roll(6);
        frame.roll(4);   // spare → one bonus throw allowed

        frame.roll(7);   // bonus throw

        assertTrue(frame.isComplete());

        assertThrows(IllegalStateException.class, () -> frame.roll(1));
    }

    @Test
    void tenthFrameDoesNotAllowBonusRollAboveTenAfterSpare() {
        frame.roll(6);
        frame.roll(4);   // spare → one bonus throw allowed

        assertThrows(IllegalArgumentException.class, () -> frame.roll(11));
    }

    @Test
    void tenthFrameCalculatesBaseScoreCorrectlyInAllScenarios() {
        // Open frame
        TenthFrame open = new TenthFrame();
        open.roll(3);
        open.roll(5);
        assertTrue(open.isComplete());
        assertEquals(8, open.baseScore());

        // Spare
        TenthFrame spare = new TenthFrame();
        spare.roll(6);
        spare.roll(4);   // spare
        spare.roll(7);   // bonus
        assertTrue(spare.isComplete());
        assertEquals(17, spare.baseScore());

        // Strike
        TenthFrame strike = new TenthFrame();
        strike.roll(10);
        strike.roll(10);
        strike.roll(7);
        assertTrue(strike.isComplete());
        assertEquals(27, strike.baseScore());
    }
}
