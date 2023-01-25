import * as React from "react";
import { View, StyleSheet, Pressable, } from "react-native";
import { useTheme } from "../../theming";
import { usePrevious } from "../../hooks";
const Checkbox = ({ Icon, status, disabled = false, onPress, onCheck, onUncheck, color, uncheckedColor, defaultValue, checkedIcon = "MaterialCommunityIcons/checkbox-marked", uncheckedIcon = "MaterialCommunityIcons/checkbox-blank-outline", size = 24, style, ...rest }) => {
    const [internalValue, setInternalValue] = React.useState(status || defaultValue || false);
    React.useEffect(() => {
        if (status != null) {
            setInternalValue(status);
        }
    }, [status]);
    // This special logic is to handle weird APIs like Airtable that return
    // true or undefined for a boolean
    const previousDefaultValue = usePrevious(defaultValue);
    React.useEffect(() => {
        if (defaultValue !== previousDefaultValue) {
            setInternalValue(Boolean(defaultValue));
        }
    }, [defaultValue, previousDefaultValue]);
    const { colors } = useTheme();
    const checkboxColor = internalValue
        ? color || colors.primary
        : uncheckedColor || colors.primary;
    const handlePress = () => {
        const newValue = !internalValue;
        setInternalValue(newValue);
        onPress === null || onPress === void 0 ? void 0 : onPress(newValue);
        if (newValue) {
            onCheck === null || onCheck === void 0 ? void 0 : onCheck();
        }
        if (!newValue) {
            onUncheck === null || onUncheck === void 0 ? void 0 : onUncheck();
        }
    };
    return (React.createElement(Pressable, { ...rest, onPress: handlePress, disabled: disabled, accessibilityState: { disabled }, accessibilityRole: "button", accessibilityLiveRegion: "polite", style: [styles.container, style, { width: size, height: size }] },
        React.createElement(Icon, { style: styles.icon, name: internalValue ? checkedIcon : uncheckedIcon, size: size, color: checkboxColor }),
        React.createElement(View, { style: [StyleSheet.absoluteFill, styles.fillContainer] },
            React.createElement(View, { style: [
                    styles.fill,
                    { opacity: disabled ? 0.5 : 1 },
                    { borderColor: checkboxColor },
                ] }))));
};
const styles = StyleSheet.create({
    container: {
        borderRadius: 18,
    },
    fillContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        alignSelf: "center",
    },
    fill: {
        borderRadius: 5,
        width: 30,
        height: 30,
        alignSelf: "center",
    },
});
export default Checkbox;
