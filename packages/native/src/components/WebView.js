import React, { useState, useEffect, } from "react";
import { Button, Platform, ScrollView, StyleSheet, Dimensions, ActivityIndicator, Text, } from "react-native";
import { WebView } from "react-native-webview";
import { Camera } from "expo-camera";
// Auto-height fix (if this is not present, scrolling on Android does not work)
const injectFirst = `
  window.ReactNativeWebView.postMessage(
    Math.max(document.body.offsetHeight, document.body.scrollHeight)
  );
`;
const NativeWebView = ({ source, style, optimizeVideoChat, ...otherWebViewProps }) => {
    const [height, setHeight] = useState(0);
    const [cameraPermissions, setCameraPermissions] = useState(null);
    const [microphonePermissions, setMicrophonePermissions] = useState(null);
    const videoChatProps = optimizeVideoChat
        ? {
            allowsInlineMediaPlayback: true,
            domStorageEnabled: true,
            javaScriptEnabled: true,
            mediaCapturePermissionGrantType: "grant",
            mediaPlaybackRequiresUserAction: false,
            startInLoadingState: true,
        }
        : {};
    const onMessage = (event) => setHeight(Number(event.nativeEvent.data));
    const getAndSetPermissions = async (currentState, setCurrentState, getPermission, requestPermission) => {
        const currentPermission = currentState !== null && currentState !== void 0 ? currentState : (await getPermission());
        if (currentPermission.granted || !currentPermission.canAskAgain) {
            setCurrentState(currentPermission);
        }
        else {
            setCurrentState(await requestPermission());
        }
    };
    const getAndSetCameraAndMicrophonePermissions = async () => {
        await getAndSetPermissions(cameraPermissions, setCameraPermissions, Camera.getCameraPermissionsAsync, Camera.requestCameraPermissionsAsync);
        await getAndSetPermissions(microphonePermissions, setMicrophonePermissions, Camera.getMicrophonePermissionsAsync, Camera.requestMicrophonePermissionsAsync);
    };
    const getFinalWidth = () => {
        const { width } = Dimensions.get("window");
        if (typeof (style === null || style === void 0 ? void 0 : style.width) === "number") {
            return style.width;
        }
        else if (typeof (style === null || style === void 0 ? void 0 : style.width) === "string" && style.width.includes("%")) {
            return width * (Number(style.width.replace("%", "")) / 100);
        }
        else {
            return width;
        }
    };
    const selectComponent = () => {
        if (!optimizeVideoChat ||
            ((cameraPermissions === null || cameraPermissions === void 0 ? void 0 : cameraPermissions.granted) && (microphonePermissions === null || microphonePermissions === void 0 ? void 0 : microphonePermissions.granted))) {
            return (React.createElement(WebView, { source: source, style: { ...style, width: getFinalWidth() }, injectedJavaScript: injectFirst, onMessage: onMessage, ...otherWebViewProps, ...videoChatProps }));
        }
        if ((!(cameraPermissions === null || cameraPermissions === void 0 ? void 0 : cameraPermissions.granted) && (cameraPermissions === null || cameraPermissions === void 0 ? void 0 : cameraPermissions.canAskAgain)) ||
            (!(microphonePermissions === null || microphonePermissions === void 0 ? void 0 : microphonePermissions.granted) && (microphonePermissions === null || microphonePermissions === void 0 ? void 0 : microphonePermissions.canAskAgain))) {
            return (React.createElement(Button, { title: "Press to enable Audio and/or Video permissions", onPress: getAndSetCameraAndMicrophonePermissions }));
        }
        if (((cameraPermissions === null || cameraPermissions === void 0 ? void 0 : cameraPermissions.status) === "denied" &&
            (cameraPermissions === null || cameraPermissions === void 0 ? void 0 : cameraPermissions.canAskAgain) === false) ||
            ((microphonePermissions === null || microphonePermissions === void 0 ? void 0 : microphonePermissions.status) === "denied" &&
                (microphonePermissions === null || microphonePermissions === void 0 ? void 0 : microphonePermissions.canAskAgain) === false)) {
            return (React.createElement(Text, null, "Set the missing Audio and/or Video permissions in System Settings"));
        }
        return React.createElement(ActivityIndicator, null);
    };
    useEffect(() => {
        if (optimizeVideoChat)
            getAndSetCameraAndMicrophonePermissions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optimizeVideoChat]);
    return (React.createElement(ScrollView, { contentContainerStyle: [
            styles.container,
            {
                height: (style === null || style === void 0 ? void 0 : style.height) || height,
            },
        ] }, selectComponent()));
};
const BrowserWebView = ({ source, style, optimizeVideoChat, }) => {
    const videoChatProps = optimizeVideoChat
        ? {
            frameBorder: "0",
            allow: "camera; microphone; fullscreen; speaker; display-capture",
        }
        : {};
    const videoChatStyles = optimizeVideoChat
        ? { width: "100%", height: "100%" }
        : {};
    const flatStyles = StyleSheet.flatten([videoChatStyles, style]);
    return React.createElement("iframe", {
        style: flatStyles,
        height: flatStyles === null || flatStyles === void 0 ? void 0 : flatStyles.height,
        width: flatStyles === null || flatStyles === void 0 ? void 0 : flatStyles.width,
        src: source === null || source === void 0 ? void 0 : source.uri,
        srcDoc: source === null || source === void 0 ? void 0 : source.html,
        allowFullScreen: true,
        seamless: true,
        ...videoChatProps,
    });
};
export default Platform.select({
    native: NativeWebView,
    default: BrowserWebView,
});
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
