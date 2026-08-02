import {useState} from "react";
import {ConfirmModal} from "../modals/ConfirmModal";

export function Controls({ selected, load, save, onCreate, onDelete }) {
    function create() {
        let newList = {
            id: crypto.randomUUID(),
            name: "New List",
            version: "v1"
        };

        onCreate(newList);
    }

    const [showConfirm, setShowConfirm] = useState(false);
    //TODO create DeleteModal? , delegate into modal?
    let deleteMessage = createDeleteMessage(selected);

    function handleDelete() {
        setShowConfirm(true);
    }

    function onConfirm(confirmed) {
        setShowConfirm(false);

        if (confirmed) {
            onDelete(selected);
        }
    }

    return (
        <div className="controls">
            <button onClick={load}>Load</button>

            <button onClick={save}>Save</button>

            <button onClick={create}>Create new list</button>

            <button onClick={handleDelete}>Delete</button>

            {showConfirm && (
                <ConfirmModal message={deleteMessage} onConfirm={() => onConfirm(true)}
                              onCancel={() => onConfirm(false)} />
            )}
        </div>
    )
}

function createDeleteMessage(selectedList) {
    let name = selectedList ? selectedList.name : "";

    return `Delete list "${name}"?`;
}