import {useState} from "react";
import {TriagePanel} from "../components/triage/TriagePanel";
import {Layout} from "../ui/layout/main/Layout";
import {PatientPanel} from "../components/patients/PatientPanel";
import {ResourcePanel} from "../components/resources/ResourcePanel";
import {TriageRulePanel} from "../components/triage/rules/TriageRulePanel";
import {IncomingPanel} from "../components/patients/incoming/IncomingPanel";
import {AllPatientsPanel} from "../components/patients/AllPatientsPanel";

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
            <div className="main-top">
                <div className="top-panel">
                    <PatientPanel patients={patients} selected={selectedPatient} setPatients={setPatients}
                                  onSelect={setSelectedPatient} onUpdate={updatePatient} />
                </div>

                <div className="top-panel">
                    <AllPatientsPanel selected={selectedPatient} onSelect={setSelectedPatient} />

                    <IncomingPanel />
                </div>

                <div className="top-panel">
                    <div className="panel">
                        <TriageRulePanel rules={triageRules} selected={selectedTriageRule} setRules={setTriageRules}
                                         onSelect={setSelectedTriageRule} onUpdate={updateTriageRule} />
                        {selectedPatient && (
                            <TriagePanel patient={selectedPatient} onUpdate={updatePatient} />
                        )}
                    </div>
                </div>
            </div>

            <div className="main-bottom">
                <ResourcePanel resources={resources} selected={selectedResource} setResources={setResources}
                               onSelect={setSelectedResource} onUpdate={updateResource} />
            </div>
        </Layout>
    )
}