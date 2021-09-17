import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet, View, Text } from "react-native";
import CustomLoader from "../Components/CustomLoader";

function SplashScreen(props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsLoading(true);
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient style={styles.gradient} colors={["indigo", "purple"]} />
      <View style={styles.mainContainer}>
        <Image source={require("../assets/icon.png")} style={styles.logo} />
        <Text style={styles.app_name}>
          OpenTalk <CustomLoader isLoading={isLoading} />
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 50,
    width: 50,
  },
  app_name: {
    color: "#fff",
    margin: 15,
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Avenir-Heavy",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1000,
  },
});

export default SplashScreen;
