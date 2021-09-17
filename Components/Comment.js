import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";

function Comment({ comment }) {
  const [isLiked, setIsLiked] = useState(false);
  const likedOpacity = useRef(new Animated.Value(0)).current;

  const toggleIsLiked = () => {
    animate();
    setIsLiked(!isLiked);
  };

  const toggleTextShown = () => {
    setTextShown(!textShown);
  };

  const animate = () => {
    likedOpacity.setValue(0);
    Animated.timing(likedOpacity, {
      toValue: 1,
      duration: 1200,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
  };

  const size = likedOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [22, 30],
  });

  return (
    <View style={[styles.container]}>
      <View style={styles.avatar_container}>
        <Avatar.Image
          size={50}
          source={{
            uri: comment.author.avatar,
          }}
        />
      </View>
      <View style={{ padding: 5 }}>
        <View style={styles.author}>
          <Text style={{ fontFamily: "Avenir-Heavy" }}>
            {comment.author.name}
          </Text>
          <Text
            style={{
              marginLeft: 20,
              fontFamily: "Avenir",
              color: "rgba(0,0,0,0.4)",
            }}
          >
            {comment.author.alias}
          </Text>
        </View>
        <View
          style={{
            marginBottom: 5,
            marginRight: 60,
          }}
        >
          <Text style={{ textAlign: "justify", fontFamily: "Avenir" }}>
            {comment.content}
          </Text>
        </View>
        <View style={styles.footer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 0.5,
            }}
          >
            <TouchableOpacity style={styles.button_content}>
              <Avatar.Icon
                icon="comment-text-outline"
                color={"rgba(0,0,0,0.4)"}
                size={30}
                style={styles.avatar}
              />
              <Text style={styles.button_Text}>{comment.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleIsLiked()}
              style={styles.button_content}
            >
              {isLiked ? (
                <Animated.View
                  style={{
                    opacity: likedOpacity,
                    width: size,
                    height: size,
                  }}
                >
                  <Avatar.Icon
                    icon="thumb-up"
                    color={"purple"}
                    size={30}
                    style={[styles.avatar]}
                  />
                </Animated.View>
              ) : (
                <Avatar.Icon
                  icon="thumb-up-outline"
                  color={"rgba(0,0,0,0.4)"}
                  size={30}
                  style={styles.avatar}
                />
              )}
              <Text style={styles.button_Text}>{comment.likes}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
    borderTopWidth: 0.3,
    borderColor: "rgba(0,0,0,0.1)",
  },
  avatar_container: { padding: 5 },
  avatar: {
    backgroundColor: "transparent",
  },
  post_container: {
    flex: 1,
    padding: 5,
  },
  author: { flexDirection: "row", marginBottom: 5 },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 5,
    marginRight: 60,
  },
  button_content: {
    flexDirection: "row",
    alignItems: "center",
  },
  button_Text: {
    fontFamily: "Avenir",
    color: "rgba(0,0,0,0.4)",
  },
});

export default Comment;
