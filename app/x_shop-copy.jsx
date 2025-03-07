import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
  Modal,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider, useTheme } from "../hooks/useTheme";
import { TopNav } from "../components/TopNav";
import { lightTheme, darkTheme } from "../constants/Themes";

const earring = require("@/assets/images/products/heros/earhero.jpg");
const ring = require("@/assets/images/products/heros/ringhero.jpg");
const bracelet = require("@/assets/images/products/heros/bracehero.jpg");
const necklace = require("@/assets/images/products/heros/neckhero.jpg");
const { width } = Dimensions.get("window");

SplashScreen.preventAutoHideAsync();

const ShopScreen = () => {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    ArchitectsDaughter: require("../assets/fonts/ArchitectsDaughter-Regular.ttf"),
    Alegreya: require("../assets/fonts/Alegreya-VariableFont_wght.ttf"),
    Montserrat: require("../assets/fonts/Montserrat-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading Fonts...</Text>;
  }

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const [searchVisible, setSearchVisible] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const styles = StyleSheet.create({
    architectsdaughter: {
      fontFamily: "ArchitectsDaughter",
    },
    alegreya: {
      fontFamily: "Alegreya",
    },
    montserrat: {
      fontFamily: "Montserrat",
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 16,
      paddingBottom: 40,
    },
    imgContainer: {
      position: "relative",
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 16,
      marginHorizontal: 8,
      color: theme.text,
      fontFamily: "Montserrat",
    },
    sectionDivider: {
      height: 1,
      backgroundColor: theme.border,
      marginVertical: 16,
    },
    featuredCard: {
      width: width * 0.8,
      marginRight: 8,
      borderRadius: 8,
      overflow: "hidden",
    },
    featuredImage: {
      width: "110%",
      height: 200,
    },
    featuredTextContainer: {
      position: "absolute",
      bottom: 16,
      left: 16,
    },
    featuredTitle: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: "Montserrat",
    },
    featuredDescription: {
      color: "#fff",
      fontSize: 14,
      fontFamily: "Alegreya",
    },
    bestSellerCard: {
      width: width / 2 - 20,
      // maxWidth: 200,
      marginRight: 16,
      marginBottom: 16,
    },
    bestSellerImage: {
      width: "100%",
      height: 150,
      // resizeMode: "cover",
      borderRadius: 8,
    },
    bestSellerName: {
      marginTop: 8,
      fontSize: 16,
      color: theme.text,
      fontFamily: "Alegreya",
    },
    bestSellerPrice: {
      fontSize: 14,
      color: theme.text,
      fontFamily: "Alegreya",
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 4,
    },
    ratingText: {
      marginLeft: 4,
      fontSize: 14,
      color: theme.text,
    },
    quickAddButton: {
      marginTop: 8,
      backgroundColor: theme.primary,
      padding: 8,
      borderRadius: 4,
      alignItems: "center",
    },
    quickAddText: {
      color: isDarkMode ? lightTheme.primary : darkTheme.primary,
      fontSize: 14,
    },
    newArrivalCard: {
      width: width / 2 - 20,
      marginRight: 16,
      marginBottom: 16,
      position: "relative",
    },
    newArrivalImage: {
      width: "100%",
      height: 150,
      borderRadius: 8,
    },
    newArrivalName: {
      marginTop: 8,
      fontSize: 16,
      color: theme.text,
      fontFamily: "Alegreya",
    },
    newArrivalPrice: {
      fontSize: 14,
      color: theme.text,
      fontFamily: "Alegreya",
    },
    newBadge: {
      position: "absolute",
      top: 8,
      right: 8,
      backgroundColor: "red",
      color: "#fff",
      padding: 4,
      borderRadius: 4,
      fontSize: 12,
      zIndex: 5,
    },
    categoryContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      width: "100%",
    },
    categoryCard: {
      width: width / 2.1 - 20,
      marginHorizontal: 8,
      marginBottom: 16,
      position: "relative",
      borderRadius: 8,
      overflow: "hidden",
    },
    categoryImage: {
      width: "100%",
      height: width / 2.1 - 20,
    },
    categoryTextContainer: {
      position: "absolute",
      bottom: 16,
      left: 16,
    },
    categoryTitle: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: "Montserrat",
    },
    wishlistButton: {
      position: "absolute",
      top: 8,
      left: 8,
    },
    backToTopButton: {
      position: "absolute",
      bottom: 60,
      right: 16,
      backgroundColor: theme.primary,
      borderRadius: 25,
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    quickViewButton: {
      position: "absolute",
      bottom: 8,
      right: 8,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      padding: 8,
      borderRadius: 4,
    },
    quickViewText: {
      color: "#fff",
      fontSize: 12,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: width * 0.9,
      backgroundColor: theme.background,
      borderRadius: 8,
      padding: 16,
    },
    modalImage: {
      width: "100%",
      height: 200,
      borderRadius: 8,
    },
    modalCloseButton: {
      position: "absolute",
      top: 16,
      right: 16,
    },
    last: {
      marginRight: 0,
    },
  });

  // Dummy data
  const featuredCollections = [
    {
      id: 1,
      title: "Luxury Gold",
      description: "Elegance redefined",
      image: bracelet,
    },
    {
      id: 2,
      title: "Minimalist Silver",
      description: "Simplicity at its best",
      image: earring,
    },
    {
      id: 3,
      title: "Elegant Platinum",
      description: "Timeless beauty",
      image: ring,
      class: "last",
    },
  ];

  const bestSellers = [
    {
      id: 4,
      title: "Gold Ring",
      price: "$199",
      rating: 4.5,
      image: ring,
    },
    {
      id: 5,
      title: "Silver Necklace",
      price: "$299",
      rating: 4.7,
      image: necklace,
    },
    {
      id: 6,
      title: "Diamond Earrings",
      price: "$499",
      rating: 4.9,
      image: earring,
    },
    {
      id: 7,
      title: "Ruby Earrings",
      price: "$399",
      rating: 4.8,
      image: earring,
    },
    {
      id: 8,
      title: "Sapphire Earrings",
      price: "$249",
      rating: 4.6,
      image: earring,
    },
    {
      id: 9,
      title: "Amethyst Earrings",
      price: "$399",
      rating: 4.5,
      image: earring,
    },
    {
      id: 10,
      title: "Sapphire Necklace",
      price: "$299",
      rating: 4.6,
      image: necklace,
    },
  ];

  const newArrivals = [
    {
      id: 11,
      title: "Rose Gold Bracelet",
      price: "$149",
      isNew: true,
      image: bracelet,
    },
    {
      id: 12,
      title: "Pearl Necklace",
      price: "$249",
      isNew: true,
      image: necklace,
    },
    {
      id: 13,
      title: "Platinum Ring",
      price: "$349",
      image: ring,
    },
    {
      id: 14,
      title: "Gold Chain",
      price: "$199",
      image: necklace,
    },
  ];

  const categories = [
    {
      id: 15,
      image: necklace,
      title: "Necklaces",
    },
    {
      id: 16,
      image: ring,
      title: "Rings",
    },
    {
      id: 17,
      image: earring,
      title: "Earrings",
    },
    {
      id: 18,
      image: bracelet,
      title: "Bracelets",
    },
  ];

  const toggleWishlist = (itemId) => {
    setWishlist((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const openQuickView = (item) => {
    setQuickViewItem(item);
  };

  const closeQuickView = () => {
    setQuickViewItem(null);
  };

  const renderFeaturedCollection = ({ item }) => {
    const parallax = scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, -50],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.featuredCard,
          { transform: [{ translateY: parallax }] },
          item.style ? item.style : "",
        ]}
      >
        <TouchableOpacity
          style={styles.featuredCard}
          onPress={() =>
            router.navigate("ProductDetails", { productId: item.id })
          }
        >
          <Image
            style={styles.featuredImage}
            source={item.image}
            contentFit="cover"
            transition={200}
            placeholder="https://picsum.photos/200/300?blur=2" // Low-res placeholder
          />
          <View style={styles.featuredTextContainer}>
            <Text style={styles.featuredTitle}>{item.title}</Text>
            <Text style={styles.featuredDescription}>{item.description}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Render best sellers
  const renderBestSeller = ({ item }) => (
    <TouchableOpacity
      style={styles.bestSellerCard}
      onPress={() => router.navigate("ProductDetails", { productId: item.id })}
    >
      <View style={styles.imgContainer}>
        <Image
          style={styles.bestSellerImage}
          source={item.image}
          contentFit="cover"
          transition={200}
          placeholder={`https://picsum.photos/200/300?random=${
            item.id + 1
          }&blur=2`} // Low-res placeholder
        />
        {/* <TouchableOpacity
                style={styles.quickViewButton}
                onPress={() => openQuickView(item)}
              >
                <Text style={styles.quickViewText}>Quick View</Text>
              </TouchableOpacity> */}
      </View>
      <Text style={styles.bestSellerName}>{item.title}</Text>
      <Text style={styles.bestSellerPrice}>{item.price}</Text>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color="#FFD700" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <TouchableOpacity
        style={styles.quickAddButton}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.quickAddText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderNewArrival = ({ item }) => (
    <TouchableOpacity
      style={styles.newArrivalCard}
      onPress={() => router.navigate("ProductDetails", { productId: item.id })}
    >
      <View style={styles.imgContainer}>
        <Image
          style={styles.newArrivalImage}
          source={item.image}
          contentFit="cover"
          transition={200}
          placeholder={`https://picsum.photos/200/300?random=${
            item.id + 1
          }&blur=2`} // Low-res placeholder
        />
        {/* <TouchableOpacity
                style={styles.quickViewButton}
                onPress={() => openQuickView(item)}
              >
                <Text style={styles.quickViewText}>Quick View</Text>
              </TouchableOpacity> */}
      </View>
      <Text style={styles.newArrivalName}>{item.title}</Text>
      <Text style={styles.newArrivalPrice}>{item.price}</Text>
      <TouchableOpacity
        style={styles.wishlistButton}
        onPress={() => {
          toggleWishlist(item.id);
          alert(
            wishlist.includes(item.id)
              ? "Item removed from Wishlist"
              : "Item added to Wishlist",
            ""
          );
        }}
      >
        <Ionicons
          name={wishlist.includes(item.id) ? "heart" : "heart-outline"}
          size={24}
          color={
            wishlist.includes(item.id)
              ? "red"
              : isDarkMode
              ? lightTheme.text
              : darkTheme.text
          }
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() =>
        router.navigate("CategoryProducts", { categoryId: item.id })
      }
    >
      <Image
        source={item.image}
        style={styles.categoryImage}
        contentFit="cover"
        transition={200}
        placeholder={`https://picsum.photos/200/300?random=${
          item.id + 1
        }&blur=2`} // Low-res placeholder
      />
      <View style={styles.categoryTextContainer}>
        <Text style={styles.categoryTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const sections = [
    {
      title: "Featured Collections",
      data: featuredCollections,
      renderItem: renderFeaturedCollection,
      horizontal: true,
    },
    {
      title: "Best Sellers",
      data: bestSellers,
      renderItem: renderBestSeller,
      horizontal: true,
    },
    {
      title: "New Arrivals",
      data: newArrivals,
      renderItem: renderNewArrival,
      horizontal: true,
    },
    {
      title: "Shop By Category",
      data: categories,
      renderItem: renderCategory,
      numColumns: 2,
    },
  ];

  return (
    <View style={styles.container}>
      <TopNav
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
        cart={cart}
      />
      <FlatList
        ref={scrollViewRef}
        data={sections}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <FlatList
              data={item.data}
              renderItem={item.renderItem}
              keyExtractor={(subItem) => subItem.id}
              horizontal={item.horizontal}
              numColumns={item.numColumns}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
              }}
            />
            <View style={styles.sectionDivider} />
          </>
        )}
        // contentContainerStyle={{ flexGrow: 1 }}
      />

      {/* Back to Top Button */}
      <TouchableOpacity style={styles.backToTopButton} onPress={scrollToTop}>
        <Ionicons
          name="arrow-up"
          size={24}
          color={isDarkMode ? "black" : "white"}
        />
      </TouchableOpacity>

      {/* Quick View Modal */}
      <Modal
        visible={!!quickViewItem}
        transparent
        animationType="fade"
        onRequestClose={closeQuickView}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              style={styles.modalImage}
              source={{ uri: quickViewItem?.image }}
              contentFit="cover"
              transition={200}
            />
            <Text style={styles.bestSellerName}>{quickViewItem?.name}</Text>
            <Text style={styles.bestSellerPrice}>{quickViewItem?.price}</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={closeQuickView}
            >
              <Ionicons
                name="close"
                size={24}
                color={isDarkMode ? lightTheme.text : darkTheme.text}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ShopScreen />
    </ThemeProvider>
  );
}
