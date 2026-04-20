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
- `PricingRules.java`
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
- `Checkout.java`
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
- `PricingRule.java`
```java
public interface PricingRule {
    int calculatePrice(List<String> items);
}
```
- `SpecialPrice.java`
```java
public record SpecialPrice(int quantity, int price) {}
```
- `BuyXGetYFree.java`
```java
public record BuyXGetYFree(int buy, int free) {}
```
#### Pricing Option:  
Can replace PricingRule interface.
- `PricingOption.java`
```java
public interface PricingOption {
    int price();      // what does this package cost?
    int quantity();   // how many items are consumed?
}
```
`SpecialPrice.java`
```java
public record SpecialPrice(int quantity, int price) implements PricingOption {}
```
`BuyXGetYFreeOption.java`
```java
public record BuyXGetYFreeOption(int quantity, int price) implements PricingOption {}
```
#### Priority and stackability rules:
Note memoization might need rethinking here.
- `PricingOption.java`, new version
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
- `BuyXGetYDiscount.java`, new rule
```java
public record BuyXGetYDiscount(int buy, int get, double discount, boolean stackable) {}
```
- `BuyXGetYDiscountOption.java`, new PricingOption
```java
public record BuyXGetYDiscountOption(int quantity, int price, int priority, boolean stackable)
        implements PricingOption {}
```
#### Cross-SKU campaigns
- **Buy X of A, get Y of B free**  
This creates the need for basket-level or pre-stage rule processing, handling cross-SKU rules.
`CrossSkuBuyXGetYFree.java`
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
`CrossSkuBuyXGetYDiscount.java`
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
`SkuDiscount.java`
```java
record SkuDiscount(String sku, double rate, int priority) {}
```
---
### Refactoring
#### Free and Discount rules merged with options
If `BuyXGetYFree.java` and `BuyXGetYDiscount.java` are kept they can be replaced like:
- BuyXGetYFreeOption.java -> BuyXGetYFree.java
- BuyXGetYDiscountOption.java → BuyXGetYDiscount.java  
And then `PricingRules` can  be refactored to hold all per-sku options in 1 structure.
#### Combined Rule application structure
`SkuMod.java`
```java
public record SkuMod(int free, int discounted, double rate){}

// Can be used in a Map<String, SkuMod> mods within Checkout 
// when applying rules;
```
#### RuleEngine architecture
**Main step:**  
`RuleEngine.java`
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
`RuleEvaluator.java`
```java
public interface IRuleEvaluator {

   boolean apply(CrossSkuBuyXGetYFree rule, Map<String, Long> counts, Map<String, SkuMod> mods);

   boolean apply(CrossSkuBuyXGetYDiscount rule, Map<String, Long> counts, Map<String, SkuMod> mods);
}
```
`PriceCalculator.java`
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
`Checkout.java`
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

`RuleContext.java`
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
`RuleResult.java`
```java
public record RuleResult(boolean applied, RuleContext newContext) {}
```
These can then be used by the RuleEngine and RuleEvaluator.  
In order to avoid all mutations of RuleContext content another structure is needed:
`RuleDelta.java`
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
`RuleDelta.java`
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
`RuleContext.java` needs the following method:
```java
public RuleContext apply(RuleDelta delta) {
    // Apply changes to mods
}
```
For stackability to work you have to simulate the loop without using counts.

**Introducing Debug logging**
You want to see:
- what rules were applied
- why they applied
- number of times they applied
- what delta they generated
- how context changed step by step

`RuleDebugEvent.java`
```java
public record RuleDebugEvent(
        String ruleName,
        boolean applied,
        RuleDelta delta,
        RuleContext before,
        RuleContext after
) {}
```
`RuleDebugger.java`
```java
public class RuleDebugger {

    private final List<RuleDebugEvent> events = new ArrayList<>();

    public void log(String ruleName, boolean applied, RuleDelta delta,
                    RuleContext before, RuleContext after) {

        events.add(new RuleDebugEvent(ruleName, applied, delta, before, after));
    }

    public List<RuleDebugEvent> events() {
        return events;
    }

    public void print() {
        for (var e : events) {
            System.out.println("→ Rule: " + e.ruleName());
            System.out.println("   Applied: " + e.applied());
            System.out.println("   Delta: " + e.delta());
            System.out.println("   Before: " + e.before());
            System.out.println("   After: " + e.after());
            System.out.println();
        }
    }
}
```
---
### Visual components
#### RuleInspector
**Introducing RuleInspector component**
- Takes a list of RuleDebugEvent from RuleDebugger
- Presents them in a structured format
- Shows:
  - What rules that applied
  - why they applied
  - How many times
  - What delta they created
  - How context changed
  - How remaining was counted
  - How DP chose special prices
  - How the total was built

`RuleInspector.java` - Data model
```java
public class RuleInspector {

    private final List<RuleDebugEvent> events;

    public RuleInspector(List<RuleDebugEvent> events) {
        this.events = events;
    }

    public List<RuleDebugEvent> events() {
        return events;
    }
}
```
`RuleInspectorView.java` - Textbased rendering
```java
public class RuleInspectorView {

    public static void print(RuleInspector inspector) {
        System.out.println("=== Rule Inspector ===");

        for (var e : inspector.events()) {
            System.out.println("Rule: " + e.ruleName());
            System.out.println("Applied: " + e.applied());
            System.out.println("Delta: " + e.delta());

            System.out.println("Before:");
            printContext(e.before());

            System.out.println("After:");
            printContext(e.after());

            System.out.println("----------------------");
        }
    }

    private static void printContext(RuleContext ctx) {
        System.out.println("  Counts: " + ctx.counts());
        System.out.println("  Mods:   " + ctx.mods());
    }
}
```
**JavaScript (React) component for displaying rule events**  
`RuleInspector UI` - React-based representation:  
See checkout-admin-ui readme file.

#### RuleInspector 2.0
Shows:
- What special prices were chosen
- Why
- What combinations were tested
- Which DP-path that won

Will enable further visualization. Builds upon current implementation but adds more data through new component RuleTrace.  
**Introducing RuleTrace:**  
RuleTrace gives full history over:
- rules
- deltas
- content before/after
- remaining
- DP-choice
- totals per SKU
- totals per step

`RuleTrace.java`
```java
public record RuleTrace(
        List<RuleDebugEvent> events,
        List<SkuTrace> skuTraces,
        int finalTotal
) {}
```
`SkuTrace.java`
```java
public record SkuTrace(
        String sku,
        long count,
        long free,
        long discounted,
        double rate,
        long remaining,
        int unitPrice,
        int discountedPrice,
        int dpPrice,
        int total
) {}
```
**Extend Inspector with RuleTrace**  
RuleInspector takes:
- RuleDebugger.events()
- Final RuleContext
- PricingRules
- PriceCalculator

And builds a complete trace. Here is the new version:

`RuleInspector.java`
```java
public class RuleInspector {

    private final PricingRules rules;
    private final PriceCalculator calculator;

    public RuleInspector(PricingRules rules, PriceCalculator calculator) {
        this.rules = rules;
        this.calculator = calculator;
    }

    public RuleTrace inspect(RuleContext finalContext, List<RuleDebugEvent> events) {
        // Form full RuleTrace here
    }
}
```
**Extend Inspector with graph representation of DP-path**  
We accomplish this by adding DP-tracing to PriceCalculator:  
- Add a structure for a DP-step.  
    `DPNode.java`
    ```java
    public record DPNode(
        int index,
        int price,
        List<String> explanation
    ) {}
    ```
- And a Dp-trace
    `DPTrace.java`
    ```java
    public record DPTrace(
        String sku,
        long remaining,
        List<DPNode> nodes,
        int finalPrice,
        List<String> winningPath
    ) {}
    ```
- Change implementation in PriceCalculator and add logging
    `PriceCalculator.java`
    ```java
    //...
    public DPTrace bestPriceTrace(String sku, long remaining) {
        // Implement new signature
    }
    //...
    ```
- Integrate DP-trace in RuleInspector
  `RuleInspector.java`
    ```java
    public class RuleInspector {
        public RuleTrace inspect(RuleContext finalContext, List<RuleDebugEvent> events) {
            //...
            List<DPTrace> dpTraces = new ArrayList<>();

            for(var s : skuTraces) {
                //...
                DPTrace dpTrace = calculator.bestPriceTrace(s.sku(), s.remaining());
                dpTraces.add(dpTrace);
                //...
            }
            //...
        }
    }
    ```
- And extend RuleTrace:  
  `Ruletrace.java`
    ```java
    public record RuleTrace(
        List<RuleDebugEvent> events,
        List<SkuTrace> skuTraces,
        List<DPTrace> dpTraces,
        int finalTotal
    ) {}
    ```
- Add log visualization:  
    `RuleInspectorView.java`
    ```java
    public class RuleInspectorView {

        public static void printDP(DPTrace dp) {
            System.out.println("DP Path for SKU " + dp.sku() +
                " (remaining = " + dp.remaining() + ")");

            for (var node : dp.nodes()) {
                System.out.println("[" + node.index() + "] → " + node.price() + " kr");
                for (var line : node.explanation()) {
                    System.out.println("     " + line);
                }
            }

            System.out.println("Winning path:");
            for (var step : dp.winningPath()) {
                System.out.println("  - " + step);
            }

            System.out.println("Total: " + dp.finalPrice() + " kr\n");
        }
    }
    ```

#### User Interface
**RuleInspector 3.0 – React UI**  
See checkout-admin-ui readme file.

**Pricing Engine Admin Panel**  
Admin tool using the RuleInspector UI in which you can:
- Upload a basket (items + number of)
- View what rules applied
- View Dp-graph
- View totals
- Change rule setup
- Debug in real-time

**UI**
See checkout-admin-ui readme file.
**Backend API**
- Takes `{cart, ruleSet}`
- Runs the rule engine
- Returns `RuleTrace` as JSON

1. DTOs for request/response
    `EvaluateRequest.java`
    ```java
    public class EvaluateRequest {
        public Map<String, Long> cart;
        public String ruleSet;
    }
    ```
   `EvaluateResponse.java`
    ```java
    public class EvaluateResponse {
        public RuleTrace trace;

        public EvaluateResponse(RuleTrace trace) {
            this.trace = trace;
        }
    }
    ```
2. PricingEngineService – wrapper around the engine.
    A thin service that:
    - Loads correct rule set
    - Runs RuleEngine
    - Runs RuleInspector
    - Returns RuleTrace
   `PricingEngineService.java`
   ```java
   import org.springframework.stereotype.Service;

    @Service
    public class PricingEngineService {
        private final RuleEvaluator evaluator = new RuleEvaluator();

        public RuleTrace evaluate(Map<String, Long> cart, String ruleSetName) {
            PricingRules rules = RuleSetRegistry.get(ruleSetName);
            PriceCalculator calculator = new PriceCalculator(rules);

            RuleDebugger debugger = new RuleDebugger();
            RuleEngine engine = new RuleEngine(rules, evaluator, debugger);

            RuleContext ctx = new RuleContext(cart, Map.of());
            ctx = engine.evaluate(ctx);

            RuleInspector inspector = new RuleInspector(rules, calculator);
            return inspector.inspect(ctx, debugger.events());
        }
    }
    ```
3. RuleSetRegistry - Choose rule set  
Add any additional rulesets here.
    `RuleSetRegistry.java`
    ```java
    import java.util.Map;

    public class RuleSetRegistry {

        public static PricingRules get(String name) {
            return switch (name) {
                case "campaignA" -> CampaignARules.build();
                case "campaignB" -> CampaignBRules.build();
                default -> DefaultRules.build();
            };
        }
    }
    ```
4. REST-controller: `/api/evaluate`
    `PricingController.java`
    ```java
    import org.springframework.web.bind.annotation.*;

    @RestController
    @RequestMapping("/api")
    public class PricingController {
        private final PricingEngineService service;

        public PricingController(PricingEngineService service) {
            this.service = service;
        }

        @PostMapping("/evaluate")
        public EvaluateResponse evaluate(@RequestBody EvaluateRequest req) {
            RuleTrace trace = service.evaluate(req.cart, req.ruleSet);
            return new EvaluateResponse(trace);
        }
    }
    ```
5. CORS (if React runs on localhost:3000)
    `CorsConfig.java`
    ```java
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.web.servlet.config.annotation.CorsRegistry;
    import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

    @Configuration
    public class CorsConfig {

        @Bean
        public WebMvcConfigurer corsConfigurer() {
            return new WebMvcConfigurer() {
                @Override
                public void addCorsMappings(CorsRegistry registry) {
                    registry.addMapping("/api/**")
                            .allowedOrigins("http://localhost:3000")
                            .allowedMethods("GET", "POST");
                }
            };
        }
    }
    ```
**Backend App**
`CheckoutApplication.java`
```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CheckoutApplication {
    static void main(String[] args) {
        SpringApplication.run(CheckoutApplication.class, args);
    }
}
```
---
**Separating current RuleDebugger**
Renaming current Rule-Debugger/Logger to RuleTracer. This is the one used by current RuleInspector.  
This could be replaced by the new RuleDebugger implementation later, including tracing data structures.  
Renaming:  
RuleDebugEvent.java → RuleTraceEvent.java  
RuleDebugger.java → RuleTracer.java  

Below is an example structure.
Go from:  
```
logging
├── DPNode.java
├── DPTrace.java
├── RuleDebugEvent.java
├── RuleDebugger.java
├── RuleTrace.java
├── SkuTrace.java
├── RuleInspector.java
└── RuleInspectorView.java
```
to:
```
tracing
├── DPNode.java
├── DPTrace.java
├── RuleTraceEvent.java
├── RuleTracer.java
├── RuleTrace.java
├── SkuTrace.java
├── debug
└── inspector
    ├── RuleInspector.java
    └── RuleInspectorView.java
```

#### Rule Debugger
Shall show the *full* chain of price calculation for a given cart:

| Step | Content                                           |
|------|---------------------------------------------------|
| 1    | Input-cart and metadata                           |
| 2    | Matching rules (in order)                         |
| 3    | non-matching rules (with cause)                   |
| 4    | DP-step (ex. stackable/non-stackable transitions) |
| 5    | Price changes after each step                     |
| 6    | End result                                        |

**Components:**
1. `PricingTrace.java`
    ```java
    public class PricingTrace {
        private CartSnapshot cart;
        private List<RuleTrace> rules = new ArrayList<>();
        private List<StepTrace> steps = new ArrayList<>();
        private List<DPTrace> dp = new ArrayList<>();
        private List<Double> priceEvolution = new ArrayList<>();
        private double finalPrice;
        private Metadata metadata;

        public CartSnapshot getCart() {
            return cart;
        }
    
        public void setCart(CartSnapshot cart) {
            this.cart = cart;
        }
    
        public List<RuleTrace> getRules() {
            return rules;
        }
    
        public void setRules(List<RuleTrace> rules) {
            this.rules = rules;
        }
    
        public List<StepTrace> getSteps() {
            return steps;
        }
    
        public void setSteps(List<StepTrace> steps) {
            this.steps = steps;
        }
    
        public List<DPTrace> getDp() {
            return dp;
        }
    
        public void setDp(List<DPTrace> dp) {
            this.dp = dp;
        }
    
        public List<Double> getPriceEvolution() {
            return priceEvolution;
        }
    
        public void setPriceEvolution(List<Double> priceEvolution) {
            this.priceEvolution = priceEvolution;
        }
    
        public double getFinalPrice() {
            return finalPrice;
        }
    
        public void setFinalPrice(double finalPrice) {
            this.finalPrice = finalPrice;
        }
    
        public Metadata getMetadata() {
            return metadata;
        }
    
        public void setMetadata(Metadata metadata) {
            this.metadata = metadata;
        }
    }
    ```
2. `RuleTrace.java`
    ```java
    public class RuleTrace {
        private String id;
        private String name;
        private boolean matched;
        private String reason;
        private double before;
        private double after;
        private double delta;
        private Map<String, Object> inputs;
        private Map<String, Object> outputs;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public boolean isMatched() {
            return matched;
        }

        public void setMatched(boolean matched) {
            this.matched = matched;
        }

        public String getReason() {
            return reason;
        }

        public void setReason(String reason) {
            this.reason = reason;
        }

        public double getAfter() {
            return after;
        }

        public void setAfter(double after) {
            this.after = after;
        }

        public double getBefore() {
            return before;
        }

        public void setBefore(double before) {
            this.before = before;
        }

        public double getDelta() {
            return delta;
        }

        public void setDelta(double delta) {
            this.delta = delta;
        }

        public Map<String, Object> getInputs() {
            return inputs;
        }

        public void setInputs(Map<String, Object> inputs) {
            this.inputs = inputs;
        }

        public Map<String, Object> getOutputs() {
            return outputs;
        }

        public void setOutputs(Map<String, Object> outputs) {
            this.outputs = outputs;
        }
    }
    ```
3. `StepTrace.java`
    ```java
    public class StepTrace {
        private String step;
        private String description;
        private double priceBefore;
        private double priceAfter;

        public String getStep() {
            return step;
        }

        public void setStep(String step) {
            this.step = step;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public double getPriceBefore() {
            return priceBefore;
        }

        public void setPriceBefore(double priceBefore) {
            this.priceBefore = priceBefore;
        }

        public double getPriceAfter() {
            return priceAfter;
        }

        public void setPriceAfter(double priceAfter) {
            this.priceAfter = priceAfter;
        }
    }
    ```
4. `DPTrace.java`
    ```java
    public class DPTrace {
        private String state;
        private List<String> options;
        private String chosen;
        private double price;

        public String getState() {
            return state;
        }

        public void setState(String state) {
            this.state = state;
        }

        public List<String> getOptions() {
            return options;
        }

        public void setOptions(List<String> options) {
            this.options = options;
        }

        public String getChosen() {
            return chosen;
        }

        public void setChosen(String chosen) {
            this.chosen = chosen;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }
    }
    ```
5. `CartSnapshot.java`
    ```java
    public class CartSnapshot {
        private List<CartItem> items;
        private CustomerInfo customer;
        private Map<String, Object> context;

        public List<CartItem> getItems() {
            return items;
        }

        public void setItems(List<CartItem> items) {
            this.items = items;
        }

        public CustomerInfo getCustomer() {
            return customer;
        }

        public void setCustomer(CustomerInfo customer) {
            this.customer = customer;
        }

        public Map<String, Object> getContext() {
            return context;
        }

        public void setContext(Map<String, Object> context) {
            this.context = context;
        }
    }
    ```
6. `CartItem.java`
    ```java
    public class CartItem {
        private String sku;
        private int quantity;
        private double unitPrice;

        public CartItem(String sku, int quantity, double unitPrice) {
            this.sku = sku;
            this.quantity = quantity;
            this.unitPrice = unitPrice;
        }

        public String getSku() {
            return sku;
        }

        public void setSku(String sku) {
            this.sku = sku;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public double getUnitPrice() {
            return unitPrice;
        }

        public void setUnitPrice(double unitPrice) {
            this.unitPrice = unitPrice;
        }
    }
    ```
7. `CustomerInfo.java`
    ```java
    public class CustomerInfo {
        private String id;
        private String segment;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getSegment() {
            return segment;
        }

        public void setSegment(String segment) {
            this.segment = segment;
        }
    }
    ```
8. `Metadata.java`
    ```java
    public class Metadata {
        private String ruleSet;
        private String timestamp;
        private String engineVersion;

        public String getRuleSet() {
            return ruleSet;
        }

        public void setRuleSet(String ruleSet) {
            this.ruleSet = ruleSet;
        }

        public String getTimestamp() {
            return timestamp;
        }

        public void setTimestamp(String timestamp) {
            this.timestamp = timestamp;
        }

        public String getEngineVersion() {
            return engineVersion;
        }

        public void setEngineVersion(String engineVersion) {
            this.engineVersion = engineVersion;
        }
    }
    ```
9. `PricingTraceCollector.java`
    ```java
    public class PricingTraceCollector {
        private final PricingTrace trace = new PricingTrace();

        public PricingTraceCollector(CartSnapshot cart, String ruleset, String engineVersion) {
            trace.setCart(cart);
            Metadata metadata = new Metadata();
            metadata.setRuleSet(ruleset);
            metadata.setEngineVersion(engineVersion);
            metadata.setTimestamp(Instant.now().toString());
            trace.setMetadata(metadata);
        }

        public void recordRule(RuleTrace rt) {
            trace.getRules().add(rt);
            trace.getPriceEvolution().add(rt.getAfter());
        }

        public void recordStep(StepTrace st) {
            trace.getSteps().add(st);
            trace.getPriceEvolution().add(st.getPriceAfter());
        }
   
        public void recordStep(String step, String description, double before, double after) {
            StepTrace st = new StepTrace();
            st.setStep(step);
            st.setDescription(description);
            st.setPriceBefore(before);
            st.setPriceAfter(after);

            trace.getSteps().add(st);
            trace.getPriceEvolution().add(after);
        }

        public void recordDP(DPTrace dp) {
            trace.getDp().add(dp);
        }

        public void recordDP(String stateLabel, List<String> options, String chosen, double priceAfter) {
            DPTrace dp = new DPTrace();
            dp.setState(stateLabel);
            dp.setOptions(options);
            dp.setChosen(chosen);
            dp.setPrice(priceAfter);

            trace.getDp().add(dp);
        }

        public void setFinalPrice(double finalPrice) {
            trace.setFinalPrice(finalPrice);
            trace.getPriceEvolution().add(finalPrice);
        }

        public PricingTrace build() {
            return trace;
        }
    }
    ```
Separation in project structure:
```
└── tracing
    ├── DPNode.java
    ├── DPTrace.java
    ├── RuleTrace.java
    ├── RuleTraceEvent.java
    ├── RuleTracer.java
    ├── SkuTrace.java
    ├── debug
    │   ├── CartItem.java
    │   ├── CartSnapshot.java
    │   ├── CustomerInfo.java
    │   ├── DPTrace.java
    │   ├── Metadata.java
    │   ├── PricingTrace.java
    │   ├── PricingTraceCollector.java
    │   ├── RuleTrace.java
    │   └── StepTrace.java
    └── inspector
        ├── RuleInspector.java
        └── RuleInspectorView.java
```
**Backend API endpoint**  
`PricingController.java`
```java
@PostMapping("/trace")
public TraceResponse getTrace(@RequestBody EvaluateRequest req) {
    PricingTrace trace = service.getTrace(toPricingRequest(req));
    return new TraceResponse(trace);
}

private PricingRequest toPricingRequest(EvaluateRequest req) {
    //... Conversion to internal format, refactoring possible later to use as REST-format.
}
```
`TraceResponse.java`
```java
public class TraceResponse {
    public PricingTrace trace;

    public TraceResponse(PricingTrace trace) {
        this.trace = trace;
    }
}
```
**Using internal request data structure in service**
`PricingEngineService.java`
```java
public static final String ENGINE_VERSION = "v1";
//...
public PricingTrace getTrace(PricingRequest request) {
    PricingRules rules = RuleSetRegistry.get(request.getRuleSet());
    CartSnapshot cartSnapshot = toCartSnapshot(request, rules);

    PricingTraceCollector collector = new PricingTraceCollector(cartSnapshot,
            request.getRuleSet(), ENGINE_VERSION);
    RuleTracer tracer = new RuleTracer();
    RuleEngine engine = new RuleEngine(rules, tracer);

    RuleContext ctx = RuleContext.fromCart(cartSnapshot);
    ctx = engine.evaluate(ctx, collector);
    //...
}
//...
private CartSnapshot toCartSnapshot(PricingRequest req, PricingRules rules) {
    //...
}
```
New request format used internally at this point:  
`PricingRequest.java`
```java
public class PricingRequest {
    private String ruleSet;
    private List<CartItemRequest> items;
    private CustomerRequest customer;
    private Map<String, Object> context;

    public String getRuleSet() {
        return ruleSet;
    }

    public void setRuleSet(String ruleSet) {
        this.ruleSet = ruleSet;
    }

    public List<CartItemRequest> getItems() {
        return items;
    }

    public void setItems(List<CartItemRequest> items) {
        this.items = items;
    }

    public CustomerRequest getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerRequest customer) {
        this.customer = customer;
    }

    public Map<String, Object> getContext() {
        return context;
    }

    public void setContext(Map<String, Object> context) {
        this.context = context;
    }
}
```
`CartItemRequest.java`
```java
public class CartItemRequest {
    private String sku;
    private long quantity;

    public CartItemRequest(String sku, long quantity) {
        this.sku = sku;
        this.quantity = quantity;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }
}
```
`CustomerRequest.java`
```java
public class CustomerRequest {
    private String id;
    private String segment;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSegment() {
        return segment;
    }

    public void setSegment(String segment) {
        this.segment = segment;
    }
}
```
Adding in project structure:
```
api
├── PricingController.java
├── PricingEngineService.java
├── RuleSetRegistry.java
├── config
├── rest
│   ├── CartItemRequest.java
│   ├── CustomerRequest.java
│   ├── EvaluateRequest.java
│   ├── EvaluateResponse.java
│   ├── PricingRequest.java
│   └── TraceResponse.java
└── samples
```
**Instrumentation in engine code:**  
**DP-algorithm**  
`PriceCalculator.java`
```java
public DPTrace bestPriceFor(String sku, long remaining, PricingTraceCollector collector) {
    //... no run
    collector.recordDP("i=0", List.of(), ITEMS_0_KR, 0);
    //... before main loop
    List<String> optionsLabels = new ArrayList<>();
    optionsLabels.add("unitPrice x" + i + " = " + dp[i]);
    //... in options loop
    optionsLabels.add(opt.quantity() + " for " + opt.price() + " -> " + candidate);
    //... end of main loop
    collector.recordDP("i=" + i, optionsLabels, String.join(" + ", best), dp[i]);
}
```
**Rules**  
`RuleEngine.java`
```java
public RuleContext evaluate(RuleContext context, PricingTraceCollector collector) {
        context = applyCrossSkuRules(context, collector);

        return applySkuDiscount(context, collector);
}

private RuleContext applyCrossSkuRules(RuleContext context, PricingTraceCollector collector) {
    //... create RuleTrace
    RuleTrace rt = new RuleTrace();
    rt.setId(rule.id());
    rt.setName(rule.name());
    int beforePrice = computeTotalPrice(before, rules);
    rt.setBefore(beforePrice);
    //... record status after rule evaluation, within loop
    rt.setMatched(applied);
    int afterPrice = computeTotalPrice(after, rules);
    rt.setAfter(afterPrice);
    rt.setDelta(afterPrice - beforePrice);
    if(!applied) {
        rt.setReason("Rule conditions not met");
    }
    else {
        rt.setOutputs(Map.of("delta", delta,
                "newCounts", after.counts()));
    }
    if(collector != null)
        collector.recordRule(rt);
}

private RuleContext applySkuDiscount(RuleContext context, PricingTraceCollector collector) {
    //... create RuleTrace
    RuleTrace rt = new RuleTrace();
    rt.setId(rule.id());
    rt.setName(rule.name());
    int beforePrice = computeTotalPrice(before, rules);
    rt.setBefore(beforePrice);
    //... record status after rule evaluation, within loop
    rt.setMatched(applied);
    int afterPrice = computeTotalPrice(after, rules);
    rt.setAfter(afterPrice);
    rt.setDelta(afterPrice - beforePrice);
    if(!applied) {
        rt.setReason("Rule conditions not met");
    }
    else {
        rt.setOutputs(Map.of("delta", delta,
                "newCounts", after.counts()));
    }
    if(collector != null)
        collector.recordRule(rt);
}
```
`RuleEvaluator.java`
```java
public RuleDelta apply(CrossSkuBuyXGetYFree rule, RuleContext context,
                           PricingTraceCollector collector, RuleTrace rt) {
    //... record inputs
    rt.setInputs(Map.of("buySku", rule.buySku(),
            "freeSku", rule.freeSku(),
            "contextCounts", context.counts()));
    //...
}

public RuleDelta apply(CrossSkuBuyXGetYDiscount rule, RuleContext context,
                       PricingTraceCollector collector, RuleTrace rt) {
    //... record inputs
    rt.setInputs(Map.of("buySku", rule.buySku(),
            "discountSku", rule.discountSku(),
            "contextCounts", context.counts()));
    //...
}

public RuleDelta apply(SkuDiscount rule, RuleContext context,
                       PricingTraceCollector collector, RuleTrace rt) {
    rt.setInputs(Map.of("sku", rule.sku(),
            "discount", rule.discount(),
            "contextCounts", context.counts()));
    //...
}
```
Utility method to calculate total price at current state on the fly:
`PriceUtils.java`
```java
public final class PriceUtils {

    private PriceUtils() {}

    public static int computeTotalPrice(RuleContext context, PricingRules rules) {
        int total = 0;
        //Implement calculation
        return total;
    }
}
```
**Step trace**  
`RuleEngine.java`
```java
public RuleContext evaluate(RuleContext context, PricingTraceCollector collector) {
    int beforeCrossPrice = computeTotalPrice(context, rules);

    RuleContext afterCross = applyCrossSkuRules(context, collector);

    int afterCrossPrice = computeTotalPrice(afterCross, rules);
    if(collector != null) {
        collector.recordStep("Cross-SKU rules",
                "Evaluates cross-SKU promotions such as Buy X Get Y", beforeCrossPrice, afterCrossPrice);
    }

    RuleContext afterDiscount = applySkuDiscount(afterCross, collector);

    int afterDiscountPrice = computeTotalPrice(afterDiscount, rules);
    if(collector != null) {
        collector.recordStep("SKU-specific discounts",
                "Applies per-SKU discounts and price adjustments", afterCrossPrice, afterDiscountPrice);
    }

    return afterDiscount;
}
```
---
#### Refactoring for Rule Debugger
**Rule classes:**  
Adding fields in cross-sku for tracing:  
`SkuDiscount.java`
```java
public String id() {
        return String.format("%s-Discount", sku);
}
public String name() {
    return String.format("Buy %s at %.2f discount", sku, discount);
}
```
`CrossSkuRule.java`
```java
String id();
String name();
```
`CrossSkuBuyXGetYFree.java`
```java
public String id() {
    return String.format("CrossSkuBuy%dGet%dFree", buyQty, freeQty);
}
public String name() {
    return String.format("Buy %d of %s get %d of %s free", buyQty, buySku, freeQty, freeSku);
}
```
`CrossSkuBuyXGetYDiscount.java`
```java
public String id() {
        return String.format("CrossSkuBuy%dGet%dDiscount",  buyQty, discountQty);
}
public String name() {
    return String.format("Buy %d of %s get %d of %s at %.2f", buyQty, buySku,
                discountQty, discountSku, discount);
}
```
**New method signature for evaluator:**  
`IRuleEvaluator.java`
```java
public interface IRuleEvaluator {

    RuleDelta apply(CrossSkuBuyXGetYFree rule, RuleContext context, PricingTraceCollector collector, RuleTrace rt);
    RuleDelta apply(CrossSkuBuyXGetYDiscount rule, RuleContext context, PricingTraceCollector collector, RuleTrace rt);
    RuleDelta apply(SkuDiscount rule, RuleContext context, PricingTraceCollector collector, RuleTrace rt);
}
```
---
#### Adding `stepIndex` to trace
1. Add `stepIndex` when building DP-steps
2. Connect every rule to the DP-step where it applied
3. Connect every chain-step to DP-step

**Changes:**  
Currently two versions of tracing data are used and some rules are run before DP-loop. 
Refactoring and implementation changes can alleviate these complications, but currently both data structures has to be updated 
and in different places due to implementation. 
1. DPNode and DPTrace has to carry stepIndex  
    `PriceCalculator.java`
    ```java
    public DPTrace bestPriceFor(String sku, long remaining, PricingTraceCollector collector) {
        //...
        collector.recordDP("i=0", 0, List.of(), ITEMS_0_KR, 0);
        //...
        collector.recordDP("i=" + i, i, optionsLabels, String.join(" + ", best), dp[i]);
    }
    ```
    `DPNode.java`
    ```java
    public record DPNode(
        int stepIndex,
        int price,
        List<String> explanation
    ) {}
    ```
   `debug/DPTrace.java`
    ```java
    public class DPTrace {
        private int stepIndex;
        
        public void setState(String state) {
            this.state = state;
        }

        public int getStepIndex() {
            return stepIndex;
        }
    }
    ```
2. Set stepIndex in PricingTraceCollector
    `PricingTraceCollector.java`
    ```java
    public void recordStep(String step, int stepIndex, String description, double before, double after) {
        //...
        st.setStepIndex(stepIndex);
        //...
    }
    
    public void recordDP(String stateLabel, int stepIndex, List<String> options, String chosen, double priceAfter) {
        //...
        dp.setStepIndex(stepIndex);
        //...
    }
    ```
3. RuleTraceEvent needs stepIndex
    `RuleTraceEvent.java`
    ```java
    public record RuleTraceEvent(
        String ruleName,
        boolean applied,
        RuleDelta delta,
        RuleContext before,
        RuleContext after,
        int stepIndex
    ) {}
    ```
4. RuleTrace needs stepIndex
    `debug/RuleTrace.java`
    ```java
    private int stepIndex;
    //...
    public int getStepIndex() {
        return stepIndex;
    }

    public void setStepIndex(int stepIndex) {
        this.stepIndex = stepIndex;
    }
    ```
5. StepTrace needs stepIndex
    `StepTrace.java`
    ```java
    private int stepIndex;
    
    public int getStepIndex() {
        return stepIndex;
    }

    public void setStepIndex(int stepIndex) {
        this.stepIndex = stepIndex;
    }
    ```
6. Implement stepIndex in evaluate and apply-methods
    ```java
    public RuleContext evaluate(RuleContext context, PricingTraceCollector collector) {
        AtomicInteger stepIndex = new AtomicInteger(0);
        //...
        RuleContext afterCross = applyCrossSkuRules(context, collector, stepIndex);
        //...
        collector.recordStep("Cross-SKU rules", stepIndex.get()-1,
                    "Evaluates cross-SKU promotions such as Buy X Get Y", beforeCrossPrice, afterCrossPrice);
        //...
        RuleContext afterDiscount = applySkuDiscount(afterCross, collector, stepIndex);
        //...
        collector.recordStep("SKU-specific discounts", stepIndex.get()-1,
                    "Applies per-SKU discounts and price adjustments", afterCrossPrice, afterDiscountPrice);
        //...
    }
    
    private RuleContext applyCrossSkuRules(RuleContext context,
                                           PricingTraceCollector collector, AtomicInteger stepIndex) {
        //...
        rt.setStepIndex(stepIndex.getAndIncrement());
        //...
    }
    
    private RuleContext applySkuDiscount(RuleContext context,
                                         PricingTraceCollector collector, AtomicInteger stepIndex) {
    
        //...
        rt.setStepIndex(stepIndex.getAndIncrement());
        //...
    }
    ```

---
### Added SKU to DP-trace for mapping in UI
`DPTrace.java`
```java
private String sku;

public String getSku() {
    return sku;
}

public void setSku(String sku) {
    this.sku = sku;
}
```
`PricingTraceCollector.java`
```java
public void recordDP(String stateLabel, int stepIndex, List<String> options, String chosen, double price,
                     String sku) {
    DPTrace dp = new DPTrace();
    //...
    dp.setSku(sku);

    trace.getDp().add(dp);
}
```
`PriceCalculator.java`
```java
public DPTrace bestPriceFor(String sku, long remaining, PricingTraceCollector collector) {
    //...
    if(collector != null)
        collector.recordDP("i=0", 0, List.of(), ITEMS_0_KR, 0, sku);
    //...
    if(collector != null)
        collector.recordDP("i=" + i, i, optionsLabels, String.join(" + ", best), dp[i], sku);
    //...
}
```

---
### Including skipped rules in trace
`RuleEngine.java`
```java
private RuleContext applyCrossSkuRules(RuleContext context,
                                       PricingTraceCollector collector, AtomicInteger stepIndex) {
    boolean alreadyApplied = false;
    //...
    RuleDelta delta = alreadyApplied ? RuleDelta.none() : switch(rule) {
        //...
    };
    if(applied) {
        context = context.apply(delta);
        alreadyApplied = true;
    }
    //...
}
```
### Including PricingOptions in trace
TODO

---
### Normalize discount values
#### RuleTimeLine (Rule Inspector)
Making sure the same convention holds for all rules:
- discount = discount
- rate = rate

These should never be mixed up.

---
### Refactoring
- Minor code styling fixes
- Extraction into helper-methods when appropriate
- Simplify code when appropriate
- Reuse code when possible
- Remove unused code or make sure all functionality is used
- Identifying bugs or potential improvements for later
  - Issues for stackability and priority for some rule combinations
- Extracting ruleset creation for unit tests:
  - Reusable builder-pattern methods
  - Separate rulesets
- #### Moving price calculation code to its own package
  - DP algorithm in separate package
  - Main algorithm class:
  ```java
  public BestPriceAlgorithm(PricingRules rules, PricingTraceCollector collector) {}
  
  public DPTrace bestPriceFor(String sku, long remaining) {}
  ```
  - Candidate calculator as separate class:
  ```java
  public CandidateCalculator(PricingRules rules, String sku) {}
  
  public Candidate candidateFor(int[] dp, int i, List<List<String>> path){}
  ```
- #### Separating Rule Engine logic:
  - Engine
  ```java
  public RuleEngine(PricingRules rules, RuleTracer tracer, PricingTraceCollector collector) {}
  
  public RuleContext evaluate(RuleContext context) {}
  ```
  - Application
    - Step
      ```java
      public StepApplier(PricingRules rules, RuleTracer tracer, PricingTraceCollector collector) {}
      
      public RuleContext applyCrossSkuRules(RuleContext context, AtomicInteger stepIndex) {}
      
      public RuleContext applySkuDiscount(RuleContext context, AtomicInteger stepIndex) {}
      ```
    - Rules
      ```java
      public DiscountRuleApplier(PricingRules rules, RuleTracer tracer, AtomicInteger stepIndex) {}
    
      public RuleApplication apply(RuleContext context, SkuDiscount rule) {}
      ```
      ```java
      public CrossRuleApplier(PricingRules rules, RuleTracer tracer, AtomicInteger stepIndex) {}
    
      public RuleApplication apply(RuleContext context, CrossSkuRule rule, boolean skip) {}
      ```
  - Evaluation
    ```java
    public RuleEvaluator(PricingRules rules) {}
    
    public RuleDelta apply(CrossSkuBuyXGetYFree rule, RuleContext context, RuleTrace rt) {}
    
    public RuleDelta apply(CrossSkuBuyXGetYDiscount rule, RuleContext context, RuleTrace rt) {}
    
    public RuleDelta apply(SkuDiscount rule, RuleContext context, RuleTrace rt) {}
    ```
- #### Keeping data format handling separated from logic
  - `rest` package
  - Internal format in `tracing.debug` package
  - ServiceUtils
  ```java
  public static CartSnapshot fromRequest(PricingRequest req, PricingRules rules) {}
  ```
---
### Refactor to enable Rule Inspector and Debugger to use same data format
- Use same input format
- Merge endpoint logic
- Combine Tracer and Collector logic
- #### Reuse logic in Service and Checkout, encapsulate service-logic in Checkout
  New Checkout structure with utilities:
  - `Checkout.java`
  ```java
  public Checkout(PricingRules rules) {}
  public Checkout(PricingRules rules, CartSnapshot cart, String ruleSet) {}
  
  public void scan(String unit) {}
  
  public TraceResult run() {}
  
  public int total() {}
  ```
  Where `run()` will run engine and output result for both Rule Inspector and Debugger.
  Both cart and scanned items are merged and used as input.
  `total()` can still be used by tests run the same but isolate the final price.
  - `Cart.java`
  ```java
  public Cart(PricingRules rules, CartSnapshot initialCart) {}
  
  public void add(String unit) {}
  
  public CartSnapshot getCart() {}
  ```
  Isolates the input handling.
  - `ResultBuilder.java`
  ```java
  public ResultBuilder(PricingRules rules, PricingTraceCollector collector) {}
  
  public TraceResult buildResult(RuleContext ctx) {}
  ```
  Isolates output handling. Includes the price calculation algorithm.
- #### TODO Avoid duplicated data
---

### Minor fixes
- Avoid conversion between int and long by changing all counts to use integer.
- Using proper logger for `RuleInspectorView.java`
- Always use decimals for price data

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
---
### User Interface testing
#### Manual server poke
To test the backend endpoint you can use the following curl command:
```shell
curl -X POST http://localhost:8080/api/evaluate \
  -H "Content-Type: application/json" \
  -d '{"cart":{"A":3,"B":4},"ruleSet":"default"}'
```
You should get:
```json
{
  "trace": {
    "events": [...],
    "skuTraces": [...],
    "dpTraces": [...],
    "finalTotal": 445
  }
}
```
#### Sample rulesets
- DefaultRules – base rules, simple special prices
- CampaignARules – aggressive campaign with more discounts
- CampaignBRules – premium campaign with cross‑SKU‑logic
`DefaultRules.java`
```java
import java.util.List;
import java.util.Map;

public class DefaultRules {

    public static PricingRules build() {

        Map<String, Integer> unitPrices = Map.of(
                "A", 50,
                "B", 40,
                "C", 25,
                "D", 20
        );

        Map<String, List<PricingOption>> options = Map.of(
                "A", List.of(
                        new PricingOption(3, 130, true)   // 3-for-130
                ),
                "B", List.of(
                        new PricingOption(2, 40, false)   // 2-for-40 (non-stackable)
                ),
                "C", List.of(),
                "D", List.of()
        );

        List<CrossSkuBuyXGetYFree> freeRules = List.of(
                // no cross-SKU in default
        );

        List<CrossSkuBuyXGetYDiscount> discountRules = List.of(
                // no cross-SKU in default
        );

        List<SkuDiscount> skuDiscounts = List.of(
                // no per-SKU discounts in default
        );

        return new PricingRules(unitPrices, options, freeRules, discountRules, skuDiscounts);
    }
}
```
`CampaignARules.java`
A campaign with:
- More special prices
- cross-SKU free
- per-SKU discount

```java
import com.tdd.PricingRules;
import com.tdd.rules.*;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.cross.CrossSkuBuyXGetYFree;

import java.util.List;
import java.util.Map;

public class CampaignARules {

    public static PricingRules build() {

        Map<String, Integer> unitPrices = Map.of(
                "A", 50,
                "B", 40,
                "C", 25,
                "D", 20
        );

        Map<String, List<PricingOption>> options = Map.of(
                "A", List.of(
                        new SpecialPrice(3, 120, 1, true),   // better deal than default
                        new SpecialPrice(5, 180, 1, true)    // 5-for-180
                ),
                "B", List.of(
                        new BuyXGetYFree(2, 40, 2, false)    // buy one, get one free
                ),
                "C", List.of(
                        new SpecialPrice(4, 70, 1, true)     // 4-for-70
                ),
                "D", List.of()
        );

        List<CrossSkuBuyXGetYFree> freeRules = List.of(
                new CrossSkuBuyXGetYFree(
                        "A", 2,
                        "C", 1,
                        10,   // priority
                        true  // stackable
                )
        );

        List<CrossSkuBuyXGetYDiscount> discountRules = List.of(
                new CrossSkuBuyXGetYDiscount(
                        "B", 2,
                        "D", 1,
                        0.50, // 50% off D
                        5,
                        false
                )
        );

        List<SkuDiscount> skuDiscounts = List.of(
                new SkuDiscount("C", 0.10, 1)  // 10% off C
        );

        return new PricingRules(unitPrices, options, freeRules, discountRules, skuDiscounts);
    }
}
```
`CampaignBRules.java`
A more advanced campaign with:
- cross-SKU free
- cross-SKU discount
- per-SKU discount
- premium special prices

```java
import com.tdd.PricingRules;
import com.tdd.rules.*;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.cross.CrossSkuBuyXGetYFree;

import java.util.List;
import java.util.Map;

public class CampaignBRules {

    public static PricingRules build() {

        Map<String, Integer> unitPrices = Map.of(
                "A", 50,
                "B", 40,
                "C", 25,
                "D", 20,
                "E", 60
        );

        Map<String, List<PricingOption>> options = Map.of(
                "A", List.of(
                        new SpecialPrice(3, 130, 1, true),  //3-for-130
                        new SpecialPrice(6, 240, 1, true)   //6-for-240
                ),
                "B", List.of(
                        new SpecialPrice(2, 40, 1, false)    // 2-for-40
                ),
                "C", List.of(
                        new SpecialPrice(5, 100, 1, true)   // 5-for-100
                ),
                "D", List.of(),
                "E", List.of(
                        new SpecialPrice(2, 90, 1, true)   // 2-for-90
                )
        );

        List<CrossSkuBuyXGetYFree> freeRules = List.of(
                new CrossSkuBuyXGetYFree(
                        "E", 2,
                        "A", 1,
                        20,
                        false
                )
        );

        List<CrossSkuBuyXGetYDiscount> discountRules = List.of(
                new CrossSkuBuyXGetYDiscount(
                        "A", 3,
                        "B", 1,
                        0.25, // 25% off B
                        15,
                        true
                )
        );

        List<SkuDiscount> skuDiscounts = List.of(
                new SkuDiscount("D", 0.20, 1), // 20% off D
                new SkuDiscount("E", 0.10, 2)  // 10% off E
        );

        return new PricingRules(unitPrices, options, freeRules, discountRules, skuDiscounts);
    }
}
```
---
### Ruleset tests
#### With standard input
These tests run with a standard input:
- 5 A
- 4 B
- 3 C
- 2 D
- 1 E

against the sample rulesets:
- Default
- Campaign A
- Campaign B

`RulesetTest.java`
```java
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
```
`SKUs.java`
```java
public enum SKUs {
    A(50),
    B(40),
    C(25),
    D(20),
    E(10);

    public final int unitPrice;

    SKUs(int unitPrice) {
        this.unitPrice = unitPrice;
    }
}
```
`Ruleset.java`
```java
public interface Ruleset {
    Map<String, Integer> DEFAULT_UNIT_PRICES = Arrays.stream(SKUs.values())
            .collect(toMap(Enum::name, sku -> sku.unitPrice));
}
```
---