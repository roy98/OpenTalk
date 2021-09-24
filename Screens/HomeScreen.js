import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Post from "../Components/Post";
import { IconButton } from "react-native-paper";
import CreatePostModal from "../Components/CreatePostModal";
import { wait } from "../Utils/core";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../Store/action_creators/index";
import Skeleton_home from "../Components/Skeleton_home";

function HomeScreen({ route }) {
  const postState = useSelector((state) => state.post);
  const alertState = useSelector((state) => state.alert);

  const dispatch = useDispatch();
  const { getAllPosts, toggleLikedPost } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const [showModal, setShowModal] = useState(false);

  const onRefresh = useCallback(() => {
    getAllPosts();
  }, []);

  const toggleShowModal = () => setShowModal(!showModal);

  useEffect(() => {
    getAllPosts();
  }, []);

  if (alertState.isLoading && postState.posts.length < 1) {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#fff",
          padding: 10,
        }}
      >
        <Skeleton_home />
        <Skeleton_home showMedia />
        <Skeleton_home showMedia />
        <Skeleton_home />
      </ScrollView>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
    >
      <FlatList
        data={postState.posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Post
            userLikedPosts={postState.userLikedPosts}
            toggleLikePost={toggleLikedPost}
            post={item}
          />
        )}
        initialNumToRender={10}
        showsVerticalScrollIndicator={true}
        refreshControl={
          <RefreshControl
            refreshing={alertState.isLoading}
            onRefresh={onRefresh}
          />
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
