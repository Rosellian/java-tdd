package com.tdd.engine.utility;

import java.util.function.BiFunction;

public record SkuMod(
        int free,
        int discounted,
        double rate
){

    static BiFunction<SkuMod, SkuMod, SkuMod> skuModRemapper = (oldMod, newMod) ->
            new SkuMod(oldMod.free() + newMod.free(),
                    oldMod.discounted() + newMod.discounted(),
                    Math.min(oldMod.rate(), newMod.rate()));
}