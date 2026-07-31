import {useState} from "react";
import {TriagePanel} from "../components/triage/TriagePanel";
import {Layout} from "../ui/layout/main/Layout";
import {PatientPanel} from "../components/patients/PatientPanel";
import {ResourcePanel} from "../components/resources/ResourcePanel";
import {TriageRulePanel} from "../components/triage/rules/TriageRulePanel";
import {IncomingPanel} from "../components/patients/incoming/IncomingPanel";
import {AllPatientsPanel} from "../components/patients/AllPatientsPanel";
import {AllocationPanel} from "../components/allocation/AllocationPanel";
import {PatientHistory} from "../components/tracing/PatientHistory";

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
    //TODO could be moved into panel
    const [selectedTriageRule, setSelectedTriageRule] = useState(null);

    function updateTriageRule(updatedRule) {
        setTriageRules(prev =>
            prev.map(rule => rule.id === updatedRule.id ? updatedRule : rule)
        );
        setSelectedTriageRule(updatedRule);
    }

    const [resources, setResources] = useState([]);
    //TODO could be moved into panel
    const [selectedResource, setSelectedResource] = useState(null);

    function updateResource(updatedResource) {
        setResources(prev =>
            prev.map(resource => resource.id === updatedResource.id ? updatedResource : resource)
        );
        setSelectedResource(updatedResource);
    }

    return (
        <Layout>
            <div className="main-top">
                <AllPatientsPanel selected={selectedPatient} onSelect={setSelectedPatient} />

                <PatientPanel patients={patients} selected={selectedPatient} setPatients={setPatients}
                              onSelect={setSelectedPatient} onUpdate={updatePatient} />

                <IncomingPanel />
            </div>

            <div className="main-middle">
                <TriageRulePanel rules={triageRules} selected={selectedTriageRule} setRules={setTriageRules}
                                 onSelect={setSelectedTriageRule} onUpdate={updateTriageRule} />

                <ResourcePanel resources={resources} selected={selectedResource} setResources={setResources}
                               onSelect={setSelectedResource} onUpdate={updateResource} />
            </div>

            <div className="main-bottom">
                <TriagePanel patient={selectedPatient} onUpdate={updatePatient} />

                <AllocationPanel patient={selectedPatient} resources={resources} onUpdate={updatePatient} />

                <PatientHistory patient={selectedPatient} />
            </div>
        </Layout>
    )
}