import {useEffect, useState} from "react";
import {loadLists} from "./ops";
import {getResources, saveResourceList} from "../../api/resources/resources";
import {ListSelector} from "../general/lists/ListSelector";
import {Inputs} from "../general/lists/Inputs";
import {Controls} from "../general/lists/Controls";
import {ResourceList} from "./list/ResourceList";

export function ResourcePanel({ resources, selected, setResources, onSelect, onUpdate }) {
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null);

    useEffect(() => loadLists(setLists, setSelectedList), []);

    async function handleLoad() {
        if(!selectedList) return;

        let data = await getResources(selectedList.id);

        setResources(data);
        onSelect(null);
    }

    async function handleSave() {
        await saveResourceList(selectedList, resources);
        console.log("Saved: ", selectedList);
    }

    function onCreate(newList) {
        setLists(prev => [...prev, newList]);
        setSelectedList(newList);
        setResources([]);
        onSelect(null);
    }

    function updateListField(field, value) {
        let updatedList = { ...selectedList, [field]: value };
        setSelectedList(updatedList);

        setLists(prev =>
            prev.map(list => list.id === updatedList.id ? updatedList : list)
        );
    }

    function onCreateResource(newResource) {
        setResources(prev => [...prev, newResource]);
        onSelect(newResource);
    }

    if (!selectedList) return;

    return (
        <div className="panel">
            <h2>Resource Lists</h2>

            <ListSelector lists={lists} selectedList={selectedList} setSelectedList={setSelectedList} />
            <Inputs selected={selectedList} onUpdate={updateListField} />
            <Controls load={handleLoad} save={handleSave} onCreate={onCreate} />

            {resources.length > 0 && (
                <ResourceList resources={resources} selected={selected} onSelect={onSelect} />
            )}

            <ResourceEditor resource={selected} onChange={onUpdate} onCreate={onCreateResource} />
        </div>
    )
}