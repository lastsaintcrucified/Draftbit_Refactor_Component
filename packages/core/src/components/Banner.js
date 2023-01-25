import * as React from "react";
import { Button, Text, View, StyleSheet, Animated, } from "react-native";
import Surface from "./Surface";
import shadow from "../styles/shadow";
import { withTheme } from "../theming";
const ELEVATION = 1;
const DEFAULT_MAX_WIDTH = 960;
const Banner = ({ initiallyVisible = true, dismissable = true, icon, buttonColor, content, contentStyle, style, theme, Icon, ...rest }) => {
    const [visible, setVisible] = React.useState(initiallyVisible);
    React.useEffect(() => {
        if (initiallyVisible) {
            setVisible(true);
        }
    }, [initiallyVisible]);
    const { current: position } = React.useRef(new Animated.Value(visible ? 1 : 0));
    const [layout, setLayout] = React.useState({
        height: 0,
        measured: false,
    });
    React.useEffect(() => {
        if (visible) {
            // show
            Animated.timing(position, {
                duration: 250,
                toValue: 1,
                useNativeDriver: false,
            }).start();
        }
        else {
            // hide
            Animated.timing(position, {
                duration: 200,
                toValue: 0,
                useNativeDriver: false,
            }).start();
        }
    }, [visible, position]);
    const handleLayout = ({ nativeEvent }) => {
        const { height } = nativeEvent.layout;
        setLayout({ height, measured: true });
    };
    // The banner animation has 2 parts:
    // 1. Blank spacer element which animates its height to move the content
    // 2. Actual banner which animates its translateY
    // In initial render, we position everything normally and measure the height of the banner
    // Once we have the height, we apply the height to the spacer and switch the banner to position: absolute
    // We need this because we need to move the content below as if banner's height was being animated
    // However we can't animated banner's height directly as it'll also resize the content inside
    const height = Animated.multiply(position, layout.height);
    const translateY = Animated.multiply(Animated.add(position, -1), layout.height);
    return (React.createElement(Surface, { ...rest, style: [styles.container, shadow(ELEVATION), style] },
        React.createElement(View, { style: [styles.wrapper, contentStyle] },
            React.createElement(Animated.View, { style: { height } }),
            React.createElement(Animated.View, { onLayout: handleLayout, style: [
                    layout.measured || !visible
                        ? // If we have measured banner's height or it's invisible,
                            // Position it absolutely, the layout will be taken care of the spacer
                            [styles.absolute, { transform: [{ translateY }] }]
                        : // Otherwise position it normally
                            null,
                    !layout.measured && !visible
                        ? // If we haven't measured banner's height yet and it's invisible,
                            // hide it with opacity: 0 so user doesn't see it
                            { opacity: 0 }
                        : null,
                ] },
                React.createElement(View, { style: [styles.content, { marginBottom: dismissable ? 0 : 16 }] },
                    icon ? (React.createElement(View, { style: styles.icon },
                        React.createElement(Icon, { name: icon, size: 40 }))) : null,
                    React.createElement(Text, { style: [styles.message, { color: theme.colors.text }], accessibilityLiveRegion: visible ? "polite" : "none", accessibilityRole: "alert" }, content)),
                dismissable ? (React.createElement(View, { style: styles.actions },
                    React.createElement(Button, { color: buttonColor || theme.colors.primary, title: "Close", onPress: () => setVisible(false) }))) : null))));
};
const styles = StyleSheet.create({
    container: {
        elevation: ELEVATION,
    },
    wrapper: {
        overflow: "hidden",
        alignSelf: "center",
        width: "100%",
        maxWidth: DEFAULT_MAX_WIDTH,
    },
    absolute: {
        position: "absolute",
        top: 0,
        width: "100%",
    },
    content: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginHorizontal: 8,
        marginTop: 16,
        marginBottom: 0,
    },
    icon: {
        margin: 8,
    },
    message: {
        flex: 1,
        margin: 8,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        margin: 8,
    },
});
export default withTheme(Banner);
