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
import {
  getPosts,
  likePost,
  unLikePost,
  getUserLikes,
  onCreatePost,
} from "../API/Auth.service";

function HomeScreen({ route }) {
  const postState = useSelector((state) => state.post);
  const currentUser = useSelector((state) => state.authentication.user);

  const dispatch = useDispatch();
  const {
    getAllPosts,
    getAllLikes,
    toggleLikedPost,
    error,
    success,
    newPostAdded,
  } = bindActionCreators(actionCreators, dispatch);

  const handleLikePost = (post) => {
    likePost(currentUser.id, post.id)
      .then((res) => {
        toggleLikedPost(res);
      })
      .catch((err) => {
        error(err.message);
      });
  };

  const handleUnLikePost = (like) => {
    unLikePost(like.id)
      .then((res) => {
        toggleLikedPost(res);
      })
      .catch((err) => {
        error(err.message);
      });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getPosts()
      .then((res) => {
        setRefreshing(false);
        getAllPosts(res.items);
      })
      .catch((err) => {
        setRefreshing(false);
      });
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const toggleShowModal = () => setShowModal(!showModal);

  useEffect(() => {
    displayLoader();
    getPosts()
      .then((res) => {
        getAllPosts(res.items);
        hideLoader();
      })
      .catch((err) => {
        hideLoader();
      });

    getUserLikes(currentUser.id)
      .then((res) => {
        getAllLikes(res.items);
      })
      .catch((err) => {
        error(err.message);
      });

    onCreatePost().subscribe({
      next: (data) => {
        newPostAdded(data.value.data.onCreatePost);
        success("New updates");
      },
    });
  }, []);

  /* Skeletton indicator */
  const [showLoader, setShowLoader] = useState(false);
  const displayLoader = () => setShowLoader(true);
  const hideLoader = () => setShowLoader(false);

  if (showLoader && postState.posts.length < 1) {
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
            likePost={handleLikePost}
            unLikePost={handleUnLikePost}
            userLikedPosts={postState.userLikedPosts}
            post={item}
          />
        )}
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
