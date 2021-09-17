import React from "react";
import { StyleSheet, Text, View } from "react-native";

function Notification(props) {
  return (
    <View style={styles.container}>
      <Text>Feature: {props.route.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Notification;
