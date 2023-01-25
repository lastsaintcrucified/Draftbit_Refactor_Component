import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Picker as NativePicker } from "@react-native-picker/picker";
import omit from "lodash.omit";
import { withTheme } from "../../theming";
import { extractStyles } from "../../utilities";
import TextField from "../TextField";
import Touchable from "../Touchable";
const Picker = ({ style, options, placeholder, selectedValue, disabled = false, onValueChange: onValueChangeOverride = () => { }, ...props }) => {
    var _a, _b;
    const { viewStyles: { borderRadius, // eslint-disable-line @typescript-eslint/no-unused-vars
    borderWidth, // eslint-disable-line @typescript-eslint/no-unused-vars
    borderTopWidth, // eslint-disable-line @typescript-eslint/no-unused-vars
    borderRightWidth, // eslint-disable-line @typescript-eslint/no-unused-vars
    borderBottomWidth, // eslint-disable-line @typescript-eslint/no-unused-vars
    borderLeftWidth, // eslint-disable-line @typescript-eslint/no-unused-vars
    borderColor, // eslint-disable-line @typescript-eslint/no-unused-vars
    backgroundColor, // eslint-disable-line @typescript-eslint/no-unused-vars
    padding, // eslint-disable-line @typescript-eslint/no-unused-vars
    paddingTop, // eslint-disable-line @typescript-eslint/no-unused-vars
    paddingRight, // eslint-disable-line @typescript-eslint/no-unused-vars
    paddingBottom, // eslint-disable-line @typescript-eslint/no-unused-vars
    paddingLeft, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...viewStyles }, } = extractStyles(style);
    const textField = React.useRef(undefined);
    const onValueChange = (itemValue, itemIndex) => {
        toggleFocus();
        onValueChangeOverride(itemValue, itemIndex);
    };
    const toggleFocus = () => {
        if (!disabled) {
            // @ts-ignore
            textField.current.toggleFocus(); // cannot determine if method exists due to component being wrapped in a withTheme()
        }
    };
    const stylesWithoutMargin = style &&
        omit(StyleSheet.flatten(style), [
            "margin",
            "marginTop",
            "marginRight",
            "marginBottom",
            "marginLeft",
        ]);
    const selectedLabel = selectedValue &&
        ((_b = (_a = options.find((o) => o.value === selectedValue)) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : selectedValue);
    return (React.createElement(Touchable, { disabled: disabled, onPress: toggleFocus, style: [styles.container, viewStyles] },
        React.createElement(View, null,
            React.createElement(NativePicker, { enabled: !disabled, selectedValue: selectedValue, onValueChange: onValueChange, style: {
                    flex: 1,
                    opacity: 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: "100%",
                } }, options.map((o) => (React.createElement(NativePicker.Item, { label: o.label, value: o.value, key: o.value })))),
            React.createElement(View, { pointerEvents: "none" },
                React.createElement(TextField, { ...props, value: selectedLabel, placeholder: placeholder, 
                    // @ts-ignore
                    ref: textField, disabled: disabled, 
                    // @ts-expect-error
                    style: stylesWithoutMargin })))));
};
const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
    },
});
export default withTheme(Picker);
