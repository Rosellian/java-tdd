export function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className="confirm-overlay">
            <div className="confirm-modal">
                <div className="confirm-message">
                    {message}
                </div>

                <ConfirmButtons onCancel={onCancel} onConfirm={onConfirm} />
            </div>
        </div>
    )
}

function ConfirmButtons({ onCancel, onConfirm }) {
    return (
        <div className="confirm-buttons">
            <button className="confirm-cancel" onClick={onCancel}>
                Cancel
            </button>

            <button className="confirm-ok" onClick={onConfirm}>
                Confirm
            </button>
        </div>
    )
}