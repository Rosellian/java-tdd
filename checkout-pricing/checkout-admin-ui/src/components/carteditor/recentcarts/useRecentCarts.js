import {useEffect, useState} from "react";

export function useRecentCarts(cart) {
    const [recent, setRecent] = useState(() => {
        const saved = localStorage.getItem("recentCarts");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        if(!cart || Object.keys(cart).length === 0) return;

        setRecent(prev => {
            const next = [cart, ...prev.filter(c => JSON.stringify(c) !== JSON.stringify(cart))];
            const trimmed = next.slice(0, 5);
            localStorage.setItem("recentCarts", JSON.stringify(trimmed));
            return trimmed;
        })
    }, [cart]);

    return recent;
}