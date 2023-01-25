import * as React from "react";
import { Marker } from "./ReactNativeMaps";
const MapMarker = ({ latitude, longitude, title, description, pinColor, flat, style, children, }) => {
    if (!Marker) {
        return null;
    }
    return (React.createElement(Marker, { coordinate: {
            latitude,
            longitude,
        }, title: title != null ? String(title) : undefined, description: description != null ? String(description) : undefined, flat: flat, pinColor: pinColor, style: style }, children));
};
export default MapMarker;
