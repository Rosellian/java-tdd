package com.tdd;

public record RuleResult(boolean applied, RuleContext newContext) {}