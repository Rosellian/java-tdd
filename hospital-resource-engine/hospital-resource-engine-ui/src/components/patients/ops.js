import {deletePatient, getAllPatients, getPatientLists, savePatient} from "../../api/patients/patients";

export function loadLists(setLists, setSelectedList) {
    try {
        getPatientLists().then(
            data => {
                setLists(data);

                if (data.length > 0) {
                    setSelectedList(data[0]);
                }
            });
    } catch (err) {
        console.error("Failed to load patient lists:", err);
    }
}

export function loadPatients(setPatients) {
    try {
        getAllPatients().then(
            data => {
                let patients = data.map(dto => ({
                    ...dto.data,
                    listId: dto.listId
                }));

                setPatients(patients);
            });
    } catch (err) {
        console.error("Failed to load all patients:", err);
    }
}

export function handleSave(patient) {
    try {
        let dto = {
            data: patient,
            listId: patient.listId
        };

        savePatient(dto).then(
            res => {
                console.log(res);
                //TODO do nothing?
            });
    } catch (err) {
        console.error("Failed to save patient:", err);
    }
}

export function handleDelete(patient) {
    try {
        deletePatient(patient).then(
            res => {
                console.log(res);
                //TODO do nothing?
            });
    } catch (err) {
        console.error("Failed to delete patient:", err);
    }
}