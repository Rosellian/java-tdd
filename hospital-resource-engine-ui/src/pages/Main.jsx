import {useState} from "react";
import {TriagePanel} from "../components/triage/TriagePanel";
import {Layout} from "../ui/layout/Layout";
import {PatientPanel} from "../components/patients/PatientPanel";
import {ResourcePanel} from "../components/resources/ResourcePanel";
import {TriageRulePanel} from "../components/triage/rules/TriageRulePanel";

export function Main() {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    function updatePatient(updatedPatient) {
        setPatients(prev =>
            prev.map(patient => patient.id === updatedPatient.id ? updatedPatient : patient)
        );
        setSelectedPatient(updatedPatient);
    }

    const [triageRules, setTriageRules] = useState([]);
    const [selectedTriageRule, setSelectedTriageRule] = useState(null);

    function updateTriageRule(updatedRule) {
        setTriageRules(prev =>
            prev.map(rule => rule.id === updatedRule.id ? updatedRule : rule)
        );
        setSelectedTriageRule(updatedRule);
    }

    const [resources, setResources] = useState([]);
    const [selectedResource, setSelectedResource] = useState(null);

    function updateResource(updatedResource) {
        setResources(prev =>
            prev.map(resource => resource.id === updatedResource.id ? updatedResource : resource)
        );
        setSelectedResource(updatedResource);
    }

    return (
        <Layout>
            <PatientPanel patients={patients} selected={selectedPatient} setPatients={setPatients}
                          onSelect={setSelectedPatient} onUpdate={updatePatient} />

            {selectedPatient && (
                <div className="panel">
                    <TriageRulePanel rules={triageRules} selected={selectedTriageRule} setRules={setTriageRules}
                                     onSelect={setSelectedTriageRule} onUpdate={updateTriageRule} />
                    <TriagePanel patient={selectedPatient} onUpdate={updatePatient} />
                </div>
            )}

            <ResourcePanel resources={resources} selected={selectedResource} setResources={setResources}
                           onSelect={setSelectedResource} onUpdate={updateResource} />
        </Layout>
    )
}