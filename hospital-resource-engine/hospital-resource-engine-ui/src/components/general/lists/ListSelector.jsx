export function ListSelector({ lists, selected, onChange }) {
    return (
        <div className="field">
            <label>Select list</label>

            <select value={selected?.id}
                    onChange={e => handleChange(e.target.value, lists, onChange)}>
                {lists.map(list => (
                    <option key={list.id} value={list.id}>
                        {list.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

function handleChange(id, lists, onChange) {
    let list = lists.find(l => l.id === id);
    onChange(list);
}