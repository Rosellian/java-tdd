import {useEffect, useState} from "react";
import {useTheme} from "../../ui/theme/ThemeProvider";
import {PriceListEditor} from "./pricelisteditor/PriceListEditor";
import {ButtonPanel} from "./operations/ButtonPanel";
import {initPriceLists, setChanges, setLoadedPriceList, updateChanges, updatePriceList, updatePriceListName}
    from "./handlerFuncs";
import {handlerStyles} from "./handlerStyles";
import {StatusBar} from "./status/StatusBar";
import {Inputs} from "./input/Inputs";

export function PriceListHandler({ onPriceListChange }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [priceListNames, setPriceListNames] = useState([]);
    const [priceList, setPriceList] = useState(null);

    const [selected, setSelected] = useState("default");
    const [originalPriceList, setOriginalPriceList] = useState(null);
    const [isDraft, setIsDraft] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    const [fallbackUsed, setFallbackUsed] = useState(false);
    const [status, setStatus] = useState("idle"); // idle, saving, loading, deleting, error

    useEffect(() => {
        initPriceLists(setPriceListNames, setFallbackUsed, setStatus, initPriceList);
    }, []);

    function initPriceList(priceList, fallback) {
        updatePriceList(priceList, setPriceList, setSelected, onPriceListChange);
        setLoadedPriceList(setOriginalPriceList, priceList, setFallbackUsed, fallback);
        setStatus("idle");
    }

    function onDiscardConfirm() {
        if(isDraft) setPriceListNames(prev => prev.filter(n => n !== selected));
        setPriceList(null);
        setChanges(setIsDraft, setUnsavedChanges);
    }

    function triggerUpdatePriceListName(newName) {
        const updatedPriceList = updatePriceListName(priceList, newName, setPriceListNames);
        updateChanges(originalPriceList, updatedPriceList, setUnsavedChanges);
        updatePriceList(updatedPriceList, setPriceList, setSelected, onPriceListChange);
    }

    function onLoad(newPriceList, fallback) {
        updatePriceList(newPriceList, setPriceList, setSelected, onPriceListChange);
        setLoadedPriceList(setOriginalPriceList, newPriceList, setFallbackUsed, fallback);
        setChanges(setIsDraft, setUnsavedChanges);
    }

    function onSave() {
        setChanges(setIsDraft, setUnsavedChanges);
    }

    function onDelete(toSelected, updatedNames) {
        setPriceListNames(updatedNames);
        setPriceList(null);
        setSelected(toSelected);
        setChanges(setIsDraft, setUnsavedChanges);
    }

    function onNew(draft) {
        updatePriceList(draft, setPriceList, setSelected, onPriceListChange);
        setPriceListNames(prev => [...prev, draft.name]);
        setChanges(setIsDraft, setUnsavedChanges, true);
    }

    function onEdit(updated) {
        setPriceList(updated);
        updateChanges(originalPriceList, updated, setUnsavedChanges);
    }

    return (
        <div style={{
            ...handlerStyles.wrapper,
            ...(isDark ? handlerStyles.wrapperDark : handlerStyles.wrapperLight)
        }}>
            <div style={handlerStyles.handler}>
                <Inputs priceList={priceList} priceListNames={priceListNames} unsavedChanges={unsavedChanges}
                        isDraft={isDraft} selected={selected} setSelected={setSelected}
                        onDiscardConfirm={onDiscardConfirm} triggerUpdatePriceListName={triggerUpdatePriceListName} />

                <ButtonPanel status={status} setStatus={setStatus} selected={selected} isDraft={isDraft}
                             unsavedChanges={unsavedChanges} priceList={priceList} priceListNames={priceListNames}
                             onLoad={onLoad} onSave={onSave} onDelete={onDelete} onNew={onNew} />
            </div>

            <StatusBar status={status} fallbackUsed={fallbackUsed} isDraft={isDraft} unsavedChanges={unsavedChanges}
                       priceList={priceList} originalPriceList={originalPriceList} />

            <div style={handlerStyles.editorWrapper}>
                <PriceListEditor priceList={priceList} onChange={onEdit} />
            </div>
        </div>
    )
}