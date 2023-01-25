import React from "react";
import { Pressable as NativePressable, } from "react-native";
export default function Pressable({ children, disabled, onPress, activeOpacity, disabledOpacity, delayLongPress, hitSlop, style, ...props }) {
    return (React.createElement(NativePressable, { onPress: onPress, disabled: disabled, delayLongPress: delayLongPress ? delayLongPress : 500, hitSlop: hitSlop ? hitSlop : 8, style: ({ pressed }) => {
            return [
                {
                    opacity: pressed ? activeOpacity : disabled ? disabledOpacity : 1,
                },
                style,
            ];
        }, ...props }, children));
}
