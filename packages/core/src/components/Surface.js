/* Copied from https://github.com/callstack/react-native-paper/blob/main/src/components/Surface.tsx */
import * as React from "react";
import { Animated, StyleSheet, } from "react-native";
import shadow from "../styles/shadow";
import overlay from "../styles/overlay";
import { withTheme } from "../theming";
const Surface = ({ elevation: propElevation, style, theme, children, ...rest }) => {
    const { elevation: styleElevation = 3, backgroundColor, ...restStyle } = (StyleSheet.flatten(style) || {});
    const { dark: isDarkTheme, mode, colors } = theme;
    const elevation = propElevation || styleElevation;
    const evalationStyles = elevation ? shadow(elevation) : {};
    const getBackgroundColor = () => {
        if (backgroundColor) {
            return backgroundColor;
        }
        else if (isDarkTheme && mode === "adaptive") {
            return overlay(elevation, colors.surface);
        }
        else {
            return colors.surface;
        }
    };
    return (React.createElement(Animated.View, { ...rest, style: [
            {
                backgroundColor: getBackgroundColor(),
                elevation,
                ...evalationStyles,
                ...restStyle,
            },
        ] }, children));
};
export default withTheme(Surface);
