package com.tdd.bowling.impl2;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class NormalFrameTest {

    @Test
    void normalFrameStoresTwoRollsAndCalculatesBaseScore() {
        NormalFrame frame = new NormalFrame();

        frame.roll(3);
        frame.roll(4);

        assertTrue(frame.isComplete());
        assertEquals(7, frame.baseScore());
    }

    @Test
    void normalFrameIdentifiesSpareAndRequiresOneBonusRoll() {
        NormalFrame frame = new NormalFrame();

        frame.roll(7);
        frame.roll(3); // spare

        assertTrue(frame.isSpare());
        assertEquals(1, frame.bonusRollsNeeded());
        assertTrue(frame.isComplete());
    }

    @Test
    void normalFrameIdentifiesStrikeAndRequiresTwoBonusRolls() {
        NormalFrame frame = new NormalFrame();

        frame.roll(10); // strike

        assertTrue(frame.isStrike());
        assertEquals(2, frame.bonusRollsNeeded());
        assertTrue(frame.isComplete()); // strike avslutar framen direkt
    }

    @Test
    void normalFrameDoesNotAllowRollAfterCompletion() {
        NormalFrame frame = new NormalFrame();

        frame.roll(4);
        frame.roll(6); // spare → frame complete

        assertTrue(frame.isComplete());

        assertThrows(IllegalStateException.class, () -> frame.roll(1));
    }

    @Test
    void normalFrameDoesNotAllowPinCountAboveTenAcrossTwoRolls() {
        NormalFrame frame = new NormalFrame();

        frame.roll(7);

        assertThrows(IllegalArgumentException.class, () -> frame.roll(4));
    }

    @Test
    void normalFrameReportsCorrectStateInAllScenarios() {
        // Normal frame
        NormalFrame open = new NormalFrame();
        open.roll(3);
        open.roll(5);
        assertEquals(8, open.baseScore());
        assertFalse(open.isStrike());
        assertFalse(open.isSpare());
        assertEquals(0, open.bonusRollsNeeded());

        // Spare
        NormalFrame spare = new NormalFrame();
        spare.roll(6);
        spare.roll(4);
        assertEquals(10, spare.baseScore());
        assertFalse(spare.isStrike());
        assertTrue(spare.isSpare());
        assertEquals(1, spare.bonusRollsNeeded());

        // Strike
        NormalFrame strike = new NormalFrame();
        strike.roll(10);
        assertEquals(10, strike.baseScore());
        assertTrue(strike.isStrike());
        assertFalse(strike.isSpare());
        assertEquals(2, strike.bonusRollsNeeded());
    }
}
