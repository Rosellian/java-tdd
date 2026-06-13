import {SkuBody} from "./skubody/SkuBody";
import {AnimatedBody} from "../../../../ui/AnimatedBody";
import {SkuHeader} from "./SkuHeader";
import {useTheme} from "../../../../ui/ThemeProvider";
import {useState} from "react";

export function SkuItem({ skuData }) {
    const { theme } = useTheme();

    const [open, setOpen] = useState(false);

    return (
        <div style={{
            ...styles.sku,
            ...(theme === "dark" ? styles.skuDark : styles.skuLight)
        }}>
            <SkuHeader skuData={skuData} onClick={() => setOpen(!open)}/>

            <AnimatedBody open={open}>
                <SkuBody skuData={skuData} />
            </AnimatedBody>
        </div>
    );
}

const styles = {
    sku: {
        marginBottom: 10,
        borderRadius: 4,
        border: "1px solid",
        transition: "background 0.25s ease, border-color 0.25s ease",
    },
    skuDark: {
        background: "#1E1E1E",
        borderColor: "#333",
        color: "#eee",
    },
    skuLight: {
        background: "#fafafa",
        borderColor: "#ccc",
        color: "#222",
    }
}