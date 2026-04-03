package com.tdd;

import com.tdd.api.samples.*;
import org.junit.jupiter.api.Test;

import static com.tdd.TestUtils.scanStandardInput;
import static com.tdd.api.samples.SKUs.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class RulesetTest {

    @Test
    public void defaultRulesetStandardInput() {
        runForStandardInput(DefaultRules.build(), createDefaultStandardExpected());
    }

    @Test
    public void CampaignARulesetStandardOutput() {
        runForStandardInput(CampaignARules.build(), createCampaignAStandardExpected());
    }

    @Test
    public void CampaignBRulesetStandardInput() {
        runForStandardInput(CampaignBRules.build(), createCampaignBExpected());
    }

    @Test
    public void NoCrossNoDiscountStandardInput() {
        runForStandardInput(NoCrossNoSkuDiscount.build(), createNoCrossNoSkuDiscountStandardExpected());
    }

    private void runForStandardInput(PricingRules rules, int expectedPrice) {
        Checkout checkout = new Checkout(rules);

        scanStandardInput(checkout);

        assertEquals(expectedPrice, checkout.total());
    }

    private int createNoCrossNoSkuDiscountStandardExpected() {
        return 100 + 2 * A.unitPrice //A: 3-for-100(1 free) + 2-for-unitPrice
                + 40 + 70 //B: 2-for-40(1 free) + 2-for-70
                + 75 //C: 2-for-unitPrice + 1-at-50%
                + 2 * D.unitPrice //D: 2-for-unitPrice
                + E.unitPrice; //E:
                // 435
    }

    private int createDefaultStandardExpected() {
        return 130 + 2*50 //A: 3-for-130 + 2-for-unitPrice
                + 40 + 2*40 //B: 2-for-40(1 free) + 2-for-unitPrice
                + 3*25 //C: 3-for-unitPrice
                + 2*20 //D: 2-for-unitPrice
                + 10; //E:
                // 475
    }

    private int createCampaignAStandardExpected() {
        return 180 //A: 5-for-180
                + 40 + 2 * B.unitPrice //B: 2-for-40(1 free) + 2-for-unitPrice
                + 22 + 2 * C.unitPrice //C: 1-at-10%-discount + 2-for-unitPrice
                + 10 + D.unitPrice //D: 1-at-50% + 1-for-unitPrice
                + E.unitPrice; //E:
                // 412
    }

    private int createCampaignBExpected() {
        return 130 + 2 * A.unitPrice //A: 3-for-130 + 2-for-unitPrice
                + 30 + 40 + B.unitPrice //B: 1-at-25%-discount + 2-for-40(1 free) + 1-for-unitPrice
                + 3 * C.unitPrice //C: 3-for-unitPrice
                + 16 + D.unitPrice //D: 1-at-20%-discount + 1-for-unitPrice
                + 54; //E: 1-at-10%-discount (unitPrice: 60)
                // 505
    }
}
