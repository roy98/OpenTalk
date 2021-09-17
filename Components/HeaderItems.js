import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { TouchableHighlight } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
//import { useNavigation } from "@react-navigation/core";
import { Avatar, IconButton } from "react-native-paper";
//import { DrawerActions } from "@react-navigation/native";
import Friends from "../API/FakeFriends";

export function HeaderLeftDrawer() {
  // Will use to toggle the Navigation Drawer;
  const navigation = useNavigation();
  return (
    <TouchableHighlight>
      <IconButton icon="menu" color="#fff" />
    </TouchableHighlight>
  );
}

export function HeaderLeftBack() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <IconButton icon="arrow-left" color="#fff" />
    </TouchableOpacity>
  );
}

export function HeaderRightAvatar() {
  const navigation = useNavigation();
  const [user, setUser] = useState(Friends[Math.floor(Math.random() * 8)]);

  return (
    <TouchableOpacity
      style={{ backgroundColor: "transparent" }}
      onPress={() => navigation.navigate("Profile")}
    >
      <Avatar.Image
        key={user.id}
        source={{ uri: user.avatar }}
        size={40}
        style={{
          margin: 10,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: 40,
          height: 40,
        }}
      />
    </TouchableOpacity>
  );
}
