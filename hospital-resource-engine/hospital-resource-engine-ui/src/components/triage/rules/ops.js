import {getRuleLists, getTriageLevels} from "../../../api/triage/rules";

export function loadLists(setLists, setSelectedList) {
    try {
        getRuleLists().then(
            data => {
                setLists(data);

                if (data.length > 0) {
                    setSelectedList(data[0]);
                }
            });
    } catch (err) {
        console.error("Failed to load triage rule lists:", err);
    }
}

export function loadLevels(setLevels) {
    try {
        getTriageLevels().then(
            data => setLevels(data));
    } catch (err) {
        console.error("Failed to load triage rule levels:", err);
    }
}