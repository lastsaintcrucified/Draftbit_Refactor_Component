import * as React from "react";
import Config from "../Config";
import IconButton from "../IconButton";
import { getValueForRadioButton } from "../../utilities";
import { useRadioButtonGroupContext } from "./context";
const RadioButton = ({ Icon, disabled = false, color, value = "", selected, unselectedColor, onPress, size = Config.radioButtonSize, selectedIcon = "MaterialIcons/radio-button-checked", unselectedIcon = "MaterialIcons/radio-button-unchecked", style, ...rest }) => {
    const { value: contextValue, onValueChange } = useRadioButtonGroupContext();
    const realValue = getValueForRadioButton(value);
    const realContextValue = getValueForRadioButton(contextValue);
    const isSelected = selected !== null && selected !== void 0 ? selected : realContextValue === realValue;
    const handlePress = () => {
        onPress === null || onPress === void 0 ? void 0 : onPress(realValue);
        onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(realValue);
    };
    return (React.createElement(IconButton, { Icon: Icon, icon: isSelected ? selectedIcon : unselectedIcon, color: isSelected ? color : unselectedColor, disabled: disabled, onPress: handlePress, size: size, style: style, ...rest }));
};
export default RadioButton;
