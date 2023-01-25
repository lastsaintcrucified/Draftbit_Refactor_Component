import * as React from "react";
import { StyleSheet, View, Platform, Pressable, } from "react-native";
import { isString } from "lodash";
import { extractStyles } from "../../utilities";
import { usePrevious } from "../../hooks";
import Text from "../Text";
import Checkbox from "./Checkbox";
export var Direction;
(function (Direction) {
    Direction["Row"] = "row";
    Direction["RowReverse"] = "row-reverse";
})(Direction || (Direction = {}));
const renderLabel = (value, labelStyle, textStyle) => {
    if (isString(value)) {
        return React.createElement(Text, { style: [textStyle, labelStyle] }, value);
    }
    else {
        return React.createElement(React.Fragment, null, value);
    }
};
const CheckboxRow = ({ label = "Label", labelStyle, labelContainerStyle, checkboxStyle, direction = Direction.Row, Icon, status, disabled = false, onPress, onCheck, onUncheck, color, uncheckedColor, defaultValue, checkedIcon, uncheckedIcon, size, style, ...rest }) => {
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
    const { textStyles, viewStyles } = extractStyles(style);
    return (React.createElement(Pressable, { onPress: handlePress, style: [viewStyles, styles.mainParent, { flexDirection: direction }], disabled: disabled, ...rest },
        React.createElement(View, { style: [
                styles.label,
                {
                    alignItems: direction === Direction.Row ? "flex-start" : "flex-end",
                },
                labelContainerStyle,
            ] }, renderLabel(label, textStyles, labelStyle)),
        React.createElement(Checkbox, { Icon: Icon, status: internalValue, style: checkboxStyle, disabled: disabled, onPress: handlePress, color: color, uncheckedColor: uncheckedColor, checkedIcon: checkedIcon, uncheckedIcon: uncheckedIcon, size: size })));
};
const styles = StyleSheet.create({
    mainParent: {
        alignItems: "center",
        justifyContent: "space-around",
        paddingStart: 20,
        minHeight: 50,
        paddingEnd: 20,
        display: "flex",
        ...Platform.select({
            web: {
                cursor: "pointer",
                userSelect: "none",
            },
        }),
    },
    label: {
        flex: 3,
    },
});
export default CheckboxRow;
