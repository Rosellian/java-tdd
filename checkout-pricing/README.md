# Checkout Pricing Rules Kata
You will build a checkout system where every product has a price, but some have special prices or discounts.

---
**Sample rules:**
- A: 50kr, 3 for 130kr
- B: 30kr, 2 for 45kr
- C: 20kr
- D: 15kr
- 
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
    
    public void addUnitPrice(String unit, int price) {
        unitPrices.put(unit, price);
    }
    
    public int getUnitPrice(String unit) {
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
    
    public void scan(String unit) {
        items.add(unit);
    }
    
    public int total() {
        return 0;
    }
}
```
### Test cases:
**Test 1:** one product, no special price
**Test 2:** 