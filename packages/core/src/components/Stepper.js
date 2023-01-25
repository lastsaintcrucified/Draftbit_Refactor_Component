import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { isNumber } from "lodash";
import { withTheme } from "../theming";
import IconButton from "./IconButton";
import { extractStyles } from "../utilities";
const Stepper = ({ min = -Infinity, max = Infinity, value: valueProp, defaultValue, style, iconSize = 24, iconColor, onChange, theme: { colors, typography }, Icon, }) => {
    const { viewStyles, textStyles } = extractStyles(style);
    const [value, setValue] = useState(defaultValue !== null && defaultValue !== void 0 ? defaultValue : 0);
    const isValidValue = (valueArg) => valueArg >= min && valueArg <= max;
    const handlePlusOrMinus = (type) => {
        const newValue = type === "plus" ? value + 1 : value - 1;
        if (isValidValue(newValue)) {
            setValue(newValue);
            onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        }
    };
    useEffect(() => {
        if (valueProp != null &&
            isNumber(valueProp) &&
            valueProp !== value &&
            isValidValue(valueProp)) {
            setValue(valueProp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueProp]);
    return (React.createElement(View, { style: [{ flexDirection: "row" }, viewStyles] },
        React.createElement(IconButton, { Icon: Icon, icon: "MaterialIcons/remove", onPress: () => handlePlusOrMinus("minus"), size: iconSize, color: iconColor, disabled: value === min, style: { opacity: value === min ? 0.5 : 1 } }),
        React.createElement(Text, { style: [
                typography.body1,
                {
                    textAlign: "center",
                    alignSelf: "center",
                    color: colors.medium,
                    marginHorizontal: 8,
                },
                textStyles,
            ] }, value),
        React.createElement(IconButton, { Icon: Icon, icon: "MaterialIcons/add", onPress: () => handlePlusOrMinus("plus"), size: iconSize, color: iconColor, disabled: value === max, style: { opacity: value === max ? 0.5 : 1 } })));
};
export default withTheme(Stepper);
