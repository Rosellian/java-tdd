export const handlerStyles = {
    wrapper: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "825px",
        gap: 16,
        padding: 16,
        borderRadius: 6,
        alignSelf: "flex-start",
        transition: "background 0.3s ease"
    },
    wrapperDark: {
        background: "#1a1a1a"
    },
    wrapperLight: {
        background: "#f5f5f5"
    },
    topRow: {
        display: "grid",
        gridTemplateColumns: "1fr 450px",
        gap: 16,
        width: "100%",
        maxWidth: 800,
        alignSelf: "stretch",
        justifySelf: "flex-start"
    },
    leftTop: {
        display: "flex",
        gap: 12
    },
    rightTop: {
        display: "flex",
        minWidth: 260
    },
    editorWrapper: {
        width: "100%",
        maxWidth: "755px",
        alignSelf: "stretch"
    }
}