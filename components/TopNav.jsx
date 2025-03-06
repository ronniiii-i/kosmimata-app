// components/TopNav.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";

export const TopNav = ({ searchVisible, setSearchVisible, cart }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View
      style={[
        styles.topNav,
        { backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF" },
      ]}
    >
      {searchVisible ? (
        <View style={styles.searchContainer}>
          <TextInput
            style={[
              styles.searchInput,
              { color: isDarkMode ? "#FFFFFF" : "#000000" },
            ]}
            placeholder="Search..."
            placeholderTextColor={isDarkMode ? "#888" : "#999"}
          />
          <TouchableOpacity onPress={() => setSearchVisible(false)}>
            <Ionicons
              name="close"
              size={24}
              color={isDarkMode ? "#FFFFFF" : "#000000"}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text
            style={[styles.logo, { color: isDarkMode ? "#FFFFFF" : "#000000" }]}
          >
            MyShop
          </Text>
          <View style={styles.icons}>
            <TouchableOpacity onPress={() => setSearchVisible(true)}>
              <Ionicons
                name="search"
                size={24}
                color={isDarkMode ? "#FFFFFF" : "#000000"}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cartIcon}>
              <Ionicons
                name="cart"
                size={24}
                color={isDarkMode ? "#FFFFFF" : "#000000"}
              />
              {cart.length > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cart.length}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleTheme}>
              <Ionicons
                name={isDarkMode ? "moon" : "sunny"}
                size={24}
                color={isDarkMode ? "#FFFFFF" : "#000000"}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  icons: {
    flexDirection: "row",
    gap: 16,
  },
  cartIcon: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
  },
});
