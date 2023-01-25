import * as React from "react";
import { View } from "react-native";
import { getValueForRadioButton } from "../../utilities";
import { radioButtonGroupContext, Direction } from "./context";
const { Provider } = radioButtonGroupContext;
const RadioButtonGroup = ({ direction = Direction.Vertical, value = "", onValueChange, defaultValue, style, children, ...rest }) => {
    const [internalValue, setInternalValue] = React.useState("");
    React.useEffect(() => {
        if (value != null) {
            const realValue = getValueForRadioButton(value);
            setInternalValue(realValue);
        }
    }, [value]);
    React.useEffect(() => {
        if (defaultValue != null) {
            const realDefaultValue = getValueForRadioButton(defaultValue);
            setInternalValue(realDefaultValue);
        }
    }, [defaultValue]);
    const handleValueChange = (newValue) => {
        const realNewValue = getValueForRadioButton(newValue);
        setInternalValue(realNewValue);
        onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(realNewValue);
    };
    const _containerStyle = [
        {
            flexDirection: direction === Direction.Horizontal ? "row" : "column",
        },
    ];
    if (direction !== Direction.Vertical) {
        _containerStyle.push({
            alignItems: "center",
        });
    }
    return (React.createElement(View, { style: [{ minHeight: 40 }, style], ...rest },
        React.createElement(Provider, { value: {
                value: internalValue,
                onValueChange: handleValueChange,
                direction,
            } },
            React.createElement(View, { style: _containerStyle }, children))));
};
export default RadioButtonGroup;
