import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Marker as WebMarker } from "./ReactGoogleMaps";
import MapCallout from "./MapCallout";
export const markerContext = React.createContext({
    pinColor: "#E74C3C",
    calloutOpened: false,
    position: undefined,
    toggleCallout: () => { },
});
const MapMarker = ({ pinColor, latitude, longitude, title, description, children, }) => {
    const { Provider } = markerContext;
    const [calloutOpened, toggleCallout] = React.useState(false);
    const [marker, setMarker] = React.useState(null);
    const handleMarkerClick = () => toggleCallout(true);
    const handleOnLoad = (m) => setMarker(m);
    if (!WebMarker) {
        return null;
    }
    let mappedChildren;
    if (!children) {
        if (title || description) {
            mappedChildren = (React.createElement(MapCallout, { showTooltip: true, anchor: marker },
                React.createElement(View, { style: style.tooltip },
                    title && React.createElement(Text, { style: style.title }, title),
                    description && (React.createElement(Text, { style: style.description }, description)))));
        }
    }
    else {
        mappedChildren = React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
                index,
                anchor: marker,
            });
        });
    }
    return (React.createElement(Provider, { value: {
            pinColor: pinColor,
            calloutOpened,
            toggleCallout: (value) => toggleCallout(value),
            position: {
                latitude,
                longitude,
            },
        } },
        React.createElement(WebMarker, { position: {
                lat: latitude,
                lng: longitude,
            }, onClick: handleMarkerClick, onLoad: handleOnLoad }, mappedChildren)));
};
const style = StyleSheet.create({
    tooltip: {
        display: "flex",
        flexDirection: "column",
    },
    title: {
        fontWeight: "600",
        textAlign: "center",
    },
    description: {
        textAlign: "center",
    },
});
export default MapMarker;
