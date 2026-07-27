export function Tooltip({ text, children }) {
    return (
        <span className="tooltip-wrapper">
            {children}

            <span className="tooltip-box">
                {text}
            </span>
        </span>
    )
}