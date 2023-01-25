import * as React from "react";
import { StyleSheet, View, Platform, } from "react-native";
import RadioButton from "./RadioButton";
import Text from "../Text";
import { useRadioButtonGroupContext } from "./context";
import { Direction as GroupDirection } from "./context";
import Touchable from "../Touchable";
import { extractStyles, getValueForRadioButton } from "../../utilities";
export var Direction;
(function (Direction) {
    Direction["Row"] = "row";
    Direction["RowReverse"] = "row-reverse";
})(Direction || (Direction = {}));
const getRadioButtonAlignment = (parentDirection, direction) => {
    if (parentDirection === GroupDirection.Horizontal) {
        return direction === Direction.Row ? "flex-start" : "flex-end";
    }
    else if (direction === Direction.RowReverse) {
        return "flex-start";
    }
    else {
        return "flex-end";
    }
};
const renderLabel = (value, labelStyle, textStyle) => {
    if (typeof value === "string") {
        return React.createElement(Text, { style: [labelStyle, textStyle] }, value);
    }
    else {
        return React.createElement(React.Fragment, null, value);
    }
};
const RadioButtonRow = ({ Icon, label, value = "", color, unselectedColor, onPress, labelContainerStyle, labelStyle, radioButtonStyle, direction = Direction.Row, selected, disabled, style, ...rest }) => {
    const { value: contextValue, onValueChange, direction: parentDirection, } = useRadioButtonGroupContext();
    const realValue = getValueForRadioButton(value);
    const realContextValue = getValueForRadioButton(contextValue);
    const isSelected = selected !== null && selected !== void 0 ? selected : realContextValue === realValue;
    const handlePress = () => {
        onPress === null || onPress === void 0 ? void 0 : onPress(realValue);
        onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(realValue);
    };
    const { textStyles, viewStyles } = extractStyles(style);
    return (React.createElement(Touchable, { onPress: handlePress, style: [styles.mainParent, { flexDirection: direction }, viewStyles], disabled: disabled, ...rest },
        React.createElement(View, { style: [
                styles.label,
                {
                    alignItems: direction === Direction.Row ? "flex-start" : "flex-end",
                },
                labelContainerStyle,
            ] }, renderLabel(label, labelStyle, textStyles)),
        React.createElement(View, { style: {
                flex: 1,
                alignItems: getRadioButtonAlignment(parentDirection, direction),
            } },
            React.createElement(RadioButton, { Icon: Icon, selected: isSelected, value: realValue, color: color, unselectedColor: unselectedColor, style: radioButtonStyle }))));
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
export default RadioButtonRow;
