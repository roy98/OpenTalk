import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Colors, IconButton } from "react-native-paper";

function Friend({ user, followFriend, unfollowFriend, userFriends }) {
  const [hasAvatar, setHasAvatar] = useState(false);

  const isUserSelected = () => {
    if (userFriends.findIndex((f) => f.friendID == user.id) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const getUserToUnfollow = (user) => {
    const friend = userFriends.find((f) => f.friendID == user.id);
    if (friend) {
      unfollowFriend(friend);
    }
  };

  useEffect(() => {
    if (user.avatar && user.avatar !== "") {
      setHasAvatar(true);
    }
  }, []);

  function getFriendLabel() {
    return user.name
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
              source={{ uri: user.avatar }}
              size={60}
              style={styles.avata_overlay}
            />
          ) : (
            <Avatar.Text label={getFriendLabel()} size={60} />
          )}
        </View>
        <Text style={styles.text}>{user.name}</Text>
        <Text style={[styles.text, { color: "rgba(0,0,0,0.3)" }]}>
          {user.alias}
        </Text>
      </View>
      {isUserSelected() ? (
        <TouchableOpacity
          onPress={() => getUserToUnfollow(user)}
          style={[
            styles.btn,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 5,
              backgroundColor: Colors.purple100,
            },
          ]}
        >
          <Text
            style={[
              { textAlign: "center", fontFamily: "Avenir", color: "#fff" },
            ]}
          >
            Déja aboné
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => followFriend(user)}
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
          <Text style={[{ textAlign: "center" }, styles.btn_text]}>
            S'aboner
          </Text>
        </TouchableOpacity>
      )}
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
