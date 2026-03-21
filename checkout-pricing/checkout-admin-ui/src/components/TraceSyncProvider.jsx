import {createContext, useContext, useState} from "react";

const TraceSyncContext = createContext(null);

export function TraceSyncProvider({ children }) {
    const [selectedStep, setSelectedStep] = useState(null);
    const [selectedRule, setSelectedRule] = useState(null);
    const [selectedChainStep, setSelectedChainStep] = useState(null);

    return (
        <TraceSyncContext.Provider value={{
            selectedStep,
            setSelectedStep,
            selectedChainStep,
            setSelectedChainStep,
            selectedRule,
            setSelectedRule
        }}>
            {children}
        </TraceSyncContext.Provider>
    );
}

export function useTraceSync() {
    return useContext(TraceSyncContext);
}

