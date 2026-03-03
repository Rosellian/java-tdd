package com.tdd.bowling.impl2.api;

import com.tdd.bowling.impl2.BowlingGame;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game")
public class BowlingApi {

    private BowlingGame game = new BowlingGame();

    @PostMapping("/roll")
    public GameState roll(@RequestParam("pins") int pins) {
        game.roll(pins);
        return new GameState(game);
    }

    @PostMapping("/reset")
    public GameState reset() {
        game = new BowlingGame();
        return new GameState(game);
    }

    @GetMapping
    public GameState state() {
        return new GameState(game);
    }

    record GameState(int score, int frame, boolean complete) {
        GameState(BowlingGame g) {
            this(g.score(), g.currentFrameIndex(), g.isComplete());
        }
    }
}