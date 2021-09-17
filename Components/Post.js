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

function Post({ post }) {
  const navigation = useNavigation();
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [numLines, setNumLines] = useState(undefined);

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

  useEffect(() => {
    setNumLines(textShown ? undefined : 3);
  }, [textShown]);

  const onTextLayout = useCallback(
    (e) => {
      if (e.nativeEvent.lines.length > 3 && !textShown) {
        setShowMoreButton(true);
        setNumLines(3);
      }
    },
    [textShown]
  );

  return (
    <View style={[styles.container]}>
      <View style={styles.avatar_container}>
        <Avatar.Image
          size={50}
          source={{
            uri: post.author.avatar,
          }}
        />
      </View>
      <View style={styles.post_container}>
        <View style={styles.author}>
          <Text style={{ fontFamily: "Avenir-Heavy" }}>{post.author.name}</Text>
          <Text
            style={{
              marginLeft: 20,
              fontFamily: "Avenir",
              color: "rgba(0,0,0,0.4)",
            }}
          >
            {post.author.alias}
          </Text>
        </View>
        <View style={{ marginBottom: 5 }}>
          <Text
            onPress={() => navigation.navigate("Talk", { post: post })}
            onTextLayout={onTextLayout}
            numberOfLines={numLines}
            ellipsizeMode="tail"
            style={{ textAlign: "justify", fontFamily: "Avenir" }}
          >
            {post.content}
          </Text>
          {showMoreButton ? (
            <Text
              style={{ fontFamily: "Avenir", color: "rgba(0,0,0,0.4)" }}
              onPress={toggleTextShown}
            >
              {textShown ? null : "See More"}
            </Text>
          ) : null}
          {post.image_url ? (
            <View
              style={{
                height: 150,
                margin: 5,
                backgroundColor: "rgba(0,0,0,0.8)",
                borderRadius: 15,
              }}
            >
              <Image
                style={{}}
                source={{
                  uri: post.image_url,
                  height: 150,
                }}
                borderRadius={15}
                resizeMode="cover"
              />
            </View>
          ) : null}
        </View>
        <View style={styles.footer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 0.7,
            }}
          >
            <TouchableOpacity style={styles.button_content}>
              <Avatar.Icon
                icon="comment-text-outline"
                color={"rgba(0,0,0,0.4)"}
                size={30}
                style={styles.avatar}
              />
              <Text style={styles.button_Text}>{post.comments}</Text>
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
              <Text style={styles.button_Text}>{post.likes}</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  height: 5,
                  width: 5,
                  backgroundColor: "grey",
                  borderRadius: 5,
                  marginRight: 5,
                }}
              ></View>
              <Text
                style={{
                  fontFamily: "Avenir-Heavy",
                  fontSize: 11,
                  color: "rgba(0,0,0,0.3)",
                }}
              >
                {post.created_at}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 0,
    backgroundColor: "#fff",
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

export default Post;
