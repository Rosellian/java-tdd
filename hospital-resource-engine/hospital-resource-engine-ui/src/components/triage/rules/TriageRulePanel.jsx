import {useEffect, useState} from "react";
import {loadLists} from "./ops";
import {getRules, saveRuleList} from "../../../api/triage/rules";
import {ListSelector} from "../../general/lists/ListSelector";
import {Inputs} from "../../general/lists/Inputs";
import {Controls} from "../../general/lists/Controls";
import {RuleList} from "./list/RuleList";
import {RuleEditor} from "./editor/RuleEditor";

export function TriageRulePanel({ rules, selected, setRules, onSelect, onUpdate }) {
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null);

    useEffect(() => loadLists(setLists, setSelectedList), []);

    async function handleLoad() {
        if(!selectedList) return;

        let data = await getRules(selectedList.id);

        setRules(data);
        onSelect(null);
    }

    async function handleSave() {
        await saveRuleList(selectedList, rules);
        console.log("Saved: ", selectedList);
    }

    function onCreate(newList) {
        setLists(prev => [...prev, newList]);
        setSelectedList(newList);
        setRules([]);
        onSelect(null);
    }

    function updateListField(field, value) {
        let updatedList = { ...selectedList, [field]: value };
        setSelectedList(updatedList);

        setLists(prev =>
            prev.map(list => list.id === updatedList.id ? updatedList : list)
        );
    }

    function onCreateRule(newRule) {
        setRules(prev => [...prev, newRule]);
        onSelect(newRule);
    }

    if (!selectedList) return;

    return (
        <div className="panel">
            <h2>Triage Rule Lists</h2>

            <ListSelector lists={lists} selectedList={selectedList} setSelectedList={setSelectedList} />
            <Inputs selected={selectedList} onUpdate={updateListField} />
            <Controls load={handleLoad} save={handleSave} onCreate={onCreate} />

            {rules.length > 0 && (
                <RuleList rules={rules} selected={selected} onSelect={onSelect} />
            )}

            <RuleEditor rule={selected} onChange={onUpdate} onCreate={onCreateRule} />
        </div>
    )
}