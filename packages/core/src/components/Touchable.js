import React from "react";
import { Pressable } from "react-native";
export default function Touchable({ children, disabled, onPress, activeOpacity, disabledOpacity, delayLongPress, hitSlop, style, ...props }) {
    return (React.createElement(Pressable, { disabled: disabled, onPress: onPress, delayLongPress: delayLongPress ? delayLongPress : 500, hitSlop: hitSlop ? hitSlop : 8, style: ({ pressed }) => {
            return [
                {
                    opacity: pressed ? activeOpacity : disabled ? disabledOpacity : 1,
                },
                style,
            ];
        }, ...props }, children));
}
