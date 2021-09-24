import React, { useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Friend from "./Friend";
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

function FollowFriends({ onNext }) {
  const friendState = useSelector((state) => state.friend);
  const currentUser = useSelector((state) => state.authentication.user);

  const dispatch = useDispatch();
  const { getAllUsers, getAllFollowers, toggleFriend, error } =
    bindActionCreators(actionCreators, dispatch);

  const handleSubmit = () => {
    displayLoader();
    wait(1200).then(() => {
      hideLoader();
      onNext();
    });
  };

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
            data={friendState.friends}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={({}) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontFamily: "Avenir" }}>No data</Text>
              </View>
            )}
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
              onPress={handleSubmit}
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
    </>
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
export default FollowFriends;
