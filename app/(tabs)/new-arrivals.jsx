import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "expo-router";

const newArrivals = [
  {
    id: "1",
    name: "Gold Necklace",
    price: "$49.99",
    image: require("@/assets/images/gold-necklace.jpg"),
  },
  {
    id: "2",
    name: "Silver Ring",
    price: "$29.99",
    image: require("@/assets/images/silver-ring.jpg"),
  },
  {
    id: "3",
    name: "Diamond Earrings",
    price: "$79.99",
    image: require("@/assets/images/diamond-earrings.jpg"),
  },
  {
    id: "4",
    name: "Pearl Bracelet",
    price: "$39.99",
    image: require("@/assets/images/pearl-bracelet.jpg"),
  },
];

export default function NewArrivals() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>New Arrivals</Text>
      <FlatList
        data={newArrivals}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.push("/product", { id: item.id })}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#e2cec0",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  name: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  price: {
    color: "#888",
    marginTop: 4,
  },
});
