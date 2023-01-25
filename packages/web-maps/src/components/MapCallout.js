import * as React from "react";
import { TouchableOpacity } from "react-native";
import { InfoWindow } from "./ReactGoogleMaps";
import { markerContext } from "./MapMarker";
const MapCallout = ({ anchor, onPress = () => { }, children, }) => {
    const { toggleCallout, position, calloutOpened } = React.useContext(markerContext);
    const handleClose = () => toggleCallout(false);
    if (!InfoWindow) {
        return null;
    }
    return calloutOpened ? (React.createElement(TouchableOpacity, { onPress: onPress },
        React.createElement(InfoWindow, { anchor: anchor, position: {
                lat: (position === null || position === void 0 ? void 0 : position.latitude) || 0,
                lng: (position === null || position === void 0 ? void 0 : position.longitude) || 0,
            }, onCloseClick: handleClose }, children))) : null;
};
export default MapCallout;
