import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors, IconButton } from "react-native-paper";

function Categorie({ item, toggle, userCategories }) {
  const isCategorySelected = () => {
    if (userCategories.findIndex((cat) => cat.id == item.id) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Pressable
      onPress={() => toggle(item)}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
        styles.container,
      ]}
    >
      <ImageBackground
        source={{ uri: item.image }}
        resizeMode="cover"
        style={styles.image}
        imageStyle={{ borderRadius: 15 }}
      >
        {isCategorySelected() && (
          <>
            <View style={styles.name_content} />
            <Text style={styles.text}>
              {isCategorySelected() ? item.name : ""}
            </Text>
            <IconButton
              style={{ margin: 0 }}
              icon="check"
              size={15}
              color="white"
            />
          </>
        )}
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    width: 105,
    backgroundColor: "grey",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: 6,
  },
  text: {
    color: "white",
    fontFamily: "Avenir-Heavy",
    fontSize: 13,
  },
  image: {
    flex: 1,
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  name_content: {
    backgroundColor: "purple",
    opacity: 0.58,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    borderRadius: 15,
  },
});

export default Categorie;
