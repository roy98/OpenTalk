import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "react-native-paper";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../Store/action_creators/index";
import { Auth } from "aws-amplify";

function ProfileScreen({ navigation, route }) {
  /* Global State for login */
  const dispatch = useDispatch();
  const { signOut } = bindActionCreators(actionCreators, dispatch);

  const handleSignOut = () => {
    displayLoader();
    Auth.signOut()
      .then((res) => {
        hideLoader();
        signOut();
      })
      .catch((err) => {
        console.log(err);
        hideLoader();
      });
  };

  /* Activity indicator */
  const [showLoader, setShowLoader] = useState(false);
  const displayLoader = () => setShowLoader(true);
  const hideLoader = () => setShowLoader(false);

  return (
    <>
      {showLoader ? (
        <View style={styles.loader}>
          <ActivityIndicator color="purple" size="large" />
        </View>
      ) : null}
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
});

export default ProfileScreen;
