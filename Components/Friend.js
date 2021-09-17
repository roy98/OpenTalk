import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, IconButton } from "react-native-paper";

function Friend({ friend }) {
  const [hasAvatar, setHasAvatar] = useState(false);

  useEffect(() => {
    if (friend.avatar && friend.avatar !== "") {
      setHasAvatar(true);
    }
  }, []);
  function getFriendLabel() {
    return friend.name
      .split(" ")
      .map((item) => item[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ position: "absolute", alignSelf: "flex-end" }}>
        <IconButton
          style={styles.close}
          size={20}
          icon="close-circle"
          color="red"
        />
      </TouchableOpacity>
      <View
        style={{
          alignItems: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 100,
            margin: 15,
            marginBottom: 10,
          }}
        >
          {hasAvatar ? (
            <Avatar.Image
              source={{ uri: friend.avatar }}
              size={60}
              style={styles.avata_overlay}
            />
          ) : (
            <Avatar.Text label={getFriendLabel()} size={60} />
          )}
        </View>
        <Text style={styles.text}>{friend.name}</Text>
        <Text style={[styles.text, { color: "rgba(0,0,0,0.3)" }]}>
          {friend.alias}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.btn,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 5,
          },
        ]}
      >
        <Text style={[{ textAlign: "center" }, styles.btn_text]}>S'aboner</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0, 0.3)",
    shadowOpacity: 1,
    shadowOffset: { height: 1.7 },
    shadowRadius: 1,
    alignItems: "center",
    justifyContent: "space-around",
    margin: 10,
  },
  close: {
    margin: 0,
  },
  btn: {
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: "purple",
    marginBottom: 10,
  },
  btn_text: {
    fontFamily: "Avenir-Heavy",
    color: "#FFF",
  },
  text: {
    padding: 2,
    fontFamily: "Avenir-Heavy",
  },
  avata_overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
});

export default Friend;
