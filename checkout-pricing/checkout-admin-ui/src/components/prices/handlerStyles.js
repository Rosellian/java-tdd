export const handlerStyles = {
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "flex-start",
        gap: 16,
        padding: 16,
        borderRadius: 6,
        transition: "background 0.3s ease"
    },
    wrapperDark: {
        background: "#1a1a1a"
    },
    wrapperLight: {
        background: "#f5f5f5"
    },
    handler: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        width: "fit-content",
        alignSelf: "flex-start"
    },
    inputs: {
        display: "flex",
        flexDirection: "column",
        gap: 10
    },
    editorWrapper: {
        width: "100%",
        maxWidth: "755px",
        alignSelf: "stretch"
    },
    loading: {
        opacity: 0.7
    },
    fallback: {
        color: "#e57335",
        fontWeight: "bold"
    },
    error: {
        color: "#E53935",
        fontWeight: "bold"
    }
}