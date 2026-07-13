# Hospital triage & resource allocation engine
Simulates a system for deciding triage level priority for incoming patients and allocating available resources.
Includes:
- Rule engine
- Simulation
- Admin UI
- Trace views for results

## Architecture
### Main domain
Data structures for patients:
```java
public record Patient(
        String id,
        String name,
        int age,
        VitalSigns vitals,
        List<String> symptoms,
        TriageLevel triageLevel
) {}
```
Common vital sign values:
```java
public record VitalSigns(
        int hearRate,
        int systolicBP,
        int diastolicBP,
        int oxygenSaturation,
        double temperature
) {}
```
Priority level for patients:
```java
public enum TriageLevel {
    RED, ORANGE, YELLOW, GREEN
}
```

### Triage evaluation
Rules:
```java
public record TriageRule(
        String id,
        String name,
        Condition condition,
        TriageLevel result
) {}
```
Rule evaluation engine:
```java
public class TriageEngine {

    public TriageResult evaluate(Patient patient) {}
}
```
Condition with criteria to match a patients information:
```java
@FunctionalInterface
public interface Condition {

    boolean matches(Patient patient);
}
```

### Resource allocation
Engine for resource allocation:
```java
public class ResourceAllocator {

    public AllocationDecision allocate(Patient patient, List<Resource> resources) {}
}
```

### Tracing data
```java
public record TraceStep(
        String label,
        String detail,
        TraceType type
) {}
```
```java
public enum TraceType {
    RULE_MATCH,
    RULE_FAIL,
    RESOURCE_OK,
    RESOURCE_BUSY,
    FALLBACK
}
```

### Project structure

## Testing
Unit testing separated per engine component.
### Triage
#### Base tests
Basic tests for Triage level.
```java
void redPatientGetsRedTriage() {}
```

### Resource allocation
#### Base tests
Basic tests for allocating resource depending on triage level and availability.
```java
void redPatientGetsIcuBedIfAvailable() {}

void busyResourceCausesWait() {}
```