import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { Avatar, IconButton } from "react-native-paper";
import { DrawerActions } from "@react-navigation/native";
import { useSelector } from "react-redux";

export function HeaderLeftDrawer() {
  // Will use to toggle the Navigation Drawer;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    >
      <IconButton icon="menu" color="#fff" />
    </TouchableOpacity>
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
  const user = useSelector((state) => state.authentication.user);

  function getFriendLabel() {
    return user.name
      .split(" ")
      .map((item) => item[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    <TouchableOpacity
      style={{ backgroundColor: "transparent" }}
      onPress={() => navigation.navigate("Profile")}
    >
      {user.avatar ? (
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
      ) : (
        <Avatar.Text
          label={getFriendLabel()}
          size={40}
          style={{
            margin: 10,
          }}
        />
      )}
    </TouchableOpacity>
  );
}
