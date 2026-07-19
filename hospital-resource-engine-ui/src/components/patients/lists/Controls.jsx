export function Controls({ load, save, onCreate }) {
    function create() {
        let newList = {
            id: crypto.randomUUID(),
            name: "New List",
            version: "v1"
        };

        onCreate(newList);
    }

    return (
        <div className="controls">
            <button onClick={load}>Load</button>

            <button onClick={save}>Save</button>

            <button onClick={create}>Create new list</button>
        </div>
    )
}