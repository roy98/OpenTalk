import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, IconButton } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../Store/action_creators/index";
import { wait } from "../Utils/core";

function Alert(props) {
  /* Global State for login */
  const alertState = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const { clear } = bindActionCreators(actionCreators, dispatch);

  onCloseAlert = () => clear();

  useEffect(() => {
    wait(8000).then(() => {
      clear();
    });
  }, [alertState.error, alertState.success]);

  if (alertState.error) {
    return (
      <View style={styles.container}>
        <IconButton
          style={{ backgroundColor: Colors.red50 }}
          size={30}
          color={Colors.red500}
          icon="alert-octagon"
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            lineBreakMode="tail"
            ellipsizeMode="tail"
            style={{
              padding: 2,
              fontFamily: "Avenir-Heavy",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            {alertState.error}
          </Text>
        </View>
        <IconButton
          onPress={() => onCloseAlert()}
          color={Colors.grey500}
          icon="close"
          style={{ padding: 5 }}
        />
      </View>
    );
  } else if (alertState.success) {
    return (
      <View style={styles.container}>
        <IconButton
          style={{ backgroundColor: Colors.grey50 }}
          size={30}
          color={Colors.green500}
          icon="checkbox-marked"
        />
        <View>
          <Text
            lineBreakMode="tail"
            ellipsizeMode="tail"
            style={{ padding: 2, fontFamily: "Avenir-Heavy", fontSize: 16 }}
          >
            {alertState.success}
          </Text>
        </View>
        <View>
          <IconButton
            onPress={() => onCloseAlert()}
            color={Colors.grey500}
            icon="close"
            style={{ padding: 5 }}
          />
        </View>
      </View>
    );
  } else {
    return null;
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    minHeight: 65,
    maxHeight: 100,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    marginTop: 45,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    zIndex: 9999,
  },
});
export default Alert;
