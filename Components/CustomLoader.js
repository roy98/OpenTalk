import React, { useEffect, useRef, useLayoutEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

function CustomLoader(props) {
  const loader1 = useRef(new Animated.Value(0)).current;
  const loader2 = useRef(new Animated.Value(0)).current;
  const loader3 = useRef(new Animated.Value(0)).current;

  let currentColor = (loader) =>
    loader.interpolate({
      inputRange: [0, 1],
      outputRange: ["white", "purple"],
    });

  let animation = () => {
    Animated.sequence([
      Animated.timing(loader1, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start(() => {
        loader1.setValue(0);
      }),
      Animated.timing(loader2, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start(() => {
        loader2.setValue(0);
      }),
      Animated.timing(loader3, {
        toValue: 1,
        duration: 3500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start(() => {
        loader3.setValue(0);
        animation();
      }),
    ]);
  };

  useLayoutEffect(() => {
    animation();
  }, []);

  return (
    <View style={styles.loader_container}>
      <Animated.View
        style={[styles.loader, { backgroundColor: currentColor(loader1) }]}
      />
      <Animated.View
        style={[styles.loader, { backgroundColor: currentColor(loader2) }]}
      />
      <Animated.View
        style={[styles.loader, { backgroundColor: currentColor(loader3) }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    height: 15,
    width: 15,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderColor: "purple",
    borderWidth: 3,
    borderStyle: "solid",
  },
  loader_container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: 55,
  },
});

export default CustomLoader;
