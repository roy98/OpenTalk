import React from "react";
import { StyleSheet, Text, View } from "react-native";

function Message(props) {
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

export default Message;
