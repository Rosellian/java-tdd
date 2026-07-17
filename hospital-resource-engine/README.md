# Hospital triage & resource allocation engine
Simulates a system for deciding triage level priority for incoming patients and allocating available resources.
Includes:
- Rule engine
- Simulation
- Admin UI
- Trace views for results

## Architecture
### Main domain
#### Patients
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
#### Resources
Data structure for resources:
```java
public record Resource(
        String id,
        ResourceType type,
        int capacity,
        int used
) {}
```
Types of resources:
```java
public enum ResourceType {
    ICU_BED, SURGERY_ROOM, NURSE, DOCTOR, VENTILATOR
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
Condition with criteria to match a patient's information:
```java
@FunctionalInterface
public interface Condition {

    boolean matches(Patient patient);
}
```
Rule evaluation engine:
```java
public class TriageEngine {

    public TriageResult evaluate(Patient patient) {}
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

### API
#### Security
Using hardcoded API-key to access APIs.

#### Patients
For handling patient database and creating new patients.  
Main URL: `/api/patients`  
**Endpoints:**
- `/create` create new patient using random generator. Takes specifications in body according to:  
    ```java
    public record PatientCreateRequest(
        Specs specs
    ) {}
    
    public record Specs(
        int oxygenSaturation
    ) {}
    ```

#### Triage
For running Triage engine on patients.  
Main URL: `/api/triage`  
**Endpoints:**
- Run triage engine on patient data. Takes `Patient` in body.

### Project structure

## Testing
Unit testing separated per engine component.
### Triage
#### Base tests
Basic tests for Triage level. Includes parameterized test for matching default rules list.
```java
void redPatientGetsRedTriage() {}

void defaultRulesMatchPatient(Patient patient, TriageRule rule) {}
```

### Resource allocation
#### Base tests
Basic tests for allocating resource depending on triage level and availability.
```java
void redPatientGetsIcuBedIfAvailable() {}

void busyResourceCausesWait() {}
```