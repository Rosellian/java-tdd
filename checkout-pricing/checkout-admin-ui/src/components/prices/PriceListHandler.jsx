import {useEffect, useState} from "react";
import {useTheme} from "../../ui/theme/ThemeProvider";
import {PriceListEditor} from "./pricelisteditor/PriceListEditor";
import {ButtonPanel} from "./operations/ButtonPanel";
import {loadPriceList, loadPriceListNames, updatePriceListName} from "./handlerFuncs";
import {handlerStyles} from "./handlerStyles";
import {getPriceListWithFallback} from "../../api/prices/pricesFallback";
import {getPriceListNames} from "../../api/prices/prices";
import {StatusBar} from "./status/StatusBar";
import {Inputs} from "./input/Inputs";

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

    const [fallbackUsed, setFallbackUsed] = useState(false);
    const [status, setStatus] = useState("idle"); // idle, saving, loading, deleting, error

    useEffect(() => {
        getPriceListNames().then(
            list => {
                const first = loadPriceListNames(list, setPriceListNames, setFallbackUsed);

                setSelected(first);
                setLoaded(first);
                setStatus("loading");

                getPriceListWithFallback(first).then(
                    ({priceList, fallback}) =>
                        loadPriceList(priceList, fallback, setStatus, updatePriceList)
                );
            }
        );
    }, []);

    function updatePriceList(priceList, fallback) {
        setPriceList(priceList);
        setOriginalPriceList(priceList);
        setFallbackUsed(fallback);
        setStatus("idle");
        onPriceListChange(priceList.name);
    }

    function onDiscardConfirm() {
        if(isDraft) {
            setPriceListNames(prev => prev.filter(n => n !== selected));
        }

        setPriceList(null);
        setIsDraft(false);
        setUnsavedChanges(false);
    }

    function triggerUpdatePriceListName(newName) {
        updatePriceListName(priceList, newName, setPriceList, setPriceListNames);

        setUnsavedChanges(true);
        setSelected(newName);
        onPriceListChange(newName);
    }

    //TODO split up and combine according to other operations' needs?
    function onLoad(newPriceList, fallback) {
        setPriceList(newPriceList);
        setOriginalPriceList(newPriceList);
        setFallbackUsed(fallback);
        setIsDraft(false);
        setLoaded(selected);
        onPriceListChange(selected);
        setUnsavedChanges(false);
    }

    function onSave(priceList) {
        setIsDraft(false);
        setUnsavedChanges(false);
        setLoaded(priceList.name);
    }

    function onDelete(toSelected, updatedNames) {
        setPriceListNames(updatedNames);
        setPriceList(null);
        setSelected(toSelected);
        setIsDraft(false);
        setUnsavedChanges(false);
    }

    function onNew(draft) {
        setPriceList(draft);
        setPriceListNames(prev => [...prev, draft.name]);
        setSelected(draft.name);
        setIsDraft(true);
        setUnsavedChanges(true);
        onPriceListChange(draft.name);
    }

    const isPriceListSet = priceList !== null;

    return (
        <div style={{
            ...handlerStyles.wrapper,
            ...(isDark ? handlerStyles.wrapperDark : handlerStyles.wrapperLight)
        }}>
            <div style={handlerStyles.handler}>
                <Inputs priceList={priceList} priceListNames={priceListNames} selected={selected}
                        unsavedChanges={unsavedChanges} isDraft={isDraft} setSelected={setSelected}
                        onDiscardConfirm={onDiscardConfirm} triggerUpdatePriceListName={triggerUpdatePriceListName} />

                <ButtonPanel status={status} setStatus={setStatus} selected={selected} isDraft={isDraft}
                             unsavedChanges={unsavedChanges} priceList={priceList} priceListNames={priceListNames}
                             onLoad={onLoad} onSave={onSave} onDelete={onDelete} onNew={onNew} />
            </div>

            <StatusBar status={status} fallbackUsed={fallbackUsed} isDraft={isDraft} unsavedChanges={unsavedChanges}
                       priceList={priceList} originalPriceList={originalPriceList} />

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