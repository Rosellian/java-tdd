package com.tdd.hospital.patients.factory;

import com.tdd.hospital.api.patients.Specs;
import com.tdd.hospital.patients.VitalSigns;

import java.util.Random;

public class VitalsFactory {
    private final Random random;

    public VitalsFactory(Random random) {
        this.random = random;
    }

    public VitalSigns createVitals(Specs specs) {
        int oxygenSaturation = getOxygenSaturation(specs);

        return new VitalSigns(randomHeartRate(), randomSystolicBP(), randomDiastolicBP(), oxygenSaturation,
                randomTemperature());
    }

    private int randomHeartRate() {
        return randomBetween(50, 150);
    }

    private int randomSystolicBP() {
        return randomBetween(80, 180);
    }

    private int randomDiastolicBP() {
        return randomBetween(40, 120);
    }

    private int getOxygenSaturation(Specs specs) {
        int oxy = specs.oxygenSaturation();

        return oxy > 0 ? oxy : randomOxygenSaturation();
    }
    private int randomOxygenSaturation() {
        return randomBetween(70, 100);
    }

    private int randomBetween(int min, int max) {
        return random.nextInt(max - min + 1) + min;
    }

    private double randomTemperature() {
        return randomBetweenDouble(35.0, 41.0);
    }

    private double randomBetweenDouble(double min, double max) {
        double raw = min + (max - min) * random.nextDouble();

        return Math.round(raw * 100.0) / 100.0;
    }
}
