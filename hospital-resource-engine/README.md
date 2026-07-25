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
        int heartRate,
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
        String description,
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
List entry representation reused by database management APIs:
```java
public record DataList(
        UUID id, 
        String name, 
        String version
) {}
```
#### Security
Using hardcoded API-key to access APIs.

#### Patients
For handling patient database and creating new patients.  
Main URL: `/api/patients`  
**Endpoints:**
- get available patient lists. Returns list of `DataList`.
- get patient list by ID as path variable. Returns list of `Patient`.
- save patient list. Takes list and patients' data in body:
  ```java
  public record PatientListRequest(
        DataList list,
        List<Patient> patients
  ) {}
  ```
- `/create` create new patient using random generator. Takes specifications in body according to:  
    ```java
    public record PatientCreateRequest(
        Specs specs
    ) {}
    
    public record Specs(
        int oxygenSaturation
    ) {}
    ```
- `/all` get all patients. Returns list of `Patient`.

#### Triage
For running Triage engine on patients and handling triage rule database.  
Main URL: `/api/triage`  
**Endpoints:**
- Run triage engine on patient data. Takes `Patient` in body.
- `/rules` get available rule lists. Returns list of `DataList`.
- `/rules` get rule list by ID as path variable. Returns list of `TriageRuleDTO`.
- `/rules` save rule list. Takes list and rules' data in body:
  ```java
  public record TriageRuleListRequest(
        DataList list,
        List<TriageRuleDTO> rules
  ) {}
  ```
- `/levels` get supported triage levels.

#### Resources
For handling resource database.  
Main URL: `/api/resources`  
**Endpoints:**
- get available resource lists. Returns list of `DataList`.
- get resource list by ID as path variable. Returns list of `Resource`.
- save resource list. Takes list and resources' data in body:
  ```java
  public record ResourceListRequest(
        DataList list,
        List<Resource> resources
  ) {}
  ```
- `/types` get supported resource types.

### Database
#### Patients
PostgreSQL database: `patients`  
**Tables:**
- `patient_lists`
- `patients` data in JSON format  
**Repository** for backend access:
```java
@Repository
public class PatientRepository implements DataRepository<Patient> {
  public List<DataList> getLists() {}
  
  public List<Patient> getList(UUID listId) {}

  public void saveList(DataList list, List<Patient> patients) {}
}
```

#### Triage Rules
PostgreSQL database: `triage`  
**Tables:**
- `rule_lists`
- `rules` data in JSON format  
**Repository** for backend access:
```java
@Repository
public class TriageRepository implements DataRepository<TriageRuleDTO> {
  public List<DataList> getLists() {}
  
  public List<TriageRuleDTO> getList(UUID listId) {}

  public void saveList(DataList list, List<TriageRuleDTO> rules) {}
}
```
**DTOs**  
These are used outside engine (database and API) to enable visualization and editing in UI.
ConditionDTO compiled for use in engine.
```java
public record TriageRuleDTO(
        UUID id,
        String name,
        String description,
        ConditionDTO condition,
        TriageLevel result
) {}

public record ConditionDTO(
        String field,
        String operator,
        String value
) {}
```

#### Resources
PostgreSQL database: `resources`  
**Tables:**
- `resource_lists`
- `resources` data in JSON format  
  **Repository** for backend access:
```java
@Repository
public class ResourceRepository implements DataRepository<Resource> {
  public List<DataList> getLists() {}
  
  public List<Resource> getList(UUID listId) {}

  public void saveList(DataList list, List<Resource> resources) {}
}
```

### Project structure
TODO

## Testing
Unit testing separated per engine component.
### Triage
#### Base tests
Basic tests for Triage level. Includes parameterized test `defaultRulesMatchPatient` for matching each rule 
in default rules list.
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