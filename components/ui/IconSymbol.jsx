// This file is a fallback for using MaterialCommunityIcons on Android and web.

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { ViewStyle } from "react-native";

// Add your custom icon mappings here.
const MAPPING = {
  "shopping-outline": "shopping-outline",
  "shopping": "shopping",
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
};

/**
 * An icon component that uses MaterialCommunityIcons.
 *
 * Icon `name`s require manual mapping to MaterialCommunityIcons.
 */
export function IconSymbol({ name, size = 24, color, style }) {
  return (
    <MaterialCommunityIcons
      color={color}
      size={size}
      name={MAPPING[name] || "help-circle"} // Fallback to a help icon if name isn't mapped
      style={style}
    />
  );
}
