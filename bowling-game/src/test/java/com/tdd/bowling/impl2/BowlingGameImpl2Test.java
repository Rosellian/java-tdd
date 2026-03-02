package com.tdd.bowling.impl2;

import com.tdd.bowling.BowlingGameTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class BowlingGameImpl2Test extends BowlingGameTest {

    @BeforeEach
    @Override
    public void setUp() {
        game = new GameImpl2();
    }
}
