/* @flow */

import * as React from "react";
import { StyleSheet, View } from "react-native";
import { withTheme } from "../core/theming";
import { FORM_TYPES, COMPONENT_TYPES } from "../core/component-types";
import type { Theme } from "../types";

type Props = {
  style?: any,
  /**
   * @optional
   */
  theme: Theme
};

class Divider extends React.Component<Props> {
  render() {
    const {
      style,
      theme: { colors }
    } = this.props;

    return (
      <View
        style={[{ backgroundColor: colors.divider }, styles.divider, style]}
      />
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth
  }
});

export default withTheme(Divider);

export const SEED_DATA = [
  {
    name: "Divider",
    tag: "Divider",
    category: COMPONENT_TYPES.row,
    description: "A horizontal line used to divide content",
    preview_image_url:
      "https://res.cloudinary.com/altos/image/upload/v1541096673/draftbit/library/jigsaw-1.0/reps/Divider.png",
    supports_list_render: false,
    props: {},
    layout: {
      width: 343,
      height: 1
    }
  }
];