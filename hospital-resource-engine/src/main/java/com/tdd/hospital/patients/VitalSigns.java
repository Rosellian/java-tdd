package com.tdd.hospital.patients;

public record VitalSigns(
        int heartRate,
        int systolicBP,
        int diastolicBP,
        int oxygenSaturation,
        double temperature
) {

    public VitalSigns withHeartRate(int heartRate) {
        return new VitalSigns(heartRate, this.systolicBP, this.diastolicBP, this.oxygenSaturation, this.temperature);
    }

    public VitalSigns withSystolicBP(int systolicBP) {
        return new VitalSigns(this.heartRate, systolicBP, this.diastolicBP, this.oxygenSaturation, this.temperature);
    }

    public VitalSigns withDiastolicBP(int diastolicBP) {
        return new VitalSigns(this.heartRate, this.systolicBP, diastolicBP, this.oxygenSaturation, this.temperature);
    }

    public VitalSigns withOxygenSaturation(int oxygenSaturation) {
        return new VitalSigns(this.heartRate, this.systolicBP, this.diastolicBP, oxygenSaturation, this.temperature);
    }

    public VitalSigns withTemperature(double temperature) {
        return new VitalSigns(this.heartRate, this.systolicBP, this.diastolicBP, this.oxygenSaturation, temperature);
    }
}
