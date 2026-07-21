import { useState } from "react";

export function Collapsible({ title, children, defaultOpen = false,
                                closedClass = {class: "", add: false} }) {
    const [open, setOpen] = useState(defaultOpen);

    let addClosedClass = closedClass.add && !open ? closedClass.class : "";

    return (
        <div className={"collapsible" + addClosedClass}>
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
