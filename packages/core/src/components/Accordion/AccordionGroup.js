import * as React from "react";
import { View, StyleSheet, Pressable, } from "react-native";
import Text from "../Text";
import { withTheme } from "../../theming";
import { extractStyles } from "../../utilities";
const AccordionGroup = ({ label, expanded: expandedProp = false, openColor, closedColor, caretColor: caretColorProp, caretSize = 24, icon, iconSize = 24, style, children, theme, Icon, }) => {
    const [expanded, setExpanded] = React.useState(expandedProp);
    const { textStyles, viewStyles } = extractStyles(style);
    const expandedColor = openColor || theme.colors.primary;
    const collapsedColor = closedColor || theme.colors.primary;
    const labelColor = expanded ? expandedColor : collapsedColor;
    const caretColor = caretColorProp || labelColor;
    const handlePressAction = () => {
        setExpanded(!expanded);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Pressable, { style: [styles.row, viewStyles], onPress: handlePressAction, accessibilityRole: "button" },
            icon ? (React.createElement(Icon, { name: icon, size: iconSize, color: labelColor, style: styles.icon })) : null,
            React.createElement(View, { style: styles.content },
                React.createElement(Text, { selectable: false, style: [
                        textStyles,
                        {
                            color: labelColor,
                        },
                    ] }, label)),
            React.createElement(Icon, { name: expanded
                    ? "MaterialIcons/keyboard-arrow-up"
                    : "MaterialIcons/keyboard-arrow-down", color: caretColor, size: caretSize })),
        expanded ? children : null));
};
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    content: {
        flex: 1,
        justifyContent: "center",
    },
    icon: {
        marginRight: 8,
    },
});
export default withTheme(AccordionGroup);
