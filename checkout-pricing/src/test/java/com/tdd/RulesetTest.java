package com.tdd;

import com.tdd.api.samples.CampaignARules;
import com.tdd.api.samples.CampaignBRules;
import com.tdd.api.samples.DefaultRules;
import org.junit.jupiter.api.Test;

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

    private void runForStandardInput(PricingRules rules, int expectedPrice) {
        Checkout checkout = new Checkout(rules);

        scanStandardInput(checkout);

        assertEquals(expectedPrice, checkout.total());
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
                + 10 + 40 + B.unitPrice //B: 1-at-25% + 2-for-40(1 free) + 1-for-unitPrice
                + 3 * C.unitPrice //C: 3-for-unitPrice
                + 16 + D.unitPrice //D: 1-at-20%-discount + 1-for-unitPrice
                + 54; //E: 1-at-10%-discount (unitPrice: 60)
                // 485
    }

    private void scanStandardInput(Checkout checkout) {
        scanProduct(checkout, "A", 5);
        scanProduct(checkout, "B", 4);
        scanProduct(checkout, "C", 3);
        scanProduct(checkout, "D", 2);
        scanProduct(checkout, "E", 1);
    }

    private void scanProduct(Checkout checkout, String sku, int n) {
        for(int i = 0; i < n; i++) {
            checkout.scan(sku);
        }
    }
}
