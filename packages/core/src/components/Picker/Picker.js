import * as React from "react";
import { View, StyleSheet, Text, Platform, Dimensions, } from "react-native";
import { omit, pickBy, identity, isObject } from "lodash";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker as NativePicker } from "@react-native-picker/picker";
import { withTheme } from "../../theming";
import Portal from "../Portal/Portal";
import Button from "../DeprecatedButton";
import Touchable from "../Touchable";
import { extractStyles, extractBorderAndMarginStyles, borderStyleNames, marginStyleNames, } from "../../utilities";
function normalizeOptions(options) {
    if (options.length === 0) {
        return [];
    }
    if (typeof options[0] === ("string" || "number")) {
        return options.map((option) => ({
            label: String(option),
            value: String(option),
        }));
    }
    if (isObject(options[0]) &&
        options[0].value !== null &&
        options[0].label !== null) {
        return options.map((option) => {
            return {
                label: String(option.label),
                value: String(option.value),
            };
        });
    }
    throw new Error('Picker options must be either an array of strings or array of { "label": string; "value": string; } objects.');
}
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");
const isIos = Platform.OS === "ios";
const unstyledColor = "rgba(165, 173, 183, 1)";
const disabledColor = "rgb(240, 240, 240)";
const errorColor = "rgba(255, 69, 100, 1)";
const Picker = ({ error, options = [], onValueChange, defaultValue, Icon, style, placeholder, value, disabled = false, theme, assistiveText, label, iconColor = unstyledColor, iconSize = 24, leftIconMode = "inset", leftIconName, placeholderTextColor = unstyledColor, rightIconName, type = "solid", }) => {
    var _a, _b;
    const androidPickerRef = React.useRef(undefined);
    const [internalValue, setInternalValue] = React.useState(value || defaultValue);
    const [pickerVisible, setPickerVisible] = React.useState(false);
    const togglePickerVisible = () => {
        setPickerVisible(!pickerVisible);
    };
    React.useEffect(() => {
        if (value != null) {
            setInternalValue(value);
        }
    }, [value]);
    React.useEffect(() => {
        if (defaultValue != null) {
            setInternalValue(defaultValue);
        }
    }, [defaultValue]);
    React.useEffect(() => {
        var _a;
        if (pickerVisible && androidPickerRef.current) {
            (_a = androidPickerRef === null || androidPickerRef === void 0 ? void 0 : androidPickerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }, [pickerVisible, androidPickerRef]);
    const normalizedOptions = normalizeOptions(options);
    const pickerOptions = placeholder
        ? [{ value: placeholder, label: placeholder }, ...normalizedOptions]
        : normalizedOptions;
    const { colors } = theme;
    const { viewStyles, textStyles } = extractStyles(style);
    const additionalBorderStyles = ["backgroundColor"];
    const additionalMarginStyles = [
        "bottom",
        "height",
        "left",
        "maxHeight",
        "maxWidth",
        "minHeight",
        "minWidth",
        "overflow",
        "position",
        "right",
        "top",
        "width",
        "zIndex",
    ];
    const { borderStyles: extractedBorderStyles, marginStyles: extractedMarginStyles, } = extractBorderAndMarginStyles(viewStyles, additionalBorderStyles, additionalMarginStyles);
    const borderStyles = {
        ...{
            ...(type === "solid"
                ? {
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderTopWidth: 1,
                    borderRightWidth: 1,
                    borderLeftWidth: 1,
                }
                : {}),
            borderBottomWidth: 1,
            borderColor: unstyledColor,
            borderStyle: "solid",
        },
        ...extractedBorderStyles,
        ...(error ? { borderColor: errorColor } : {}),
        ...(disabled
            ? { borderColor: "transparent", backgroundColor: disabledColor }
            : {}),
    };
    const marginStyles = {
        height: 60,
        ...extractedMarginStyles,
    };
    const stylesWithoutBordersAndMargins = omit(viewStyles, [
        ...borderStyleNames,
        ...marginStyleNames,
        ...additionalBorderStyles,
        ...additionalMarginStyles,
    ]);
    const selectedLabel = internalValue &&
        ((_b = (_a = pickerOptions.find((option) => option.value === internalValue)) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : internalValue);
    const labelText = label ? (React.createElement(Text, { style: {
            textAlign: textStyles.textAlign,
            color: unstyledColor,
            fontSize: 12,
            paddingBottom: 4,
        } }, label)) : null;
    const leftIconOutset = leftIconMode === "outset";
    const leftIcon = leftIconName ? (React.createElement(Icon, { name: leftIconName, color: disabled ? unstyledColor : iconColor, size: iconSize, style: {
            marginRight: 4,
            marginLeft: 4,
        } })) : null;
    const rightIcon = rightIconName ? (React.createElement(Icon, { name: rightIconName, color: disabled ? unstyledColor : iconColor, size: iconSize, style: {
            marginRight: -10,
            marginLeft: 8,
        } })) : null;
    const textAlign = textStyles === null || textStyles === void 0 ? void 0 : textStyles.textAlign;
    const calculateLeftPadding = () => {
        if (leftIconOutset) {
            if (textAlign === "center") {
                return iconSize - Math.abs(8 - iconSize);
            }
            return iconSize + 8;
        }
        return 0;
    };
    const assistiveTextLabel = assistiveText ? (React.createElement(Text, { style: {
            textAlign,
            width: "100%",
            paddingLeft: calculateLeftPadding(),
            color: unstyledColor,
            fontSize: 12,
            paddingTop: 4,
        } }, assistiveText)) : null;
    const primaryTextStyle = {
        color: unstyledColor,
        fontSize: 14,
        ...pickBy(textStyles, identity),
        ...(placeholder === internalValue ? { color: placeholderTextColor } : {}),
        ...(disabled ? { color: unstyledColor } : {}),
    };
    const handleValueChange = (newValue, itemIndex) => {
        if (!placeholder || itemIndex > 0) {
            onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(newValue, itemIndex);
        }
        setInternalValue(newValue);
    };
    return (
    /* marginsContainer */
    React.createElement(View, { style: [styles.marginsContainer, marginStyles] },
        React.createElement(Touchable, { disabled: disabled, onPress: togglePickerVisible, style: styles.touchableContainer },
            React.createElement(View, { pointerEvents: "none", style: [
                    styles.outsetContainer,
                    stylesWithoutBordersAndMargins,
                    !leftIconOutset ? borderStyles : {},
                ] },
                leftIcon,
                React.createElement(View, { style: [
                        styles.insetContainer,
                        leftIconOutset ? borderStyles : {},
                    ] },
                    React.createElement(View, { style: styles.primaryTextContainer },
                        labelText,
                        React.createElement(Text, { style: primaryTextStyle }, String(selectedLabel !== null && selectedLabel !== void 0 ? selectedLabel : placeholder))),
                    rightIcon)),
            assistiveTextLabel),
        isIos && pickerVisible ? (React.createElement(Portal, null,
            React.createElement(View, { style: [
                    styles.iosPicker,
                    {
                        backgroundColor: colors.divider,
                    },
                ] },
                React.createElement(SafeAreaView, { style: styles.iosSafeArea },
                    React.createElement(Button, { Icon: Icon, type: "text", onPress: togglePickerVisible, style: styles.iosButton }, "Close"),
                    React.createElement(NativePicker, { style: styles.iosNativePicker, selectedValue: internalValue, onValueChange: handleValueChange }, pickerOptions.map((option) => (React.createElement(NativePicker.Item, { label: option.label, value: option.value, key: option.value })))))))) : null,
        !isIos && pickerVisible ? (React.createElement(NativePicker, { enabled: pickerVisible, selectedValue: internalValue, onValueChange: handleValueChange, style: styles.nonIosPicker, ref: androidPickerRef, onBlur: () => setPickerVisible(false) }, pickerOptions.map((option) => (React.createElement(NativePicker.Item, { label: option.label, value: option.value, key: option.value }))))) : null));
};
const styles = StyleSheet.create({
    marginsContainer: {
        alignSelf: "stretch",
        alignItems: "center",
        width: "100%",
        maxWidth: deviceWidth,
    },
    touchableContainer: {
        flex: 1,
        height: "100%",
        width: "100%",
        alignSelf: "stretch",
        alignItems: "center",
    },
    outsetContainer: {
        flex: 1,
        height: "100%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    insetContainer: {
        flex: 1,
        height: "100%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 12,
        paddingRight: 12,
    },
    primaryTextContainer: {
        flex: 1,
    },
    iosPicker: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        maxWidth: deviceWidth,
        maxHeight: deviceHeight,
    },
    iosSafeArea: {
        backgroundColor: "white",
        flexDirection: "column",
        width: "100%",
        maxWidth: deviceWidth,
    },
    iosButton: {
        alignSelf: "flex-end",
    },
    iosNativePicker: {
        backgroundColor: "white",
    },
    nonIosPicker: {
        opacity: 0,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        maxWidth: deviceWidth,
        maxHeight: deviceHeight,
    },
});
export default withTheme(Picker);
