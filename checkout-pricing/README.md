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
## Architecture and steps
### Starting point:
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
### Additions:
#### Pricing Rules:
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
#### Pricing Option:  
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
#### Priority and stackability rules:
Note memoization might need rethinking here.
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
#### Buy X, get Y at discount
- `BuyXGetYDiscount`, new rule
```java
public record BuyXGetYDiscount(int buy, int get, double discount, boolean stackable) {}
```
- `BuyXGetYDiscountOption`, new PricingOption
```java
public record BuyXGetYDiscountOption(int quantity, int price, int priority, boolean stackable)
        implements PricingOption {}
```
#### Cross-SKU campaigns
- **Buy X of A, get Y of B free**  
This creates the need for basket-level or pre-stage rule processing, handling cross-SKU rules.
```java
public record CrossSkuBuyXGetYFree(
    String buySku,
    int buyQty,
    String freeSku,
    int freeQty,
    boolean stackable,
    int priority
) {}
```
- **Buy X of A, get Y of B at discount**
```java
public record CrossSkuBuyXGetYDiscount(
    String buySku,
    int buyQty,
    String discountSku,
    int discountQty,
    double discount,   // e.g. 0.5 for 50%
    boolean stackable,
    int priority
) {}
```
---
#### Adding SKU-specific discount rule
```java
record SkuDiscount(String sku, double rate, int priority) {}
```
---
### Refactoring
#### Combined Rule application structure
```java
public record SkuMod(int free, int discounted, double rate){}

// Can be used in a Map<String, SkuMod> mods within Checkout 
// when applying rules;
```
#### RuleEngine architecture
**Main step:**  
`RuleEngine`
```java
public class RuleEngine {

    private final PricingRules rules;

    public RuleEngine(PricingRules rules) {
        this.rules = rules;
    }

    public List<CrossSkuRule> getOrderedCrossSkuRules() {
        return rules.getCrossSkuRules().stream()
                .sorted(Comparator.comparingInt(CrossSkuRule::priority))
                .toList();
    }

    public List<SkuDiscount> getSkuDiscounts() {
        return rules.getSkuDiscounts();
    }
}
```
`RuleEvaluator`
```java
public interface IRuleEvaluator {

   boolean apply(CrossSkuBuyXGetYFree rule, Map<String, Long> counts, Map<String, SkuMod> mods);

   boolean apply(CrossSkuBuyXGetYDiscount rule, Map<String, Long> counts, Map<String, SkuMod> mods);
}
```
`PriceCalculator`
```java
public class PriceCalculator {
   private final PricingRules rules;

   public PriceCalculator(PricingRules rules) {
      this.rules = rules;
   }

   public int calculateTotal(Map<String, Long> counts, Map<String, SkuMod> mods) {
       //Implement calculation of total including DP-algorithm
   }
}
```
Checkout class now becomes much cleaner:  
`Checkout`
```java
public class Checkout {
    private final RuleEngine ruleEngine;
    private final RuleEvaluator ruleEvaluator;
    private final PriceCalculator calculator;

   private final List<String> items = new ArrayList<>();

    public Checkout(PricingRules rules) {
        ruleEngine = new RuleEngine(rules);
        ruleEvaluator = new RuleEvaluator();
        calculator = new PriceCalculator();
    }

    public void scan(String unit) {
        items.add(unit);
    }

    public int total() {
        Map<String, Long> counts = countItems();

        Map<String, SkuMod> mods = new HashMap<>();

        applyCrossSkuRules(counts, mods);

        applySkuDiscount(mods);

        return calculator.calculateTotal(counts, mods);
    }
}
```
**Introducing RuleContext:**  
This is an immutable entity giving the following positives:  
- No original values
- No reset
- No side-effects
- Clean in → clean out

It can enable more features:
- Logging
- Debugging
- Extensions
- Make the process easier to follow

`RuleContext`
```java
public record RuleContext(
        Map<String, Long> counts,
        Map<String, SkuMod> mods
) {

    public RuleContext copy() {
        return new RuleContext(
                new HashMap<>(counts),
                new HashMap<>(mods)
        );
    }

    public long countOf(String sku) {
        return counts.getOrDefault(sku, 0L);
    }

    public SkuMod modOf(String sku) {
        return mods.getOrDefault(sku, new SkuMod(0, 0, 1.0));
    }
}
```
`RuleResult`
```java
public record RuleResult(boolean applied, RuleContext newContext) {}
```
These can then be used by the RuleEngine and RuleEvaluator.  
In order to avoid all mutations of RuleContext content another structure is needed:
`RuleDelta`
```java
public record RuleDelta(
        Map<String, Long> countChanges,
        Map<String, SkuMod> modChanges,
        boolean applied
) {

    public static RuleDelta none() {
        return new RuleDelta(Map.of(), Map.of(), false);
    }
}
```
Applying a rule will then have the following work flow:
1. RuleContext -> RuleDelta
2. RuleContext + RuleDelta -> RuleContext

For complete immutability counts should not be changed so RuleDelta becomes:
```java
public record RuleDelta(
        Map<String, SkuMod> modChanges,
        boolean applied
) {

    public static RuleDelta none() {
        return new RuleDelta(Map.of(), false);
    }
}
```
`RuleContext` needs the following method:
```java
public RuleContext apply(RuleDelta delta) {
    // Apply changes to mods
}
```
For stackability to work you have to simulate the loop without using counts.

**Introducing Debug logging**


---
## Testing
### Test cases
#### Base tests
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
---
#### Adding new rule type - Buy x get Y free
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
---
#### Design decision:
1. Complex rule policies, introduce:
   - Priority order
   - Stackable vs non-stackable
   - Stackability on SKU-level
2. Keep to best (lowest) price available

#### Path chosen:
**1. Introducing more complexity**

---
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
---
#### Alternative path - start here instead
**Test 13b:** Modify the test above if sticking to the best price (lowest possible) version. 
Other tests may also need modification for this to work after implementing.
```java

```
---
#### Design path 1 continues:
**Test 14:** Buy‑1‑get‑1‑free is stackable for SKU A.
```java
@Test
void buyOneGetOneFreeIsStackableForA() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("A", 50);

    // A is stackable
    rules.addBuyXGetYFree("A", 1, 1, true);

    Checkout checkout = new Checkout(rules);

    // 4 A → två packets → 100 kr
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");

    assertEquals(100, checkout.total());
}
```
**Test 15:** Buy‑1‑get‑1‑free is not stackable for SKU B
```java
@Test
void buyOneGetOneFreeIsNotStackableForB() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("B", 40);

    // B is non-stackable
    rules.addBuyXGetYFree("B", 1, 1, false);

    Checkout checkout = new Checkout(rules);

    // 4 B → 1 packets (2 for 40) + 2×40 = 120
    checkout.scan("B");
    checkout.scan("B");
    checkout.scan("B");
    checkout.scan("B");

    assertEquals(120, checkout.total());
}
```
**Test 16:** A stackable, B non‑stackable in same checkout.
```java
@Test
void stackabilityIsPerSku() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("A", 50);
    rules.addUnitPrice("B", 40);

    rules.addBuyXGetYFree("A", 1, 1, true);   // A stackable
    rules.addBuyXGetYFree("B", 1, 1, false);  // B non-stackable

    Checkout checkout = new Checkout(rules);

    // 4 A → stackable → 100
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");

    // 4 B → non-stackable → 120
    checkout.scan("B");
    checkout.scan("B");
    checkout.scan("B");
    checkout.scan("B");

    assertEquals(220, checkout.total());
}
```
---
#### Adding new rule type - Buy X, get y at discount
**Test 17:** Buy 2, get 1 half price
```java
@Test
void appliesBuyTwoGetOneHalfPrice() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("A", 50);

    // buy 2, get 1 at 50% discount
    rules.addBuyXGetYDiscount("A", 2, 1, 0.5);

    Checkout checkout = new Checkout(rules);

    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");

    assertEquals(125, checkout.total());
}
```
**Test 18:** Full Combination Stress Test
- A: has special price + stackable buy‑X‑get‑Y‑free
- B: has special price + non‑stackable buy‑X‑get‑Y‑free
- C: has buy‑X‑get‑Y‑discount (stackable)
```java
@Test
void combinesAllRuleTypesWithPriorityAndStackability() {
    PricingRules rules = new PricingRules();

    // --- SKU A ---
    // unit price
    rules.addUnitPrice("A", 50);
    // special price: 3 for 120 (priority 1, stackable)
    rules.addSpecialPrice("A", 3, 120);
    // buy 1, get 1 free (stackable)
    rules.addBuyXGetYFree("A", 1, 1, true);

    // --- SKU B ---
    rules.addUnitPrice("B", 40);
    // special price: 2 for 70 (priority 1)
    rules.addSpecialPrice("B", 2, 70);
    // buy 1, get 1 free (non-stackable)
    rules.addBuyXGetYFree("B", 1, 1, false);

    // --- SKU C ---
    rules.addUnitPrice("C", 30);
    // buy 2, get 1 at 50% discount (stackable)
    rules.addBuyXGetYDiscount("C", 2, 1, 0.5);

    Checkout checkout = new Checkout(rules);

    // --- Basket ---
    // A: 6 items
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");

    // B: 4 items
    checkout.scan("B");
    checkout.scan("B");
    checkout.scan("B");
    checkout.scan("B");

    // C: 5 items
    checkout.scan("C");
    checkout.scan("C");
    checkout.scan("C");
    checkout.scan("C");
    checkout.scan("C");

    // --- Expected ---
    // A:
    // best is 3-for-120 + 3-for-120 = 240
    //
    // B:
    // non-stackable buy-1-get-1-free:
    // 1 package (2 for 40) + 2×40 = 120
    //
    // C:
    // buy 2, get 1 half price (stackable):
    // group1: 30 + 30 + 15 = 75
    // group2: 30 + 30 + 15 = 75
    // 5 items → 1 leftover at 30
    // total C = 75 + 75 + 30 = 180
    //
    // TOTAL = 240 + 120 + 180 = 540

    assertEquals(540, checkout.total());
}
```
---
#### Adding Cross-SKU pricing rule
**Test 19:** Cross‑SKU: Buy X of A, get Y of B free. 
Specific: Buy 2 of A, get 1 of B free
```java
@Test
void buyTwoAGetOneBFree() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("A", 50);
    rules.addUnitPrice("B", 40);

    rules.addCrossSkuBuyXGetYFree("A", 2, "B", 1, true);

    Checkout checkout = new Checkout(rules);

    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("B");

    assertEquals(100, checkout.total());
}
```
**Test 20:** Cross‑SKU + stackability.
Buy 2 A → get 1 B free stackable
```java
@Test
void crossSkuStackable() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("A", 50);
    rules.addUnitPrice("B", 40);

    rules.addCrossSkuBuyXGetYFree("A", 2, "B", 1, true);

    Checkout checkout = new Checkout(rules);

    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("B");
    checkout.scan("B");

    // 4 A = 200
    // 2 B = free
    assertEquals(200, checkout.total());
}
```
**Test 21:** Cross‑SKU non‑stackable.
Buy 2 A → get 1 B free non-stackable
```java
@Test
void crossSkuNonStackable() {
    PricingRules rules = new PricingRules();
    rules.addUnitPrice("A", 50);
    rules.addUnitPrice("B", 40);

    rules.addCrossSkuBuyXGetYFree("A", 2, "B", 1, false);

    Checkout checkout = new Checkout(rules);

    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("B");
    checkout.scan("B");

    // 4 A = 200
    // 1 B free, 1 B paid = 40
    assertEquals(240, checkout.total());
}
```
**Test 22:** Cross‑SKU + SpecialPrice (which rule wins?).
Rules:
- Cross‑SKU: Buy 2 A → get 1 B free (priority 0, non‑stackable)
- Special A: 3‑for‑120
- Special B: 2‑for‑70
```java
@Test
void crossSkuBeatsSpecialPriceWhenHigherPriority() {
    PricingRules rules = new PricingRules();

    // --- SKU A ---
    rules.addUnitPrice("A", 50);
    rules.addSpecialPrice("A", 3, 120, 1, true);

    // --- SKU B ---
    rules.addUnitPrice("B", 40);
    rules.addSpecialPrice("B", 2, 70, 1, true);

    // --- Cross-SKU ---
    // priority 0 = higher than special prices
    rules.addCrossSkuBuyXGetYFree("A", 2, "B", 1, 0, false);

    Checkout checkout = new Checkout(rules);

    // Basket: A A A B B
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("B");
    checkout.scan("B");

    // Expected:
    // Cross-SKU: 1 B free
    // A: 3 → 120
    // B: 1 → 40
    // Total = 160

    assertEquals(160, checkout.total());
}
```
---
#### Adding another cross-SKU rule
**Test 23:**  Buy X of A, get Y of B at discount.
Specific: Buy 2 of A → get 1 of B at 50% discount
```java
@Test
void crossSkuBuyXGetYAtDiscount() {
    PricingRules rules = new PricingRules();

    // --- SKU A ---
    rules.addUnitPrice("A", 50);

    // --- SKU B ---
    rules.addUnitPrice("B", 40);

    // --- Cross-SKU ---
    // Buy 2 A → get 1 B at 50% discount
    rules.addCrossSkuBuyXGetYDiscount("A", 2, "B", 1, 0.5, 0, true);

    Checkout checkout = new Checkout(rules);

    // Basket: A A B
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("B");

    // Expected:
    // A: 50 + 50 = 100
    // B: 40 * 0.5 = 20
    // Total = 120

    assertEquals(120, checkout.total());
}
```
**Test 24:** Cross‑SKU discount + special price (which rule wins?).
Cross‑SKU discount beats special price when it has higher priority.
```java
@Test
void crossSkuDiscountBeatsSpecialPriceWhenHigherPriority() {
    PricingRules rules = new PricingRules();

    // --- SKU A ---
    rules.addUnitPrice("A", 50);

    // --- SKU B ---
    rules.addUnitPrice("B", 40);
    rules.addSpecialPrice("B", 2, 70, 1, true); // priority 1

    // --- Cross-SKU ---
    // Buy 2 A → get 1 B at 50% discount
    // priority 0 = higher than special price
    rules.addCrossSkuBuyXGetYDiscount("A", 2, "B", 1, 0.5, 0, false);

    Checkout checkout = new Checkout(rules);

    // Basket: A A B B
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("B");
    checkout.scan("B");

    // Expected:
    // Cross-SKU: 1 B at 20 kr
    // Remaining B: 1 at 40 kr
    // A: 100
    // Total = 160

    assertEquals(160, checkout.total());
}
```
**Cross‑SKU free + Cross‑SKU discount (priority decides):**  
**Test 25:** Free rule wins over discount rule
```java
@Test
void crossSkuFreeBeatsDiscountWhenHigherPriority() {
    PricingRules rules = new PricingRules();

    rules.addUnitPrice("A", 50);
    rules.addUnitPrice("B", 40);

    // FREE has higher priority
    rules.addCrossSkuBuyXGetYFree("A", 2, "B", 1, 0, false);
    rules.addCrossSkuBuyXGetYDiscount("A", 2, "B", 1, 0.5, 1, false);

    Checkout checkout = new Checkout(rules);

    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("B");

    assertEquals(100, checkout.total());
}
```
**Test 26:** Discount wins over free
```java
@Test
void crossSkuDiscountBeatsFreeWhenHigherPriority() {
    PricingRules rules = new PricingRules();

    rules.addUnitPrice("A", 50);
    rules.addUnitPrice("B", 40);

    // DISCOUNT has higher priority
    rules.addCrossSkuBuyXGetYDiscount("A", 2, "B", 1, 0.5, 0, false);
    rules.addCrossSkuBuyXGetYFree("A", 2, "B", 1, 1, false);

    Checkout checkout = new Checkout(rules);

    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("B");

    assertEquals(120, checkout.total());
}
```
**Test 27:** Cross‑SKU DISCOUNT + Special price (combined optimization).
```java
@Test
void crossSkuDiscountAndSpecialPriceCombinedOptimization() {
    PricingRules rules = new PricingRules();

    // --- SKU A ---
    rules.addUnitPrice("A", 50);

    // --- SKU B ---
    rules.addUnitPrice("B", 40);
    rules.addSpecialPrice("B", 3, 90, 1, true); // priority 1

    // --- Cross-SKU ---
    // Buy 2 A → get 1 B at 50% discount
    // priority 0 = higher than special price
    rules.addCrossSkuBuyXGetYDiscount("A", 2, "B", 1, 0.5, 0, false);

    Checkout checkout = new Checkout(rules);

    // Basket: A A B B B
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("B");
    checkout.scan("B");
    checkout.scan("B");

    // Expected:
    // Cross-SKU: 1 B at 20 kr
    // Remaining B: 2 × 40 = 80
    // A: 100
    // Total = 200

    assertEquals(200, checkout.total());
}
```
**Test 28:** Cross‑SKU FREE + Cross‑SKU FREE (stackability + priority).
Two FREE‑rules, both stackable, higher priority wins.
```java
@Test
void higherPriorityFreeRuleWinsWhenBothAreStackable() {
    PricingRules rules = new PricingRules();

    rules.addUnitPrice("A", 50);
    rules.addUnitPrice("B", 40);

    // Higher priority (0), stackable
    rules.addCrossSkuBuyXGetYFree("A", 2, "B", 1, 0, true);

    // Lower priority (1), stackable
    rules.addCrossSkuBuyXGetYFree("A", 3, "B", 1, 1, true);

    Checkout checkout = new Checkout(rules);

    // Basket: 6 A, 2 B
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");

    checkout.scan("B");
    checkout.scan("B");

    // Expected:
    // Rule 1 applies 3 times → 3 free B, but only 2 exist → 2 free
    // A = 300
    // B = 0
    assertEquals(300, checkout.total());
}
```
**Test 29:** Two FREE‑rules, both stackable, but lower priority is “stronger”.
```java
@Test
void higherPriorityFreeRuleWinsEvenIfLowerPriorityIsMoreGenerous() {
    PricingRules rules = new PricingRules();

    rules.addUnitPrice("A", 50);
    rules.addUnitPrice("B", 40);

    // Higher priority (0), stackable
    rules.addCrossSkuBuyXGetYFree("A", 3, "B", 1, 0, true);

    // Lower priority (1), stackable but more generous
    rules.addCrossSkuBuyXGetYFree("A", 2, "B", 1, 1, true);

    Checkout checkout = new Checkout(rules);

    // Basket: 6 A, 2 B
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");

    checkout.scan("B");
    checkout.scan("B");

    // Expected:
    // Rule 1 applies twice → 2 free B
    // Rule 2 ignored
    assertEquals(300, checkout.total());
}
```
---
#### Adding SKU-specific discount rule
**Test 30:** Cross‑SKU DISCOUNT + SKU‑specific discount (which wins?)
Cross‑SKU DISCOUNT wins over SKU‑discount
```java
@Test
void crossSkuDiscountBeatsSkuDiscountWhenHigherPriority() {
    PricingRules rules = new PricingRules();

    rules.addUnitPrice("A", 50);
    rules.addUnitPrice("B", 40);

    // Cross-SKU discount has higher priority
    rules.addCrossSkuBuyXGetYDiscount("A", 2, "B", 1, 0.5, 0, false);

    // SKU-specific discount (lower priority)
    rules.addSkuDiscount("B", 0.25, 1); // 25% off, priority 1

    Checkout checkout = new Checkout(rules);

    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("B");

    assertEquals(120, checkout.total());
}
```
**Test 31:** SKU‑discount wins over Cross‑SKU DISCOUNT
```java
@Test
void skuDiscountBeatsCrossSkuDiscountWhenHigherPriority() {
    PricingRules rules = new PricingRules();

    rules.addUnitPrice("A", 50);
    rules.addUnitPrice("B", 40);

    // SKU-specific discount has higher priority
    rules.addSkuDiscount("B", 0.25, 0); // 25% off, priority 0

    // Cross-SKU discount (lower priority)
    rules.addCrossSkuBuyXGetYDiscount("A", 2, "B", 1, 0.5, 1, false);

    Checkout checkout = new Checkout(rules);

    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("B");

    assertEquals(130, checkout.total());
}
```
**Test 32:**
```java

```
**Test 33:**
```java

```
**Test 34:**
```java

```