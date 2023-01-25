import React from "react";
import { View } from "react-native";
import SwiperComponent from "react-native-web-swiper";
const Swiper = ({ vertical = false, loop = false, timeout = 0, from = 0, prevTitle = "", nextTitle = "", prevTitleColor, nextTitleColor, dotsTouchable = true, dotColor, dotActiveColor, data, keyExtractor, renderItem, children, onIndexChanged, style, }) => (React.createElement(View, { style: style },
    React.createElement(SwiperComponent, { from: from, loop: loop, timeout: timeout, vertical: vertical, onIndexChanged: onIndexChanged, controlsProps: {
            prevTitle,
            nextTitle,
            prevTitleStyle: { color: prevTitleColor },
            nextTitleStyle: { color: nextTitleColor },
            dotsTouchable,
            ...(dotColor
                ? { dotProps: { badgeStyle: { backgroundColor: dotColor } } }
                : {}),
            ...(dotActiveColor
                ? { dotActiveStyle: { backgroundColor: dotActiveColor } }
                : {}),
        } }, data && renderItem
        ? data.map((item, index) => {
            const component = renderItem({ item, index });
            if (!component) {
                return null;
            }
            const key = keyExtractor ? keyExtractor(item, index) : index;
            return React.cloneElement(component, {
                key,
            });
        })
        : children)));
export default Swiper;
