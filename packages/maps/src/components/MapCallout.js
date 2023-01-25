import * as React from "react";
import { Callout } from "./ReactNativeMaps";
const MapCallout = ({ onPress, showTooltip, children, }) => {
    if (!Callout) {
        return null;
    }
    return (React.createElement(Callout, { tooltip: !showTooltip, onPress: onPress }, children));
};
export default MapCallout;
