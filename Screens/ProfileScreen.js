import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "react-native-paper";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../Store/action_creators/index";

function ProfileScreen({ navigation, route }) {
  /* Global State for login */
  const dispatch = useDispatch();
  const { signOut } = bindActionCreators(actionCreators, dispatch);

  const handleSignOut = () => signOut();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleSignOut()}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 50,
          backgroundColor: Colors.red700,
          borderRadius: 20,
        }}
      >
        <Text style={{ color: "#fff" }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;
