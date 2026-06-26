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

export function PriceListHandler({ onPriceListChange }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [priceListNames, setPriceListNames] = useState([]);
    const [priceList, setPriceList] = useState(null);

    const [selected, setSelected] = useState("default");
    const [loaded, setLoaded] = useState(null);

    const [isDraft, setIsDraft] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    const [fallbackUsed, setFallbackUsed] = useState(false);
    const [status, setStatus] = useState("idle"); // idle, saving, loading, deleting, error

    useEffect(() => getInitialState(setPriceListNames, setPriceList, setFallbackUsed, setSelected,
        setStatus, setLoaded, onPriceListChange), []);

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
                            const ok = window.confirm("You have unsaved changes. Discard them?");
                            if (!ok) return;
                        }

                        if(isDraft) {
                            setPriceListNames(prev => prev.filter(n => n !== selected));
                        }
                        setSelected(v);
                        setPriceList(null);
                        setIsDraft(false);
                        setUnsavedChanges(false);
                    }} names={priceListNames}/>

                    {isPriceListSet && (
                        <TextInput label="Price List Name" field="name" value={priceList.name}
                                   update={(field, value) => triggerUpdatePriceListName(value)}/>
                    )}
                </div>

                <ButtonPanel>
                    <Load status={status} setStatus={setStatus} selected={selected} unsavedChanges={unsavedChanges}
                          onLoad={(priceList, fallback) => {
                              setPriceList(priceList);
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
                            isDraft={isDraft} unsavedChanges={unsavedChanges} onDelete={() => {
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