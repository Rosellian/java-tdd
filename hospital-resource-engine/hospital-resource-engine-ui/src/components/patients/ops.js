import {getPatientLists} from "../../api/patients/patients";

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