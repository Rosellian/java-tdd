import {useEffect, useState} from "react";
import {useTheme} from "../../ui/theme/ThemeProvider";
import {PriceListEditor} from "./pricelisteditor/PriceListEditor";
import {ButtonPanel} from "./operations/ButtonPanel";
import {initPriceLists, setChanges, setLoadedPriceList, updateChanges, updatePriceList, updatePriceListName
} from "./handlerFuncs";
import {handlerStyles} from "./handlerStyles";
import {StatusBar} from "./status/StatusBar";
import {Inputs} from "./input/Inputs";
import {createEntry} from "./priceFuncs";

export function PriceListHandler({ onPriceListChange }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [priceListEntries, setPriceListEntries] = useState([]);
    const [priceList, setPriceList] = useState(null);

    const [selected, setSelected] = useState(null);
    const [originalPriceList, setOriginalPriceList] = useState(null);
    const [isDraft, setIsDraft] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    const [fallbackUsed, setFallbackUsed] = useState(false);
    const [status, setStatus] = useState("idle"); // idle, saving, loading, deleting, error

    useEffect(() => {
        initPriceLists(setPriceListEntries, setFallbackUsed, setStatus, initPriceList);
    }, []);

    function initPriceList(priceList, fallback) {
        updatePriceList(priceList, setPriceList, setSelected, onPriceListChange);
        setLoadedPriceList(setOriginalPriceList, priceList, setFallbackUsed, fallback);
        setStatus("idle");
    }

    function onDiscardConfirm() {
        if(isDraft) setPriceListEntries(prev => prev.filter(entry => entry.id !== selected.id));
        setPriceList(null);
        setChanges(setIsDraft, setUnsavedChanges);
    }

    function triggerUpdatePriceListName(newName) {
        const updatedPriceList = updatePriceListName(priceList, newName, setPriceListEntries);
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

    function onDelete(toSelected, updatedEntries) {
        setPriceListEntries(updatedEntries);
        setPriceList(null);
        setSelected(toSelected);
        setChanges(setIsDraft, setUnsavedChanges);
    }

    function onNew(draft) {
        updatePriceList(draft, setPriceList, setSelected, onPriceListChange);
        setPriceListEntries(prev => [...prev, createEntry(draft)]);
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
                <Inputs priceList={priceList} priceListEntries={priceListEntries} unsavedChanges={unsavedChanges}
                        isDraft={isDraft} selected={selected} setSelected={setSelected}
                        onDiscardConfirm={onDiscardConfirm} triggerUpdatePriceListName={triggerUpdatePriceListName} />

                <ButtonPanel status={status} setStatus={setStatus} selected={selected} isDraft={isDraft}
                             unsavedChanges={unsavedChanges} priceList={priceList} priceListEntries={priceListEntries}
                             onLoad={onLoad} onSave={onSave} onDelete={onDelete} onNew={onNew} />
            </div>

            <StatusBar status={status} fallbackUsed={fallbackUsed} isDraft={isDraft} unsavedChanges={unsavedChanges}
                       priceList={priceList} originalPriceList={originalPriceList} />

            <div style={handlerStyles.editorWrapper}>
                <PriceListEditor priceList={priceList} originalPriceList={originalPriceList}
                                 unsavedChanges={unsavedChanges} onChange={onEdit} />
            </div>
        </div>
    )
}