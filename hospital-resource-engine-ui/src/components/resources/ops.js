import {getResourceLists} from "../../api/resources/resources";

export function loadLists(setLists, setSelectedList) {
    try {
        getResourceLists().then(
            data => {
                setLists(data);

                if (data.length > 0) {
                    setSelectedList(data[0]);
                }
            });
    } catch (err) {
        console.error("Failed to load resource lists:", err);
    }
}