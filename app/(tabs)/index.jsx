import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ThemedText } from "@/components/ThemedText";

import { fonts } from "@/constants/Fonts";
import logo from "@/assets/images/logo.png";
import bg from "@/assets/images/homebg.jpeg";



SplashScreen.preventAutoHideAsync();

const index = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  if (!fontsLoaded) {
    return null; // Prevent UI from showing until fonts load
  }

  return (
    <ImageBackground source={bg} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <ThemedText style={styles.architectsdaughter}>
        Bright, Bold and Beautiful
      </ThemedText>
      <ThemedText style={styles.alegreya}>
        Treat yourself our sustainable and dainty jewelry. Did we mention you
        can shower & sleep in them?!
      </ThemedText>

      {/* Shop Buttons */}
      <View style={styles.shopButtons}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          {({ pressed }) => (
            <Text
              style={[
                styles.shopButtonText,
                pressed && styles.shopButtonTextPressed,
              ]}
            >
              Shop All
            </Text>
          )}
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          {({ pressed }) => (
            <Text
              style={[
                styles.shopButtonText,
                pressed && styles.shopButtonTextPressed,
              ]}
            >
              New Arrivals
            </Text>
          )}
        </Pressable>
      </View>
    </ImageBackground>
  );
};

// how to import font?

export default index;

const styles = StyleSheet.create({
  architectsdaughter: {
    fontFamily: "ArchitectsDaughter",
  },
  alegreya: {
    fontFamily: "Alegreya",
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    textAlign: "center",
    resizeMode: "cover",
  },
  logoContainer: {
    alignSelf: "center",
    marginBottom: 16,
    width: "100%",
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  shopButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: "5px",
    width: "100%",
    marginTop: 16,
  },
  button: {
    backgroundColor: "transparent",
    padding: 10,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 130,
    borderColor: "white",
    borderWidth: 3,
  },
  buttonPressed: {
    backgroundColor: "white",
    color: "#9c8779",
  },
  shopButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  shopButtonTextPressed: {
    color: "#e2cec0",
  },
});
