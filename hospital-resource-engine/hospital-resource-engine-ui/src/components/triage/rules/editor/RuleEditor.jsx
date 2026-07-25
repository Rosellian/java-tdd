import {Collapsible} from "../../../../ui/collapsible/Collapsible";
import {RuleForm} from "./form/RuleForm";

export function RuleEditor({ rule, onChange, onCreate }) {
    async function handleCreate() {
        let newRule = {
            id: crypto.randomUUID(),
            name: "New Rule",
            description: "",
            condition: {
                field: "",
                operator: "=",
                value: "",
            },
            result: ""
        };

        onCreate(newRule);
    }

    return (
        <div className="panel">
            <Collapsible title="Editor">
                {rule && (
                    <RuleForm rule={rule} onChange={onChange} />
                )}

                <button onClick={handleCreate}>
                    Create new rule
                </button>
            </Collapsible>
        </div>
    )
}