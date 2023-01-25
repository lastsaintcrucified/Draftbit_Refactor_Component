import * as React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import omit from "lodash.omit";
import { Picker as NativePicker } from "@react-native-picker/picker";
import { withTheme } from "../../theming";
import Portal from "../Portal/Portal";
import Button from "../DeprecatedButton";
import TextField from "../TextField";
import Touchable from "../Touchable";
import { extractStyles } from "../../utilities";
const Picker = ({ Icon, style, options, placeholder, selectedValue, disabled = false, onValueChange = () => { }, theme: { colors }, ...props }) => {
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
    const [pickerVisible, setIsPickerVisible] = React.useState(false);
    const toggleVisibility = () => {
        setIsPickerVisible(!pickerVisible);
        // @ts-ignore
        textField.current.toggleFocus(); // cannot determine if method exists due to component being wrapped in a withTheme()
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
    return (React.createElement(View, { style: [styles.container, viewStyles] },
        React.createElement(Touchable, { disabled: disabled, onPress: toggleVisibility },
            React.createElement(TextField, { ...props, value: String(selectedLabel), placeholder: placeholder, 
                // @ts-ignore
                ref: textField, disabled: disabled, pointerEvents: "none", 
                // @ts-expect-error
                style: stylesWithoutMargin, Icon: Icon })),
        pickerVisible && (React.createElement(Portal, null,
            React.createElement(View, { style: [styles.picker, { backgroundColor: colors.divider }] },
                React.createElement(SafeAreaView, { style: styles.pickerContainer },
                    React.createElement(Button, { Icon: Icon, type: "text", onPress: toggleVisibility, style: styles.closeButton }, "Close"),
                    React.createElement(NativePicker, { style: { backgroundColor: "white" }, selectedValue: selectedValue, onValueChange: onValueChange }, options.map((o) => (React.createElement(NativePicker.Item, { label: o.label, value: o.value, key: o.value }))))))))));
};
const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
    },
    picker: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
    },
    pickerContainer: {
        backgroundColor: "white",
        flexDirection: "column",
        width: "100%",
    },
    closeButton: {
        alignSelf: "flex-end",
    },
});
export default withTheme(Picker);
