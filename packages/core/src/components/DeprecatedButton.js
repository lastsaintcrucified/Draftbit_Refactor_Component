import * as React from "react";
import { ActivityIndicator, View, Text, StyleSheet, Pressable, } from "react-native";
import color from "color";
import Config from "./Config";
import Elevation from "./Elevation";
import { withTheme } from "../theming";
const Button = ({ Icon, icon, disabled = false, type = "solid", loading = false, labelColor, color: colorOverride, children, onPress, elevation = 0, theme: { colors, disabledOpacity, roundness, typography }, ...rest }) => {
    let backgroundColor, borderColor, textColor, borderWidth;
    const buttonColor = colorOverride || colors.primary;
    if (type === "solid") {
        backgroundColor = buttonColor;
        if (disabled) {
            textColor = color(colors.surface).alpha(disabledOpacity).rgb().string();
        }
        else {
            textColor = labelColor || colors.surface;
        }
    }
    else {
        backgroundColor = "transparent";
        if (disabled) {
            textColor = color(buttonColor).alpha(disabledOpacity).rgb().string();
        }
        else {
            textColor = labelColor || buttonColor;
        }
    }
    if (type === "outline") {
        if (disabled) {
            borderColor = color(buttonColor).alpha(disabledOpacity).rgb().string();
        }
        else {
            borderColor = buttonColor;
        }
        borderWidth = StyleSheet.hairlineWidth;
    }
    else {
        borderColor = "transparent";
        borderWidth = 0;
    }
    const buttonStyle = {
        backgroundColor,
        borderColor,
        borderWidth,
        borderRadius: roundness,
    };
    const textStyle = {
        textAlign: "center",
        color: textColor,
        marginVertical: 16,
        marginHorizontal: 16,
    };
    const iconStyle = [
        styles.icon,
        {
            marginLeft: 16,
            marginRight: -8,
            width: Config.buttonIconSize,
        },
    ];
    return (React.createElement(Elevation, { style: { elevation, alignSelf: "stretch" } },
        React.createElement(Pressable, { ...rest, onPress: onPress, accessibilityState: { disabled }, accessibilityRole: "button", disabled: disabled || loading, style: [styles.button, buttonStyle] },
            React.createElement(View, { style: styles.content },
                icon && loading !== true ? (React.createElement(View, { style: iconStyle },
                    React.createElement(Icon, { name: icon, size: Config.buttonIconSize, color: textColor }))) : null,
                loading ? (React.createElement(ActivityIndicator, { size: "small", color: textColor, style: iconStyle })) : null,
                React.createElement(Text, { numberOfLines: 1, style: [textStyle, typography.button] }, children)))));
};
const styles = StyleSheet.create({
    button: {
        minWidth: 64,
        borderStyle: "solid",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        width: Config.buttonIconSize,
    },
});
export default withTheme(Button);
