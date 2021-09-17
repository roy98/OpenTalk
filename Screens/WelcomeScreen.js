import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient style={styles.gradient} colors={["indigo", "purple"]} />
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/icon.png")} style={styles.logo} />
          <Text style={styles.app_name}>OpenTalk</Text>
        </View>
        <Text style={styles.tagline}>
          Follow your best friends and exchange great message about your
          activity and experience.
        </Text>
        <View style={styles.btn_container}>
          <TouchableOpacity
            onPress={() => navigation.navigate("login")}
            style={[styles.btn, styles.btn_login]}
          >
            <Text
              style={[
                { textAlign: "center", color: "purple" },
                styles.btn_text,
              ]}
            >
              Log In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("signup")}
            style={[styles.btn, styles.btn_sign]}
          >
            <Text
              style={[{ textAlign: "center", color: "#fff" }, styles.btn_text]}
            >
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.copyright}>Hosted by Kola</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    justifyContent: "flex-end",
  },
  mainContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "60%",
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
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  tagline: {
    textAlign: "center",
    color: "rgba(255,255,255,0.4)",
    fontFamily: "Avenir",
    fontSize: 14,
  },
  copyright: {
    fontFamily: "Avenir-Heavy",
    color: "rgba(255,255,255,0.4)",
  },
  btn_container: {
    height: 130,
    justifyContent: "space-around",
  },
  btn: {
    width: 350,
    padding: 12,
    borderRadius: 25,
  },
  btn_login: {
    backgroundColor: "#fff",
  },
  btn_sign: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  btn_text: {
    fontFamily: "Avenir-Heavy",
  },
});

export default WelcomeScreen;
