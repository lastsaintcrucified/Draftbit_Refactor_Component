import * as React from "react";
import { View, Platform, Image } from "react-native";
import { SvgUri } from "react-native-svg";
import Config from "./Config";
const SVG = ({ source = Config.placeholderSvgURL, style, }) => {
    return (React.createElement(React.Fragment, null,
        Platform.OS === "ios" && (React.createElement(View, { style: style },
            React.createElement(SvgUri, { width: "100%", height: "100%", uri: source }))),
        Platform.OS === "android" && (React.createElement(View, { style: style },
            React.createElement(SvgUri, { width: "100%", height: "100%", uri: source }))),
        Platform.OS === "web" && (React.createElement(Image, { style: style, source: { uri: source } }))));
};
export default SVG;
