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
**Additions:**

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
**Test 6:** Mixed products with and without special prices
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

**Test 7:** Multiple special prices for the same SKU
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
**Test 10:**
```java

```

**Test 11:**
```java

```