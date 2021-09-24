import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Friend from "../Components/Friend";
import { wait } from "../Utils/core";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../Store/action_creators/index";
import {
  getUsers,
  followFriend,
  unfollowFriend,
  getFollowers,
} from "../API/Auth.service";

function SearchScreen(props) {
  const friendState = useSelector((state) => state.friend);
  const currentUser = useSelector((state) => state.authentication.user);

  const dispatch = useDispatch();
  const { getAllUsers, getAllFollowers, toggleFriend, error } =
    bindActionCreators(actionCreators, dispatch);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUsers()
      .then((res) => {
        setRefreshing(false);
        getAllUsers(res.items);
      })
      .catch((err) => {
        error(err.message);
        setRefreshing(false);
      });
  }, []);

  const handleFollowFriend = (user) => {
    followFriend(currentUser.id, user.id)
      .then((res) => {
        toggleFriend(res);
      })
      .catch((err) => {
        error(err.message);
      });
  };

  const handleUnFollowFriend = (friend) => {
    unfollowFriend(friend.id)
      .then((res) => {
        toggleFriend(res);
      })
      .catch((err) => {
        error(err.message);
      });
  };

  useEffect(() => {
    displayLoader();
    getUsers()
      .then((res) => {
        hideLoader();
        getAllUsers(res.items);
      })
      .catch((err) => error(err.message));
    getFollowers(currentUser.id)
      .then((res) => {
        getAllFollowers(res.items);
      })
      .catch((err) => {
        error(err.message);
      });
  }, []);

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
      <View style={styles.friends_container}>
        <FlatList
          data={friendState.friends}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Friend
              followFriend={handleFollowFriend}
              unfollowFriend={handleUnFollowFriend}
              userFriends={friendState.userFriends}
              user={item}
            />
          )}
          initialNumToRender={6}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyboardShouldPersistTaps="always"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  friends_container: {
    flex: 1,
    padding: 0,
    paddingTop: 0,
    alignItems: "center",
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

export default SearchScreen;
