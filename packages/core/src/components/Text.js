import * as React from "react";
import { Text as NativeText, I18nManager } from "react-native";
import { withTheme } from "../theming";
class Text extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            nativeProps: {},
        };
    }
    setNativeProps(args) {
        this.state.nativeProps = args || {};
    }
    render() {
        const { style, ...rest } = this.props;
        const writingDirection = I18nManager.isRTL ? "rtl" : "ltr";
        return (React.createElement(NativeText, { ...rest, ...this.state.nativeProps, ref: (c) => {
                this._root = c;
            }, style: [
                {
                    textAlign: "left",
                    writingDirection,
                },
                style,
            ] }));
    }
}
export const BaseLink = ({ style, theme, title, ...props }) => {
    return (React.createElement(Text, { hitSlop: 8, style: [{ color: theme.colors.primary }, style], theme: theme, ...props }, title));
};
const Link = withTheme(BaseLink);
export { Link };
export default withTheme(Text);
