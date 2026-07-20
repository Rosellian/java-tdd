export function ListSelector({ lists, selectedList, setSelectedList }) {
    return (
        <div className="field">
            <label>Select list</label>

            <select value={selectedList.id}
                    onChange={e => setSelectedList(e.target.value)}>
                {lists.map(list => (
                    <option key={list.id} value={list.id}>
                        {list.name}
                    </option>
                ))}
            </select>
        </div>
    )
}