import * as React from "react";
import { StyleSheet, ScrollView, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { withTheme } from "../theming";
function ScreenContainer({ scrollable = false, hasSafeArea = false, hasBottomSafeArea = false, hasTopSafeArea = false, theme, style, children, ...rest }) {
    const backgroundColor = theme.colors.background;
    const edges = ["left", "right"];
    if (hasSafeArea || hasTopSafeArea) {
        edges.push("top");
    }
    if (hasSafeArea || hasBottomSafeArea) {
        edges.push("bottom");
    }
    return (React.createElement(SafeAreaView, { edges: edges, style: [
            styles.container,
            {
                backgroundColor,
            },
        ], ...rest }, scrollable ? (React.createElement(ScrollView, { contentContainerStyle: [
            styles.scrollViewContainer,
            { backgroundColor },
            style,
        ] }, children)) : (React.createElement(View, { style: [styles.container, { backgroundColor }, style] }, children))));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContainer: {
        flexGrow: 1,
        flex: undefined,
    },
});
export default withTheme(ScreenContainer);
