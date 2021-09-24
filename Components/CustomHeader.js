import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  HeaderLeftBack,
  HeaderLeftDrawer,
  HeaderRightAvatar,
} from "../Components/HeaderItems";
import { Avatar } from "react-native-paper";

export function CustomMainHeader({ route }) {
  return (
    <View style={{ height: 90 }}>
      <LinearGradient
        style={[styles.gradient, { justifyContent: "space-between" }]}
        start={[0, 1]}
        end={[1, 0]}
        colors={["indigo", "purple"]}
      >
        <HeaderLeftDrawer />
        <Text style={styles.title}>{route.name}</Text>
        <HeaderRightAvatar />
      </LinearGradient>
    </View>
  );
}

export function CustomBackHeader({ route }) {
  return (
    <View style={{ height: 90 }}>
      <LinearGradient
        style={[styles.gradient, {}]}
        start={[0, 1]}
        end={[1, 0]}
        colors={["indigo", "purple"]}
      >
        <HeaderLeftBack />
        <Text style={styles.title}>{route.name}</Text>
      </LinearGradient>
    </View>
  );
}

export function CustomSearchHeader({ route }) {
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState("");

  const handleCancel = () => {
    setFocus(!focus);
    setText("");
    Keyboard.dismiss();
  };

  return (
    <View style={{ height: 90 }}>
      <LinearGradient
        style={[styles.gradient, { justifyContent: "space-between" }]}
        start={[0, 1]}
        end={[1, 0]}
        colors={["indigo", "purple"]}
      >
        {!focus && <HeaderLeftDrawer />}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 20,
            backgroundColor: "#fff",
            marginHorizontal: focus ? 10 : 6,
            padding: 5,
          }}
        >
          <TextInput
            onFocus={() => setFocus(!focus)}
            onSubmitEditing={() => setFocus(!focus)}
            placeholder="Search"
            returnKeyType="search"
            style={[styles.search_input]}
            defaultValue={text}
            onChangeText={setText}
          />
          <Avatar.Icon
            icon="magnify"
            color="black"
            style={{ backgroundColor: "#fff" }}
            size={30}
          />
        </View>
        {!focus ? (
          <HeaderRightAvatar />
        ) : (
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => handleCancel()}
          >
            <Text style={{ fontFamily: "Avenir", fontSize: 16, color: "#fff" }}>
              Cancel
            </Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
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
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.select({
      ios: 20,
      android: 10,
    }),
  },
  title: {
    fontFamily: "Avenir-Heavy",
    color: "#fff",
    fontSize: 17,
  },
  search_input: {
    padding: 6,
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: 20,
  },
});
