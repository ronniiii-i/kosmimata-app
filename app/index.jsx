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
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

import { fonts } from "@/constants/Fonts";
import logo from "@/assets/images/logo.png";
import bg from "@/assets/images/homebg.jpeg";

SplashScreen.preventAutoHideAsync();

const index = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        ArchitectsDaughter: require("../assets/fonts/ArchitectsDaughter-Regular.ttf"),
        Alegreya: require("../assets/fonts/Alegreya-VariableFont_wght.ttf"),
        Montserrat: require("../assets/fonts/Montserrat-VariableFont_wght.ttf"),
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
      <View
        style={[
          {
            backgroundColor: "rgba(0, 0, 0, 0.23)",
            padding: 20,
          },
          styles.container,
        ]}
      >
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <ThemedText style={[styles.architectsdaughter, styles.title]}>
          Bright, Bold and Beautiful
        </ThemedText>
        <ThemedText style={[styles.alegreya, styles.subTitle]}>
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
            onPress={() => router.push("/shop-copy")}
          >
            {({ pressed }) => (
              <Text
                style={[
                  styles.shopButtonText,
                  pressed && styles.shopButtonTextPressed,
                  styles.architectsdaughter,
                ]}
              >
                Shop Now
              </Text>
            )}
          </Pressable>
        </View>
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
  title: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: 500,
    textAlign: "center",
    height: 60,
    backgroundColor: "whitesmoke",
    paddingTop: 18,
  },
  subTitle: {
    fontSize: 20,
    marginTop: 8,
    textAlign: "center",
  },
  shopButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: "4%",
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
    fontSize: 16,
    textAlign: "center",
  },
  shopButtonTextPressed: {
    color: "#e2cec0",
  },
});
