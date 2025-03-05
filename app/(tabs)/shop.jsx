import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const products = [
  {
    id: "1",
    name: "Gold Necklace",
    price: "₦15,000",
    image: require("@/assets/images/necklace.jpg"),
  },
  {
    id: "2",
    name: "Silver Ring",
    price: "₦7,500",
    image: require("@/assets/images/ring.jpg"),
  },
  {
    id: "3",
    name: "Bracelet",
    price: "₦10,000",
    image: require("@/assets/images/bracelet.jpg"),
  },
  {
    id: "4",
    name: "Earrings",
    price: "₦5,000",
    image: require("@/assets/images/earrings.jpg"),
  },
];

export default function ShopScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Shop</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#999"
        />
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.productCard}
            onPress={() => alert(`Clicked on ${item.name}`)}
          >
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </Pressable>
        )}
      />

      {/* Floating Cart Button */}
      <Pressable
        style={styles.cartButton}
        onPress={() => navigation.navigate("cart")}
      >
        <MaterialCommunityIcons name="cart" size={28} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e2cec0", padding: 10 },
  header: { flexDirection: "column", paddingBottom: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  productCard: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: { fontSize: 16, fontWeight: "500" },
  productPrice: { fontSize: 14, color: "#888" },
  cartButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#9c8779",
    padding: 15,
    borderRadius: 30,
    elevation: 5,
  },
});
