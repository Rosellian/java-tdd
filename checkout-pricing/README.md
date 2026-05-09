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
public class PricingRules {
    
    public void addUnitPrice(String sku, int price) {}
    
    public int getUnitPrice(String sku) {}
}
```
- `Checkout.java`
```java
public class Checkout {
    
    public Checkout(PricingRules rules) {}
    
    public void scan(String sku) {}
    
    public int total() {}
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
public record CrossSkuBuyXGetYFree(String buySku, int buyQty, String freeSku, int freeQty, boolean stackable, 
                                   int priority) {}
```
- **Buy X of A, get Y of B at discount**
`CrossSkuBuyXGetYDiscount.java`
```java
public record CrossSkuBuyXGetYDiscount(String buySku, int buyQty, String discountSku, int discountQty, 
                                       double discount, // e.g. 0.5 for 50%
                                       boolean stackable, int priority) {}
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
This makes Checkout class much cleaner since the different steps can be handled by separate classes:  
**Main step:**  
`RuleEngine.java`
```java
public class RuleEngine {

    public RuleEngine(PricingRules rules) {}

    public List<CrossSkuRule> getOrderedCrossSkuRules() {}

    public List<SkuDiscount> getSkuDiscounts() {}
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

   public PriceCalculator(PricingRules rules) {}

   public int calculateTotal(Map<String, Long> counts, Map<String, SkuMod> mods) {
       //Implement calculation of total including DP-algorithm
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
public record RuleContext(Map<String, Long> counts, Map<String, SkuMod> mods) {

    public RuleContext copy() {}

    public long countOf(String sku) {}

    public SkuMod modOf(String sku) {}
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
public record RuleDelta(Map<String, Long> countChanges, Map<String, SkuMod> modChanges, boolean applied) {

    public static RuleDelta none() {}
}
```
Applying a rule will then have the following work flow:
1. RuleContext -> RuleDelta
2. RuleContext + RuleDelta -> RuleContext

For complete immutability counts should not be changed so RuleDelta becomes:
`RuleDelta.java`
```java
public record RuleDelta(Map<String, SkuMod> modChanges, boolean applied) {

    public static RuleDelta none() {}
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
public record RuleDebugEvent(String ruleName, boolean applied, RuleDelta delta, RuleContext before, 
                             RuleContext after) {}
```
`RuleDebugger.java`
```java
public class RuleDebugger {

    public void log(String ruleName, boolean applied, RuleDelta delta, RuleContext before, RuleContext after) {}

    public List<RuleDebugEvent> events() {}

    public void print() {}
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

    public RuleInspector(List<RuleDebugEvent> events) {}

    public List<RuleDebugEvent> events() {}
}
```
`RuleInspectorView.java` - Textbased rendering
```java
public class RuleInspectorView {

    public static void print(RuleInspector inspector) {}

    private static void printContext(RuleContext ctx) {}
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

Will enable further visualization. 
Builds upon current implementation but adds more data through new component RuleTrace.  
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
public record RuleTrace(List<RuleDebugEvent> events, List<SkuTrace> skuTraces, int finalTotal) {}
```
`SkuTrace.java`
```java
public record SkuTrace(String sku, long count, long free, long discounted, double rate, long remaining, int unitPrice,
                       int discountedPrice, int dpPrice, int total) {}
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

    public RuleInspector(PricingRules rules, PriceCalculator calculator) {}

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
    public record DPNode(int index, int price, List<String> explanation) {}
    ```
- And a Dp-trace
    `DPTrace.java`
    ```java
    public record DPTrace(String sku, long remaining, List<DPNode> nodes, int finalPrice, List<String> winningPath) {}
    ```
- Change implementation in PriceCalculator and add logging
    `PriceCalculator.java`
    ```java
    public DPTrace bestPriceTrace(String sku, long remaining) {}
    ```
- Integrate DP-trace in RuleInspector
  `RuleInspector.java`
    ```java
    public class RuleInspector {
  
        public RuleTrace inspect(RuleContext finalContext, List<RuleDebugEvent> events) {}
    }
    ```
- And extend RuleTrace:  
  `Ruletrace.java`
    ```java
    public record RuleTrace(List<RuleDebugEvent> events, List<SkuTrace> skuTraces, List<DPTrace> dpTraces, 
  int finalTotal) {}
    ```
- Add log visualization:  
    `RuleInspectorView.java`
    ```java
    import java.util.List;
  public class RuleInspectorView {

        public static void printDP(DPTrace dp) {}
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
   
        public EvaluateResponse(RuleTrace trace) {}
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
    @Service
    public class PricingEngineService {

        public RuleTrace evaluate(Map<String, Long> cart, String ruleSetName) {}
    }
    ```
3. RuleSetRegistry - Choose rule set  
Add any additional rulesets here.
    `RuleSetRegistry.java`
    ```java
    public class RuleSetRegistry {

        public static PricingRules get(String name) {}
    }
    ```
4. REST-controller: `/api/evaluate`
    `PricingController.java`
    ```java
    @RestController
    @RequestMapping("/api")
    public class PricingController {

        public PricingController(PricingEngineService service) {}

        @PostMapping("/evaluate")
        public EvaluateResponse evaluate(@RequestBody EvaluateRequest req) {}
    }
    ```
5. CORS (if React runs on localhost:3000)
    `CorsConfig.java`
    ```java
    @Configuration
    public class CorsConfig {

        @Bean
        public WebMvcConfigurer corsConfigurer() {
            return new WebMvcConfigurer() {
                @Override
                public void addCorsMappings(@NonNull CorsRegistry registry) {}
            };
        }
    }
    ```
**Backend App**
`CheckoutApplication.java`
```java
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

        public CartSnapshot getCart() {}
        public void setCart(CartSnapshot cart) {}
    
        public List<RuleTrace> getRules() {}
        public void setRules(List<RuleTrace> rules) {}
    
        public List<StepTrace> getSteps() {}
        public void setSteps(List<StepTrace> steps) {}
    
        public List<DPTrace> getDp() {}
        public void setDp(List<DPTrace> dp) {}
    
        public List<Double> getPriceEvolution() {}
        public void setPriceEvolution(List<Double> priceEvolution) {}
    
        public double getFinalPrice() {}
        public void setFinalPrice(double finalPrice) {}
    
        public Metadata getMetadata() {}
        public void setMetadata(Metadata metadata) {}
    }
    ```
2. `RuleTrace.java`
    ```java
    public class RuleTrace {

        public String getId() {}
        public void setId(String id) {}

        public String getName() {}
        public void setName(String name) {}

        public boolean isMatched() {}
        public void setMatched(boolean matched) {}

        public String getReason() {}
        public void setReason(String reason) {}

        public double getAfter() {}
        public void setAfter(double after) {}

        public double getBefore() {}
        public void setBefore(double before) {}

        public double getDelta() {}
        public void setDelta(double delta) {}

        public Map<String, Object> getInputs() {}
        public void setInputs(Map<String, Object> inputs) {}

        public Map<String, Object> getOutputs() {}
        public void setOutputs(Map<String, Object> outputs) {}
    }
    ```
3. `StepTrace.java`
    ```java
    public class StepTrace {

        public String getStep() {}
        public void setStep(String step) {}

        public String getDescription() {}
        public void setDescription(String description) {}

        public double getPriceBefore() {}
        public void setPriceBefore(double priceBefore) {}

        public double getPriceAfter() {}
        public void setPriceAfter(double priceAfter) {}
    }
    ```
4. `DPTrace.java`
    ```java
    public class DPTrace {

        public String getState() {}
        public void setState(String state) {}

        public List<String> getOptions() {}
        public void setOptions(List<String> options) {}

        public String getChosen() {}
        public void setChosen(String chosen) {}

        public double getPrice() {}
        public void setPrice(double price) {}
    }
    ```
5. `CartSnapshot.java`
    ```java
    public class CartSnapshot {

        public List<CartItem> getItems() {}
        public void setItems(List<CartItem> items) {}

        public CustomerInfo getCustomer() {}
        public void setCustomer(CustomerInfo customer) {}

        public Map<String, Object> getContext() {}
        public void setContext(Map<String, Object> context) {}
    }
    ```
6. `CartItem.java`
    ```java
    public class CartItem {

        public CartItem(String sku, int quantity, double unitPrice) {}

        public String getSku() {}
        public void setSku(String sku) {}

        public int getQuantity() {}
        public void setQuantity(int quantity) {}

        public double getUnitPrice() {}
        public void setUnitPrice(double unitPrice) {}
    }
    ```
7. `CustomerInfo.java`
    ```java
    public class CustomerInfo {

        public String getId() {}
        public void setId(String id) {}

        public String getSegment() {}
        public void setSegment(String segment) {}
    }
    ```
8. `Metadata.java`
    ```java
    public class Metadata {

        public String getRuleSet() {}
        public void setRuleSet(String ruleSet) {}

        public String getTimestamp() {}
        public void setTimestamp(String timestamp) {}

        public String getEngineVersion() {}
        public void setEngineVersion(String engineVersion) {}
    }
    ```
9. `PricingTraceCollector.java`
    ```java
    public class PricingTraceCollector {

        public PricingTraceCollector(CartSnapshot cart, String ruleset, String engineVersion) {}

        public void recordRule(RuleTrace rt) {}

        public void recordStep(StepTrace st) {}
   
        public void recordStep(String step, String description, double before, double after) {}

        public void recordDP(DPTrace dp) {}

        public void recordDP(String stateLabel, List<String> options, String chosen, double priceAfter) {}

        public void setFinalPrice(double finalPrice) {}

        public PricingTrace build() {}
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
public TraceResponse getTrace(@RequestBody EvaluateRequest req) {}
```
`TraceResponse.java`
```java
public class TraceResponse {
    public PricingTrace trace;

    public TraceResponse(PricingTrace trace) {}
}
```
**Using internal request data structure in service**
`PricingEngineService.java`
```java

public PricingTrace getTrace(PricingRequest request) {}

private CartSnapshot toCartSnapshot(PricingRequest req, PricingRules rules) {}
```
New request format used internally at this point:  
`PricingRequest.java`
```java
public class PricingRequest {

    public String getRuleSet() {}
    public void setRuleSet(String ruleSet) {}

    public List<CartItemRequest> getItems() {}
    public void setItems(List<CartItemRequest> items) {}

    public CustomerRequest getCustomer() {}
    public void setCustomer(CustomerRequest customer) {}

    public Map<String, Object> getContext() {}
    public void setContext(Map<String, Object> context) {}
}
```
`CartItemRequest.java`
```java
public class CartItemRequest {

    public CartItemRequest(String sku, long quantity) {}

    public String getSku() {}
    public void setSku(String sku) {}

    public long getQuantity() {}
    public void setQuantity(long quantity) {}
}
```
`CustomerRequest.java`
```java
public class CustomerRequest {

    public String getId() {}
    public void setId(String id) {}

    public String getSegment() {}
    public void setSegment(String segment) {}
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
public DPTrace bestPriceFor(String sku, long remaining, PricingTraceCollector collector) {}
```
**Rules**  
`RuleEngine.java`
```java
public RuleContext evaluate(RuleContext context, PricingTraceCollector collector) {}

private RuleContext applyCrossSkuRules(RuleContext context, PricingTraceCollector collector) {}

private RuleContext applySkuDiscount(RuleContext context, PricingTraceCollector collector) {}
```
`RuleEvaluator.java`
```java
public RuleDelta apply(CrossSkuBuyXGetYFree rule, RuleContext context, 
                       PricingTraceCollector collector, RuleTrace rt) {}

public RuleDelta apply(CrossSkuBuyXGetYDiscount rule, RuleContext context, 
                       PricingTraceCollector collector, RuleTrace rt) {}

public RuleDelta apply(SkuDiscount rule, RuleContext context,
                       PricingTraceCollector collector, RuleTrace rt) {}
```
Utility method to calculate total price at current state on the fly:
`PriceUtils.java`
```java
public final class PriceUtils {

    private PriceUtils() {}

    public static int computeTotalPrice(RuleContext context, PricingRules rules) {}
}
```
**Step trace**  
1. Compute before price
2. Apply cross rules
3. Compute and record price delta
4. Apply discounts
5. Compute and record price delta
`RuleEngine.java`
```java
public RuleContext evaluate(RuleContext context, PricingTraceCollector collector) {}
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
Refactoring and implementation changes can alleviate these complications, but currently both data structures has to be 
updated and in different places due to implementation. 
1. DPNode and DPTrace has to carry stepIndex  
    `PriceCalculator.java`
    ```java
    public DPTrace bestPriceFor(String sku, long remaining, PricingTraceCollector collector) {}
    ```
    `DPNode.java`
    ```java
    public record DPNode(int stepIndex, int price, List<String> explanation) {}
    ```
   `debug/DPTrace.java`
    ```java
    public class DPTrace {
        
        public void setState(String state) {}

        public int getStepIndex() {}
    }
    ```
2. Set stepIndex in PricingTraceCollector
    `PricingTraceCollector.java`
    ```java
    public void recordStep(String step, int stepIndex, String description, double before, double after) {}
    
    public void recordDP(String stateLabel, int stepIndex, List<String> options, String chosen, double priceAfter) {}
    ```
3. RuleTraceEvent needs stepIndex
    `RuleTraceEvent.java`
    ```java
    public record RuleTraceEvent(String ruleName, boolean applied, RuleDelta delta, RuleContext before,
    RuleContext after, int stepIndex) {}
    ```
4. RuleTrace needs stepIndex
    `debug/RuleTrace.java`
    ```java
    public int getStepIndex() {}

    public void setStepIndex(int stepIndex) {}
    ```
5. StepTrace needs stepIndex
    `StepTrace.java`
    ```java
    
    public int getStepIndex() {}

    public void setStepIndex(int stepIndex) {}
    ```
6. Implement stepIndex in evaluate and apply-methods
    ```java
    public RuleContext evaluate(RuleContext context, PricingTraceCollector collector) {}
    
    private RuleContext applyCrossSkuRules(RuleContext context, 
                                           PricingTraceCollector collector, AtomicInteger stepIndex) {}
    
    private RuleContext applySkuDiscount(RuleContext context,
                                         PricingTraceCollector collector, AtomicInteger stepIndex) {}
    ```
---
### Added SKU to DP-trace for mapping in UI
`DPTrace.java`
```java
public String getSku() {}
public void setSku(String sku) {}
```
`PricingTraceCollector.java`
```java
public void recordDP(String stateLabel, int stepIndex, List<String> options, String chosen, double price, String sku) {}
```
`PriceCalculator.java`
```java
public DPTrace bestPriceFor(String sku, long remaining, PricingTraceCollector collector) {}
```
---
### Including skipped rules in trace
Running through all cross rules without applying effect, recording them as skipped when another rule already applied.
### Including PricingOptions in trace
- SKU value added to trace
- Pricing options logged as rule traces by collector in DP-algorithm (`CandidateCalculator.java` specifically)

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
- Adding complete support for initial cart plus added items. 
  Using correct merge logic for different sets of SKUs between the inputs.
- Prepare SKU-rules (Pricing Options) to be added to Rule timeline
  - Adding buy and get quantity to BuyXGetYFree-rules and BuyXGetYDiscount-rules
  - Adding discount to BuyXGetYDiscount-rules
  - Adding id and name to `PricingOption.java` by extending `Rule.java`
---
### Improve SKU-rule tracing
Adding SKU-rules to trace only once and with actual effect.  
Moving CandidateRecorder one level up:
`CandidateRecorder` -> `SkuRuleRecorder`  
```java
public SkuRuleRecorder(String sku) {}

public void addSkuRuleApplied(int stepIndex, PricingOption skuRule) {}

public void recordTrace() {}
```
It records traces in 2 steps:
1. Creates rule trace for applied rule
2. Calculates effect and passes complete rule trace to collector

#### Including skipped SKU-rules
- Adding all SKU-rules to trace
- Only setting matched as true for rules in chosen price path

---
### Logging and refactoring
#### Logging
- RuleInspectorView using compact logger format
- Adding logging to evaluation steps
  - API
  - Rule Engine steps through:
    - PricingEngineService
    - StepRecorder
  - Rule Evaluator
  - DP-algorithm
#### Refactoring
- Improve RuleApplier code by avoiding inheritance

---
## Testing
### Test cases
#### Base tests
**Test 1:** one product, no special price
```java
@Test
    void scanningSingleItemReturnsItsPrice() {}
```
**Test 2:** Special price for A
```java
@Test
void appliesThreeFor130SpecialPrice() {}
```
**Test 3:** 2 for 45 for B
```java
@Test
void appliesTwoFor45SpecialPrice() {}
```
**Test 4:** Mixed products
```java
@Test
void calculatesTotalForMixedProductsWithSpecialPrices() {}
```
**Test 5:** Order independence
```java
@Test
void scanningOrderDoesNotAffectTotal() {}
```
**Test 6:** Mixed products with and without special prices.
```java
@Test
void calculatesTotalForMixedProductsWithAndWithoutSpecialPrices() {}
```
**Test 7:** Multiple special prices for the same SKU.
```java
@Test
void appliesBestSpecialPriceWhenMultipleSpecialPricesExist() {}
```
**Test 8:** Combined special prices
```java
@Test
void combinesMultipleSpecialPricesToGetBestTotal() {}
```
**Test 9:** Priority between special prices
```java
@Test
void choosesBestCombinationWhenSpecialPricesConflict() {}
```
---
#### Adding new rule type - Buy x get Y free
**Test 10:** Buy X get Y free
```java
@Test
void appliesBuyOneGetOneFree() {}
```
**Test 11:** Buy 1, get 1 free with more than two products.
```java
@Test
void appliesBuyOneGetOneFreeForMultiplePairs() {}
```
**Test 12:** Buy X Get Y Free and special prices at the same time.
```java
@Test
void choosesBestPriceAcrossDifferentRuleTypes() {}
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
void choosesOptimalCombinationBetweenBuyXGetYFreeAndSpecialPrices() {}
```
Rules:
- A has unit price 50
- Buy 1, get 1 free, non-stackable
- 3 for 100

Cases:
1. 3 items → best is 3-for-100
2. 4 items → best is 3-for-100 + 1×50 = 150
3. 5 items → best is 3-for-100 + buy-1-get-1-free = 150
4. 6 items → best is 3-for-100 + 3-for-100 = 200
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
void buyOneGetOneFreeIsStackableForA() {}
```
**Test 15:** Buy‑1‑get‑1‑free is not stackable for SKU B
```java
@Test
void buyOneGetOneFreeIsNotStackableForB() {}
```
**Test 16:** A stackable, B non‑stackable in same checkout.
```java
@Test
void stackabilityIsPerSku() {}
```
---
#### Adding new rule type - Buy X, get y at discount
**Test 17:** Buy 2, get 1 half price
```java
@Test
void appliesBuyTwoGetOneHalfPrice() {}
```
**Test 18:** Full Combination Stress Test
- A: has special price + stackable buy‑X‑get‑Y‑free
- B: has special price + non‑stackable buy‑X‑get‑Y‑free
- C: has buy‑X‑get‑Y‑discount (stackable)
```java
@Test
void combinesAllRuleTypesWithPriorityAndStackability() {}
```
Cart:
- A: 6
- B: 4
- C: 5

Unit Prices:
- A = 50
- B = 40
- C = 30

Rules:
- A
  - 3 for 120 (priority 1, stackable)
  - buy 1, get 1 free (stackable)
- B
  - 2 for 70 (priority 1)
  - buy 1, get 1 free (non-stackable)
- C
  - buy 2, get 1 at 50% discount (stackable)
---
#### Adding Cross-SKU pricing rule
**Test 19:** Cross‑SKU: Buy X of A, get Y of B free. 
Specific: Buy 2 of A, get 1 of B free
```java
@Test
void buyTwoAGetOneBFree() {}
```
**Test 20:** Cross‑SKU + stackability.
Buy 2 A → get 1 B free stackable
```java
@Test
void crossSkuStackable() {}
```
**Test 21:** Cross‑SKU non‑stackable.
Buy 2 A → get 1 B free non-stackable
```java
@Test
void crossSkuNonStackable() {}
```
**Test 22:** Cross‑SKU + SpecialPrice (which rule wins?).
Rules:
- Cross‑SKU: Buy 2 A → get 1 B free (priority 0, non‑stackable)
- Special A: 3‑for‑120
- Special B: 2‑for‑70
```java
@Test
void crossSkuBeatsSpecialPriceWhenHigherPriority() {}
```
Unit Prices: A=50, B=40  
Cart: 3A 2B  
Expected:
- Cross-SKU gives 1 free B
- 3A-for-120
- 1B for 40
- Total = 160
---
#### Adding another cross-SKU rule
**Test 23:**  Buy X of A, get Y of B at discount.
Specific: Buy 2 of A → get 1 of B at 50% discount
```java
@Test
void crossSkuBuyXGetYAtDiscount() {}
```
**Test 24:** Cross‑SKU discount + special price (which rule wins?).
Cross‑SKU discount beats special price when it has higher priority.
```java
@Test
void crossSkuDiscountBeatsSpecialPriceWhenHigherPriority() {}
```
**Cross‑SKU free + Cross‑SKU discount (priority decides):**  
**Test 25:** Free rule wins over discount rule
```java
@Test
void crossSkuFreeBeatsDiscountWhenHigherPriority() {}
```
**Test 26:** Discount wins over free
```java
@Test
void crossSkuDiscountBeatsFreeWhenHigherPriority() {}
```
**Test 27:** Cross‑SKU DISCOUNT + Special price (combined optimization).
```java
@Test
void crossSkuDiscountAndSpecialPriceCombinedOptimization() {}
```
Unit Prices: A=50, B=40  
Cart: 2A 3B  
Rules:
- Buy 2 A → get 1 B at 50% discount (priority 0)
- 3B-for-90 (priority 1)
Expected:
- Cross-SKU: 1 B at 20
- Remaining B: 2 × 40 = 80
- A: 100
- Total = 200

**Test 28:** Cross‑SKU FREE + Cross‑SKU FREE (stackability + priority).
Two FREE‑rules, both stackable, higher priority wins.
```java
@Test
void higherPriorityFreeRuleWinsWhenBothAreStackable() {}
```
**Test 29:** Two FREE‑rules, both stackable, but lower priority is “stronger”.
```java
@Test
void higherPriorityFreeRuleWinsEvenIfLowerPriorityIsMoreGenerous() {}
```
---
#### Adding SKU-specific discount rule
**Test 30:** Cross‑SKU DISCOUNT + SKU‑specific discount (which wins?)
Cross‑SKU DISCOUNT wins over SKU‑discount
```java
@Test
void crossSkuDiscountBeatsSkuDiscountWhenHigherPriority() {}
```
**Test 31:** SKU‑discount wins over Cross‑SKU DISCOUNT
```java
@Test
void skuDiscountBeatsCrossSkuDiscountWhenHigherPriority() {}
```
---
### Ruleset tests
#### Sample rulesets
- DefaultRules – base rules, simple special prices
- CampaignARules – aggressive campaign with more discounts
- CampaignBRules – premium campaign with cross‑SKU‑logic

Unit Prices:
- A = 50
- B = 40
- C = 25
- D = 20
- E = 10

`DefaultRules.java`
```java
public class DefaultRules {

    public static PricingRules build() {}
}
```
Rules:
- 3A-for-130
- 2B-for-40

`CampaignARules.java`
```java
public class CampaignARules {

    public static PricingRules build() {}
}
```
Rules:
- 3A for 120
- 5A for 180
- Buy 1B, get 1 free
- 4C for 70
- Buy 2A, get 1C free
- Buy 2B, get 1D at 50%
- C SKU-discount 10%

`CampaignBRules.java`
```java
public class CampaignBRules {

    public static PricingRules build() {}
}
```
Unit price change:
- E = 60

Rules:
- 3A for 130
- 6A for 240
- 2B for 40
- 5C for 100
- 2E for 90
- Buy 2E, get 1A free
- Buy 3A, get 1B with 25% discount
- D SKU-discount 20%
- E SKU-discount 10%

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
    public void defaultRulesetStandardInput() {}

    @Test
    public void CampaignARulesetStandardOutput() {}

    @Test
    public void CampaignBRulesetStandardInput() {}
}
```
---