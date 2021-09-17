import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text } from "react-native";

function LinearGradient_background() {
  return (
    <LinearGradient
      style={styles.gradient}
      start={[0, 1]}
      end={[1, 0]}
      colors={["indigo", "purple"]}
    />
  );
}

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.5)",
  },
});

export default LinearGradient_background;
