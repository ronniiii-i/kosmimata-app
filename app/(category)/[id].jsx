import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useTheme } from "../../hooks/useTheme";
import { TopNav } from "../../components/TopNav";
import { lightTheme, darkTheme } from "../../constants/Themes";

const earring = require("@/assets/images/products/heros/earhero.jpg");
const ring = require("@/assets/images/products/heros/ringhero.jpg");
const bracelet = require("@/assets/images/products/heros/bracehero.jpg");
const necklace = require("@/assets/images/products/heros/neckhero.jpg");

const categories = [
  {
    id: 1,
    name: "Necklaces",
    products: [
      {
        id: 1,
        name: "Gold Necklace",
        price: "$199",
        image: necklace,
      },
      {
        id: 2,
        name: "Silver Necklace",
        price: "$299",
        image: necklace,
      },
      {
        id: 3,
        name: "Diamond Necklace",
        price: "$499",
        image: necklace,
      },
      {
        id: 4,
        name: "Pearl Necklace",
        price: "$149",
        image: necklace,
      },
      {
        id: 5,
        name: "Platinum Necklace",
        price: "$349",
        image: necklace,
      },
      {
        id: 6,
        name: "Ruby Necklace",
        price: "$399",
        image: necklace,
      },
    ],
  },
  {
    id: 2,
    name: "Rings",
    products: [
      {
        id: 7,
        name: "Gold Ring",
        price: "$199",
        image: ring,
      },
      {
        id: 8,
        name: "Silver Ring",
        price: "$99",
        image: ring,
      },
      {
        id: 9,
        name: "Diamond Ring",
        price: "$499",
        image: ring,
      },
      {
        id: 10,
        name: "Pearl Ring",
        price: "$149",
        image: ring,
      },
      {
        id: 11,
        name: "Platinum Ring",
        price: "$349",
        image: ring,
      },
      {
        id: 12,
        name: "Ruby Ring",
        price: "$399",
        image: ring,
      },
    ],
  },
  {
    id: 3,
    name: "Bracelets",
    products: [
      {
        id: 13,
        name: "Gold Bracelet",
        price: "$199",
        image: bracelet,
      },
      {
        id: 14,
        name: "Silver Bracelet",
        price: "$99",
        image: bracelet,
      },
      {
        id: 15,
        name: "Diamond Bracelet",
        price: "$499",
        image: bracelet,
      },
      {
        id: 16,
        name: "Pearl Bracelet",
        price: "$149",
        image: bracelet,
      },
      {
        id: 17,
        name: "Platinum Bracelet",
        price: "$349",
        image: bracelet,
      },
      {
        id: 18,
        name: "Ruby Bracelet",
        price: "$399",
        image: bracelet,
      },
    ],
  },
  {
    id: 4,
    name: "Earrings",
    products: [
      {
        id: 19,
        name: "Gold Earrings",
        price: "$199",
        image: earring,
      },
      {
        id: 20,
        name: "Silver Earrings",
        price: "$99",
        image: earring,
      },
      {
        id: 21,
        name: "Diamond Earrings",
        price: "$499",
        image: earring,
      },
      {
        id: 22,
        name: "Pearl Earrings",
        price: "$149",
        image: earring,
      },
      {
        id: 23,
        name: "Platinum Earrings",
        price: "$349",
        image: earring,
      },
      {
        id: 24,
        name: "Ruby Earrings",
        price: "$399",
        image: earring,
      },
    ],
  },
  // Add more categories as needed
];

export default function CategoryPage() {
  const { id } = useLocalSearchParams();
  const [searchVisible, setSearchVisible] = useState(false);
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [cart, setCart] = useState([]);
  const [fontsLoaded] = useFonts({
    ArchitectsDaughter: require("../../assets/fonts/ArchitectsDaughter-Regular.ttf"),
    Alegreya: require("../../assets/fonts/Alegreya-VariableFont_wght.ttf"),
    Montserrat: require("../../assets/fonts/Montserrat-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading Fonts...</Text>;
  }

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const router = useRouter();
  const category = categories.find((cat) => cat.id === parseInt(id));
  const products = category?.products || [];

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={[styles.productName, { color: theme.text }]}>
        {item.name}
      </Text>
      <Text style={[styles.productPrice, { color: theme.text }]}>
        {item.price}
      </Text>
      <TouchableOpacity
        style={styles.quickAddButton}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.quickAddText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
          <TopNav
            searchVisible={searchVisible}
            setSearchVisible={setSearchVisible}
            cart={cart}
          />
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginHorizontal: 8,
  },
  productPrice: {
    fontSize: 14,
    marginHorizontal: 8,
    marginBottom: 8,
  },
});
