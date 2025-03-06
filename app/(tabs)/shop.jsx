import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
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
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider, useTheme } from "../../hooks/useTheme";
import { TopNav } from "../../components/TopNav";
import { lightTheme, darkTheme } from "../../constants/Themes";
const earring = require("@/assets/images/products/heros/earhero.jpg");
const ring = require("@/assets/images/products/heros/ringhero.jpg");
const bracelet = require("@/assets/images/products/heros/bracehero.jpg");
const necklace = require("@/assets/images/products/heros/neckhero.jpg");
const { width } = Dimensions.get("window");

SplashScreen.preventAutoHideAsync();

const ShopScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        ArchitectsDaughter: require("../../assets/fonts/ArchitectsDaughter-Regular.ttf"),
        Alegreya: require("../../assets/fonts/Alegreya-VariableFont_wght.ttf"),
        Montserrat: require("../../assets/fonts/Montserrat-VariableFont_wght.ttf"),
      });
      setFontsLoaded(true);
      SplashScreen.hideAsync();
    }

    loadFonts();
  }, []);

  // if (!fontsLoaded) {
  //   return null; // Prevent UI from showing until fonts load
  // }

  const [searchVisible, setSearchVisible] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(null); // For Quick View modal
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null); // Reference for ScrollView
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
      marginHorizontal: 8,
      borderRadius: 8,
      overflow: "hidden",
    },
    featuredImage: {
      width: "100%",
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
  });

  // Dummy data
  const featuredCollections = [
    {
      id: "1",
      title: "Luxury Gold",
      description: "Elegance redefined",
      image: "https://picsum.photos/400/600?random=1",
    },
    {
      id: "2",
      title: "Minimalist Silver",
      description: "Simplicity at its best",
      image: "https://picsum.photos/400/600?random=2",
    },
    {
      id: "3",
      title: "Elegant Platinum",
      description: "Timeless beauty",
      image: "https://picsum.photos/400/600?random=3",
    },
  ];

  const bestSellers = [
    {
      id: "1",
      name: "Gold Ring",
      price: "$199",
      rating: 4.5,
      image: "https://picsum.photos/200/300?random=4",
    },
    {
      id: "2",
      name: "Silver Necklace",
      price: "$299",
      rating: 4.7,
      image: "https://picsum.photos/200/300?random=5",
    },
    {
      id: "3",
      name: "Diamond Earrings",
      price: "$499",
      rating: 4.9,
      image: "https://picsum.photos/200/300?random=6",
    },
    {
      id: "4",
      name: "Ruby Earrings",
      price: "$399",
      rating: 4.8,
      image: "https://picsum.photos/200/300?random=16",
    },
    {
      id: "5",
      name: "Sapphire Earrings",
      price: "$249",
      rating: 4.6,
      image: "https://picsum.photos/200/300?random=11",
    },
    {
      id: "6",
      name: "Amethyst Earrings",
      price: "$399",
      rating: 4.5,
      image: "https://picsum.photos/200/300?random=17",
    },
    {
      id: "7",
      name: "Sapphire Necklace",
      price: "$299",
      rating: 4.6,
      image: "https://picsum.photos/200/300?random=18",
    },
  ];

  const newArrivals = [
    {
      id: "1",
      name: "Rose Gold Bracelet",
      price: "$149",
      isNew: true,
      image: "https://picsum.photos/200/300?random=7",
    },
    {
      id: "2",
      name: "Pearl Necklace",
      price: "$249",
      isNew: true,
      image: "https://picsum.photos/200/300?random=8",
    },
    {
      id: "3",
      name: "Platinum Ring",
      price: "$349",
      image: "https://picsum.photos/200/300?random=9",
    },
    {
      id: "4",
      name: "Gold Chain",
      price: "$199",
      image: "https://picsum.photos/200/300?random=10",
    },
  ];

  const categories = [
    {
      id: "1",
      name: "Necklaces",
      image: necklace,
    },
    {
      id: "2",
      name: "Rings",
      image: ring,
    },
    {
      id: "3",
      name: "Earrings",
      image: earring,
    },
    {
      id: "4",
      name: "Bracelets",
      image: bracelet,
    },
  ];

  // Toggle wishlist
  const toggleWishlist = (itemId) => {
    setWishlist((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Add to cart
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

  // Scroll to top
  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  // Open Quick View modal
  const openQuickView = (item) => {
    setQuickViewItem(item);
  };

  // Close Quick View modal
  const closeQuickView = () => {
    setQuickViewItem(null);
  };

  // Render featured collections
  const renderFeaturedCollection = ({ item, index }) => {
    const parallax = scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, -50],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[styles.featuredCard, { transform: [{ translateY: parallax }] }]}
      >
        <Image
          style={styles.featuredImage}
          source={{ uri: item.image }}
          contentFit="cover"
          transition={200}
          placeholder="https://picsum.photos/200/300?blur=2" // Low-res placeholder
        />
        <View style={styles.featuredTextContainer}>
          <Text style={styles.featuredTitle}>{item.title}</Text>
          <Text style={styles.featuredDescription}>{item.description}</Text>
        </View>
      </Animated.View>
    );
  };

  // Render best sellers
  const renderBestSeller = ({ item }) => (
    <View style={styles.bestSellerCard}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.bestSellerImage}
          source={{ uri: item.image }}
          contentFit="cover"
          transition={200}
          placeholder="https://picsum.photos/200/300?blur=2" // Low-res placeholder
        />
        {/* <TouchableOpacity
          style={styles.quickViewButton}
          onPress={() => openQuickView(item)}
        >
          <Text style={styles.quickViewText}>Quick View</Text>
        </TouchableOpacity> */}
      </View>
      <Text style={styles.bestSellerName}>{item.name}</Text>
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
    </View>
  );

  // Render new arrivals
  const renderNewArrival = ({ item }) => (
    <View style={styles.newArrivalCard}>
      {item.isNew && <Text style={styles.newBadge}>New</Text>}
      <View style={styles.imgContainer}>
        <Image
          style={styles.newArrivalImage}
          source={{ uri: item.image }}
          contentFit="cover"
          transition={200}
          placeholder="https://picsum.photos/200/300?blur=2" // Low-res placeholder
        />
        {/* <TouchableOpacity
          style={styles.quickViewButton}
          onPress={() => openQuickView(item)}
        >
          <Text style={styles.quickViewText}>Quick View</Text>
        </TouchableOpacity> */}
      </View>
      <Text style={styles.newArrivalName}>{item.name}</Text>
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
          color={wishlist.includes(item.id) ? "red" : isDarkMode ? lightTheme.text : darkTheme.text}
        />
      </TouchableOpacity>
    </View>
  );
  // Render categories
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      // onPress={() => navigation.navigate("category", { categoryId: item.id })}
    >
      <Image
        style={styles.categoryImage}
        source={item.image}
        contentFit="cover"
        transition={200}
        placeholder="https://picsum.photos/600/700?blur=2" // Low-res placeholder
      />
      <View style={styles.categoryTextContainer}>
        <Text style={styles.categoryTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <TopNav
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
        cart={cart}
      />

      {/* Main Content */}
      <ScrollView
        ref={scrollViewRef} // Attach the ref to ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
        )}
        scrollEventThrottle={16}
      >
        {/* Featured Collections */}
        <Text style={styles.sectionTitle}>Featured Collections</Text>
        <FlatList
          data={featuredCollections}
          renderItem={renderFeaturedCollection}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.sectionDivider} />

        {/* Best Sellers */}
        <Text style={styles.sectionTitle}>Best Sellers</Text>
        <FlatList
          data={bestSellers}
          renderItem={renderBestSeller}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.sectionDivider} />

        {/* New Arrivals */}
        <Text style={styles.sectionTitle}>New Arrivals</Text>
        <FlatList
          data={newArrivals}
          renderItem={renderNewArrival}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.sectionDivider} />

        {/* Shop By Category */}
        <Text style={styles.sectionTitle}>Shop By Category</Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={2}
          style={styles.categoryContainer}
        />
      </ScrollView>

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
