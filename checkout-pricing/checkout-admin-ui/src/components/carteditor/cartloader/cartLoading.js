export function copyCart(cart) {
    const json = JSON.stringify(cart, null, 2);
    navigator.clipboard.writeText(json);
}

export function loadStandardCart(setCart) {
    const defaultCart = {
        "A": 5,
        "B": 4,
        "C": 3,
        "D": 2,
        "E": 1
    };
    setCart(defaultCart);
}

export function importCart(importText, setCart) {
    try {
        const parsed = JSON.parse(importText);
        if(typeof parsed !== "object" || Array.isArray(parsed)) {
            alert("Invalid cart format")
            return;
        }
        setCart(parsed);
    } catch (error) {
        alert("Invalid JSON");
    }
}