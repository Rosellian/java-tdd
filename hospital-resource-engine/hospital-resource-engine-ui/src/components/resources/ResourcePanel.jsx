import {useEffect, useState} from "react";
import {loadLists} from "./ops";
import {getResources, saveResourceList} from "../../api/resources/resources";
import {ListSelector} from "../general/lists/ListSelector";
import {Inputs} from "../general/lists/Inputs";
import {Controls} from "../general/lists/Controls";
import {ResourceList} from "./list/ResourceList";
import {ResourceEditor} from "./editor/ResourceEditor";

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

    function onDelete(list) {
        setLists(prev => prev.filter(l => l.id !== list.id));
        setSelectedList(null);
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

            <ListSelector lists={lists} selected={selectedList} onChange={setSelectedList} />
            <Inputs selected={selectedList} onUpdate={updateListField} />
            <Controls selected={selectedList} load={handleLoad} save={handleSave} onCreate={onCreate}
                      onDelete={onDelete} />

            {resources.length > 0 && (
                <ResourceList resources={resources} selected={selected} onSelect={onSelect} />
            )}

            <ResourceEditor resource={selected} onChange={onUpdate} onCreate={onCreateResource} />
        </div>
    )
}