export function updateRule(index, updatedRule, draft, setDraft, onChange) {
    const updatedRules = [...draft.rules];
    updatedRules[index] = updatedRule;
    const newDraft = { ...draft, rules: updatedRules };

    setDraft(newDraft);
    onChange?.(newDraft);
}

export function addRule(draft, setDraft, onChange, setSelectedRule) {
    const newRule = {type: "SpecialPrice", name: "New Rule", sku: "", quantity: 1, price: 0,
        priority: 1, stackable: false};

    const newDraft = { ...draft, rules: [...draft.rules, newRule] };

    setDraft(newDraft);
    onChange?.(newDraft);
    setSelectedRule(newDraft.rules.length - 1);
}

export function deleteRule(index, draft, setDraft, onChange, setSelectedRule) {
    const updated = draft.rules.filter((_, i) => i !== index);
    const newDraft = { ...draft, rules: updated };

    setDraft(newDraft);
    onChange?.(newDraft);
    setSelectedRule(0);
}

export function getSafeIndex(selectedRule, draft) {
    return Math.min(selectedRule, draft.rules.length - 1);
}