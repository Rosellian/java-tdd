import {useEffect, useState} from "react";
import {useTheme} from "../../ui/theme/ThemeProvider";
import {PriceListSelector} from "./pricelistselector/PriceListSelector";
import {TextInput} from "../rulesets/ruleseteditor/ruleform/templates/FormFields";
import {PriceListEditor} from "./pricelisteditor/PriceListEditor";
import {ButtonPanel} from "./operations/ButtonPanel";
import {getInitialState, updatePriceListName} from "./handlerFuncs";
import {Delete} from "./operations/Delete";
import {Save} from "./operations/Save";
import {New} from "./operations/New";
import {handlerStyles} from "./handlerStyles";
import {Load} from "./operations/Load";
import {DiscardChangesModal} from "./DiscardModal";

export function PriceListHandler({ onPriceListChange }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [priceListNames, setPriceListNames] = useState([]);
    const [priceList, setPriceList] = useState(null);

    const [selected, setSelected] = useState("default");
    const [loaded, setLoaded] = useState(null);
    const [originalPriceList, setOriginalPriceList] = useState(null);
    const [isDraft, setIsDraft] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [pendingSelection, setPendingSelection] = useState(null);

    const [fallbackUsed, setFallbackUsed] = useState(false);
    const [status, setStatus] = useState("idle"); // idle, saving, loading, deleting, error

    useEffect(() => getInitialState(setPriceListNames, setPriceList, setOriginalPriceList, setFallbackUsed,
        setSelected, setStatus, setLoaded, onPriceListChange), []);

    function triggerUpdatePriceListName(newName) {
        updatePriceListName(priceList, newName, setPriceList, setPriceListNames, setSelected, onPriceListChange);
    }

    const isPriceListSet = priceList !== null;

    return (
        <div style={{
            ...handlerStyles.wrapper,
            ...(isDark ? handlerStyles.wrapperDark : handlerStyles.wrapperLight)
        }}>
            <div style={handlerStyles.handler}>
                <div style={handlerStyles.inputs}>
                    <PriceListSelector value={selected} onChange={(v) => {
                        if (unsavedChanges) {
                            setPendingSelection(v);
                            setShowDiscardModal(true);
                            return;
                        }
                        setSelected(v);
                    }} names={priceListNames} isDraft={isDraft} selected={selected}/>

                    {showDiscardModal && (
                        <DiscardChangesModal onConfirm={() => {
                            if(isDraft) {
                                setPriceListNames(prev => prev.filter(n => n !== selected));
                            }

                            setPriceList(null);
                            setIsDraft(false);
                            setUnsavedChanges(false);
                            setSelected(pendingSelection);
                            setShowDiscardModal(false);
                        }} onCancel={() => setShowDiscardModal(false)}/>
                    )}

                    {isPriceListSet && (
                        <TextInput label="Price List Name" field="name" value={priceList.name}
                                   update={(field, value) => triggerUpdatePriceListName(value)}/>
                    )}
                </div>

                <ButtonPanel>
                    <Load status={status} setStatus={setStatus} selected={selected}
                          disabledExp={unsavedChanges || isDraft}
                          onLoad={(newPriceList, fallback) => {
                              setPriceList(newPriceList);
                              setOriginalPriceList(JSON.parse(JSON.stringify(newPriceList)));
                              setFallbackUsed(fallback);
                              setIsDraft(false);
                              setLoaded(selected);
                              onPriceListChange(selected);
                              setUnsavedChanges(false);
                          }} />

                    <Save priceList={priceList} status={status} setStatus={setStatus} unsavedChanges={unsavedChanges}
                          onSave={priceList => {
                              setIsDraft(false);
                              setUnsavedChanges(false);
                              setLoaded(priceList.name);
                          }} />

                    <Delete priceList={priceList} priceListNames={priceListNames} setPriceListNames={setPriceListNames}
                            status={status} setStatus={setStatus} selected={selected} setSelected={setSelected}
                            isDraft={isDraft} disabledExp={isDraft || unsavedChanges} onDelete={() => {
                                setPriceList(null);
                                setIsDraft(false);
                                setUnsavedChanges(false);
                            }} />

                    <New unsavedChanges={unsavedChanges} onNew={draft => {
                        setPriceList(draft);
                        setPriceListNames(prev => [...prev, draft.name]);
                        setSelected(draft.name);
                        setIsDraft(true);
                        setUnsavedChanges(true);
                        onPriceListChange(draft.name);
                    }} />
                </ButtonPanel>
            </div>

            {status === "loading" &&
                <div style={handlerStyles.loading}>
                    Loading price list…
                </div>
            }
            {status === "error" &&
                <div style={handlerStyles.error}>
                    Failed to load or save price list
                </div>
            }

            {fallbackUsed &&
                <div style={handlerStyles.fallback}>
                    Failed to load from server, fallback used
                </div>
            }

            {isDraft && (
                <div style={handlerStyles.draft}>
                    Unsaved draft
                </div>
            )}

            {unsavedChanges && (
                <div style={{
                    ...handlerStyles.unsavedChanges,
                    ...(isDark ? handlerStyles.unsavedChangesDark : handlerStyles.unsavedChangesLight)
                }}>
                    Unsaved changes
                </div>
            )}

            {unsavedChanges && originalPriceList && (
                <div style={{
                    marginTop: 10,
                    padding: "8px 12px",
                    background: isDark ? "#263238" : "#ECEFF1",
                    borderRadius: 4,
                    fontSize: 13
                }}>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>Changes:</div>
                    {diffPriceLists(originalPriceList, priceList).map((d, i) => (
                        <div key={i} style={{ marginLeft: 8 }}>• {d}</div>
                    ))}
                </div>
            )}

            <div style={handlerStyles.editorWrapper}>
                {isPriceListSet && (
                    <PriceListEditor priceList={priceList} onChange={(updated) => {
                        setPriceList(updated);
                        setUnsavedChanges(true);
                    }} />
                )}
            </div>
        </div>
    )
}

function diffPriceLists(a, b) {
    if (!a || !b) return [];

    const diffs = [];

    if (a.name !== b.name) diffs.push("Name changed");

    const max = Math.max(a.unitPrices.length, b.unitPrices.length);

    for (let i = 0; i < max; i++) {
        const oldItem = a.unitPrices[i];
        const newItem = b.unitPrices[i];

        if (!oldItem || !newItem) {
            diffs.push("SKU list length changed");
            continue;
        }

        if (oldItem.sku !== newItem.sku) diffs.push(`SKU changed at row ${i + 1}`);
        if (oldItem.price !== newItem.price) diffs.push(`Price changed at row ${i + 1}`);
    }

    return diffs;
}