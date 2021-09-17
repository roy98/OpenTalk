import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import friendsList from "../API/FakeFriends";
import Friend from "./Friend";

function FollowFriends({ onNext }) {
  const [friends, setFriends] = useState(friendsList);

  return (
    <View style={styles.form}>
      <View style={styles.title_container}>
        <Text
          style={{
            textAlign: "center",
            padding: 5,
            fontFamily: "Avenir-Heavy",
            fontSize: 22,
            color: "rgba(0,0,0,0.6)",
          }}
        >
          Follow your friends
        </Text>
      </View>
      <View style={styles.friends_container}>
        <FlatList
          data={friends}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Friend friend={item} />}
          initialNumToRender={6}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />

        <View
          style={[
            styles.btn_container,
            {
              marginBottom: 0,
              justifyContent: "center",
              paddingBottom: 10,
            },
          ]}
        >
          <TouchableOpacity
            onPress={onNext}
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
              Next step
            </Text>
            <IconButton
              style={{ margin: 0 }}
              color="rgba(255,255,255,0.8)"
              size={15}
              icon="chevron-right"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-evenly",
    paddingRight: 0,
    paddingLeft: 0,
  },
  btn: {
    width: 325,
    padding: 12,
    borderRadius: 25,
    backgroundColor: "purple",
  },
  title_container: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  friends_container: {
    flex: 3,
    padding: 0,
    paddingTop: 0,
    alignItems: "center",
  },
  btn_container: {
    justifyContent: "center",
    marginBottom: 0,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
  btn_text: {
    fontFamily: "Avenir-Heavy",
    color: "#FFF",
  },
});
export default FollowFriends;
