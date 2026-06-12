import {useEffect, useState} from "react";
import {useTheme} from "../../ui/ThemeProvider";
import {PriceListSelector} from "./pricelistselector/PriceListSelector";
import {TextInput} from "../rulesets/ruleseteditor/ruleform/templates/FormFields";
import {PriceListEditor} from "./pricelisteditor/PriceListEditor";
import {ButtonPanel} from "./operations/ButtonPanel";
import {getInitialState, updatePriceListName, updateState} from "./handlerFuncs";
import {Delete} from "./operations/Delete";
import {Save} from "./operations/Save";
import {New} from "./operations/New";
import {handlerStyles} from "./handlerStyles";

export function PriceListHandler({ onPriceListChange }) {
    const { theme } = useTheme();

    const [priceListNames, setPriceListNames] = useState([]);
    const [selected, setSelected] = useState("default");
    const [priceList, setPriceList] = useState(null);

    const [fallbackUsed, setFallbackUsed] = useState(false);
    const [mode, setMode] = useState("loading"); // loading, existing, new, deleting
    const [status, setStatus] = useState("idle"); // idle, saving, loading, deleting, error

    useEffect(() => getInitialState(setPriceListNames, setFallbackUsed, setSelected, setMode), []);

    useEffect(() => updateState(mode, selected, setStatus, setPriceList, setFallbackUsed,
            onPriceListChange),
        [selected, mode]);

    function triggerUpdatePriceListName(newName) {
        updatePriceListName(priceList, newName, setPriceList, setPriceListNames, setSelected, onPriceListChange);
    }

    const isPriceListSet = priceList !== null;

    return (
        <div style={{
            ...handlerStyles.wrapper,
            ...(theme === "dark" ? handlerStyles.wrapperDark : handlerStyles.wrapperLight)
        }}>
            {fallbackUsed && <div style={handlerStyles.fallback}>Failed to load from server, fallback used</div>}

            <div style={handlerStyles.handler}>
                <PriceListSelector value={selected} onChange={(v) => {
                    setMode("existing");
                    setSelected(v);
                }} names={priceListNames}/>

                {isPriceListSet && (
                    <TextInput label="Price List Name" field="name" value={priceList.name}
                               update={(field, value) => triggerUpdatePriceListName(value)}/>
                )}

                <ButtonPanel mode={mode} status={status} selected={selected}>
                    <Save priceList={priceList} setMode={setMode} status={status} setStatus={setStatus} />

                    <Delete priceList={priceList} setPriceList={setPriceList} priceListNames={priceListNames}
                            setPriceListNames={setPriceListNames} mode={mode} setMode={setMode} status={status}
                            setStatus={setStatus} selected={selected} setSelected={setSelected} />

                    <New setPriceList={setPriceList} setPriceListNames={setPriceListNames} setMode={setMode}
                         setSelected={setSelected} onPriceListChange={onPriceListChange} />
                </ButtonPanel>
            </div>

            {status === "loading" && <div style={handlerStyles.loading}>Loading price list…</div>}
            {status === "error" && <div style={handlerStyles.error}>Failed to load or save price list</div>}

            <div style={handlerStyles.editorWrapper}>
                {isPriceListSet && (
                    <PriceListEditor priceList={priceList} onChange={setPriceList} />
                )}
            </div>
        </div>
    );
}