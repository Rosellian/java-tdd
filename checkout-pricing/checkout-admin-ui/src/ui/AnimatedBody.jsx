import { motion, AnimatePresence } from "framer-motion";

export function AnimatedBody({ children, open }) {
    return (
        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    key="body"
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={styles.wrapper}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const styles = {
    bodyWrapper: {
        overflow: "hidden"
    }
}