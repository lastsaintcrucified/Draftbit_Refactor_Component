import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
const LinearGradientComponent = ({ children, color1 = "rgba(90, 69, 255, 1)", color2 = "rgba(59, 201, 234, 1)", color3 = undefined, startX = 0, startY = 0, endX = 100, endY = 100, style, }) => {
    const colors = [color1, color2, color3].filter((color) => color);
    const start = { x: startX / 100, y: startY / 100 };
    const end = { x: endX / 100, y: endY / 100 };
    return (React.createElement(LinearGradient, { colors: colors, start: start, end: end, style: style }, children));
};
export default LinearGradientComponent;
