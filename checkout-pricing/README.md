# Checkout Pricing Rules Kata
You will build a checkout system where every product has a price, but some have special prices or discounts.

**Domain vocabulary:**
- SKU - Stock Keeping Unit

---
**Sample rules:**
- A: 50kr, 3 for 130kr
- B: 30kr, 2 for 45kr
- C: 20kr
- D: 15kr

**You shall be able to:**
- Scan products in any order
- get the total price based on the rules
- Add new rules without changing the code
---
## Procedure
### Code:
**Main parts with minimal sample code:**
- `PricingRules`
```java
import java.util.Map;
import java.util.HashMap;

public class PricingRules {
    private final Map<String, Integer> unitPrices = new HashMap<>();
    
    public void addUnitPrice(String sku, int price) {
        unitPrices.put(unit, price);
    }
    
    public int getUnitPrice(String sku) {
        return unitPrices.get(unit);
    }
}
```
- `Checkout`
```java
import java.util.List;
import java.util.ArrayList;

public class Checkout {
    private final PricingRules rules;
    private final List<String> items = new ArrayList<>();
    
    public Checkout(PricingRules rules) {
        this.rules = rules;
    }
    
    public void scan(String sku) {
        items.add(unit);
    }
    
    public int total() {
        return 0;
    }
}
```
#### Additions:
Pricing Rules:
- `PricingRule`
```java
public interface PricingRule {
    int calculatePrice(List<String> items);
}
```
- `SpecialPrice`
```java
public record SpecialPrice(int quantity, int price) {}
```
- `BuyXGetYFree`
```java
public record BuyXGetYFree(int buy, int free) {}
```
Pricing Option:  
Can replace PricingRule interface.
- `PricingOption`
```java
public interface PricingOption {
    int price();      // what does this package cost?
    int quantity();   // how many items are consumed?
}
```
`SpecialPrice`
```java
public record SpecialPrice(int quantity, int price) implements PricingOption {}
```
`BuyXGetYFreeOption`
```java
public record BuyXGetYFreeOption(int quantity, int price) implements PricingOption {}
```
Priority and stackability rules:
- `PricingOption`, new version
```java
public interface PricingOption {
    int price();         // what does this package cost?
    int quantity();      // how many items are consumed?
    int priority();      // lower = higher priority
    boolean stackable();
}
```
Example rules to use:
- SpecialPrice is higher and stackable
- BuyXGetYFree is lower and not stackable
- BuyXGetYFree is stackable for product A, but not others.

---
### Test cases:
**Test 1:** one product, no special price
```java
@Test
    void scanningSingleItemReturnsItsPrice() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);

        Checkout checkout = new Checkout(rules);
        checkout.scan("A");

        assertEquals(50, checkout.total());
    }
```
**Test 2:** Special price for A
```java
@Test
void appliesThreeFor130SpecialPrice() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("A", 50);
    rules.addSpecialPrice("A", 3, 130);

    Checkout checkout = new Checkout(rules);
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");

    assertEquals(130, checkout.total());
}
```
**Test 3:** 2 for 45 for B
```java
@Test
void appliesTwoFor45SpecialPrice() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("B", 30);
    rules.addSpecialPrice("B", 2, 45);

    Checkout checkout = new Checkout(rules);
    checkout.scan("B");
    checkout.scan("B");

    assertEquals(45, checkout.total());
}
```
**Test 4:** Mixed products
```java
@Test
void calculatesTotalForMixedProductsWithSpecialPrices() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("A", 50);
    rules.addSpecialPrice("A", 3, 130);

    rules.addUnitPrice("B", 30);
    rules.addSpecialPrice("B", 2, 45);

    Checkout checkout = new Checkout(rules);

    checkout.scan("A");
    checkout.scan("B");
    checkout.scan("A");
    checkout.scan("B");
    checkout.scan("A");

    assertEquals(175, checkout.total());
}
```
**Test 5:** Order independence
```java
@Test
void scanningOrderDoesNotAffectTotal() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("A", 50);
    rules.addSpecialPrice("A", 3, 130);

    rules.addUnitPrice("B", 30);
    rules.addSpecialPrice("B", 2, 45);

    Checkout checkout = new Checkout(rules);

    checkout.scan("B");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("B");
    checkout.scan("A");

    assertEquals(175, checkout.total());
}
```
**Test 6:** Mixed products with and without special prices.
```java
@Test
void calculatesTotalForMixedProductsWithAndWithoutSpecialPrices() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("A", 50);
    rules.addSpecialPrice("A", 3, 130);

    rules.addUnitPrice("B", 30);
    rules.addSpecialPrice("B", 2, 45);

    rules.addUnitPrice("C", 20);
    rules.addUnitPrice("D", 15);

    Checkout checkout = new Checkout(rules);

    checkout.scan("A");
    checkout.scan("B");
    checkout.scan("C");
    checkout.scan("A");
    checkout.scan("D");
    checkout.scan("B");
    checkout.scan("A");

    assertEquals(210, checkout.total());
}
```

**Test 7:** Multiple special prices for the same SKU.
```java
@Test
void appliesBestSpecialPriceWhenMultipleSpecialPricesExist() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("A", 50);

    rules.addSpecialPrice("A", 3, 130);
    rules.addSpecialPrice("A", 5, 200);

    Checkout checkout = new Checkout(rules);

    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");

    assertEquals(200, checkout.total());
}
```
**Test 8:** Combined special prices
```java
@Test
void combinesMultipleSpecialPricesToGetBestTotal() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("A", 50);

    rules.addSpecialPrice("A", 3, 130);
    rules.addSpecialPrice("A", 5, 200);

    Checkout checkout = new Checkout(rules);

    // 8 items
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");

    assertEquals(330, checkout.total());
}
```
**Test 9:** Priority between special prices
```java
@Test
void choosesBestCombinationWhenSpecialPricesConflict() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("A", 50);

    rules.addSpecialPrice("A", 3, 120);
    rules.addSpecialPrice("A", 2, 80);

    Checkout checkout = new Checkout(rules);

    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");

    assertEquals(160, checkout.total());
}
```
**Test 10:** Buy X get Y free
```java
@Test
void appliesBuyOneGetOneFree() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("A", 50);

    rules.addBuyXGetYFree("A", 1, 1);

    Checkout checkout = new Checkout(rules);

    checkout.scan("A");
    checkout.scan("A");

    assertEquals(50, checkout.total());
}
```
**Test 11:** Buy 1, get 1 free with more than two products.
```java
@Test
void appliesBuyOneGetOneFreeForMultiplePairs() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("A", 50);

    rules.addBuyXGetYFree("A", 1, 1);

    Checkout checkout = new Checkout(rules);

    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");

    assertEquals(100, checkout.total());
}
```
**Test 12:** Buy X Get Y Free and special prices at the same time.
```java
@Test
void choosesBestPriceAcrossDifferentRuleTypes() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("A", 50);

    rules.addSpecialPrice("A", 3, 130);
    rules.addBuyXGetYFree("A", 1, 1);

    Checkout checkout = new Checkout(rules);

    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");

    assertEquals(100, checkout.total());
}
```
**Test 13a:** Verify that buy-x-get-y-free and special prices are combined optimally.  
This expects you to use:
- Priority between pricing rules
- stackability rules
```java
@Test
void choosesOptimalCombinationBetweenBuyXGetYFreeAndSpecialPrices() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("A", 50);

    // Two conflicting rules
    rules.addBuyXGetYFree("A", 1, 1, false); // 2 for 50 In this case set as non-stackable
    rules.addSpecialPrice("A", 3, 100); // 3 for 100

    Checkout checkout;

    // Case 1: 3 items → best is 3-for-100
    checkout = new Checkout(rules);
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    assertEquals(100, checkout.total());

    // Case 2: 4 items → best is 3-for-100 + 1×50 = 150
    checkout = new Checkout(rules);
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    assertEquals(150, checkout.total());

    // Case 3: 5 items → best is 3-for-100 + buy-1-get-1-free = 150
    checkout = new Checkout(rules);
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    assertEquals(150, checkout.total());

    // Case 4: 6 items → best is 3-for-100 + 3-for-100 = 200
    checkout = new Checkout(rules);
    for (int i = 0; i < 6; i++) checkout.scan("A");
    assertEquals(200, checkout.total());
}
```
**Test 13b:** Modify the test above if sticking to the best price (lowest possible) version. 
Other tests may also need modification for this to work after implementing.
```java

```
**Test 14:** 
```java

```
**Test 15:** 
```java

```