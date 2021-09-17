import React, { useCallback, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Post from "../Components/Post";
import PostsList from "../API/FakePosts";
import { IconButton } from "react-native-paper";
import CreatePostModal from "../Components/CreatePostModal";
import { wait } from "../Utils/core";

function HomeScreen({ route }) {
  const [posts, setPosts] = useState(PostsList);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const toggleShowModal = () => setShowModal(!showModal);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
    >
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Post post={item} />}
        initialNumToRender={10}
        showsVerticalScrollIndicator={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ItemSeparatorComponent={(props) => {
          return (
            <View
              style={{
                height: 1,
                backgroundColor: "rgba(0,0,0,0.12)",
              }}
            ></View>
          );
        }}
      />
      <CreatePostModal show={showModal} toggleModal={toggleShowModal} />
      <TouchableOpacity
        onPress={() => toggleShowModal()}
        style={styles.floating_btn}
      >
        <IconButton icon="plus" size={30} color="rgba(255,255,255,0.8)" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  floating_btn: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
    borderRadius: 50,
    position: "absolute",
    bottom: 0,
    right: 0,
    marginBottom: 7,
    marginRight: 15,
  },
});
export default HomeScreen;
