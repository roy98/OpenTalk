import React, { useCallback, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import FollowFriends from "../Components/FollowFriends";
import Friend from "../Components/Friend";
import friendsList from "../API/FakeFriends";
import { wait } from "../Utils/core";

function SearchScreen(props) {
  const [friends, setFriends] = useState(friendsList);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.friends_container}>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Friend friend={item} />}
        initialNumToRender={6}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyboardShouldPersistTaps="always"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  friends_container: {
    flex: 1,
    padding: 0,
    paddingTop: 0,
    alignItems: "center",
  },
});

export default SearchScreen;
