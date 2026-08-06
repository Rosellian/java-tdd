import {useEffect, useState} from "react";
import {VitalsForm} from "./vitals/VitalsForm";
import {SymptomsForm} from "./SymptomsForm";
import {PatientFields} from "./PatientFields";
import {ListSelector} from "../../../general/lists/ListSelector";

export function PatientForm({ patient, lists, onChange }) {
    const [draft, setDraft] = useState(patient);

    useEffect(() => {
        setDraft(patient);
    }, [patient]);

    function updateField(field, value) {
        let updated = { ...draft, [field]: value };

        setDraft(updated);
        onChange(updated);
    }

    function updateVitals(field, value) {
        let updatedVitals = { ...draft.vitals, [field]: value };

        updateField("vitals", updatedVitals);
    }

    let selectedList = draft.listId ? lists.find(l => l.id === draft.listId) : "";

    return (
        <div className="panel patient-form">
            <div className="patient-header-row">
                <h2>Patient</h2>

                <span className="patient-list-id">
                    List: {selectedList?.id}
                </span>

                <ListSelector lists={lists} selected={selectedList}
                              onChange={(list) => updateField("listId", list.id)} />
            </div>

            <div className="row-top">
                <PatientFields draft={draft} updateField={updateField} />

                <VitalsForm vitals={draft.vitals} onUpdate={updateVitals}/>
            </div>

            <SymptomsForm draft={draft} updateField={updateField}/>
        </div>
    )
}