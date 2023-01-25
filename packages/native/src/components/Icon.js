import * as React from "react";
import { View, StyleSheet, Platform, } from "react-native";
// This must use require to work in both web as a published project and in Snack
const VectorIcons = require("@expo/vector-icons");
const Icon = ({ name, color, size, style, ...rest }) => {
    if (!name)
        return null;
    let iconSet = "MaterialIcons";
    if (name.indexOf("/") !== -1) {
        [iconSet, name] = name.split("/");
    }
    const IconSet = VectorIcons[iconSet];
    return (React.createElement(View, { style: [styles.container, { width: size, height: size }, style] },
        React.createElement(IconSet, { ...rest, name: name, color: color, size: size })));
};
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        ...Platform.select({
            web: {
                cursor: "pointer",
                userSelect: "none",
            },
        }),
    },
});
export default Icon;
