import { useState } from "react";

export function Collapsible({ title, children, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="collapsible">
            <div className="collapsible-header" onClick={() => setOpen(!open)}>
                <h3>{title}</h3>

                <span className={`arrow ${open ? "open" : ""}`}>▸</span>
            </div>

            <div className={`collapsible-body ${open ? "open" : ""}`}>
                {children}
            </div>
        </div>
    )
}
