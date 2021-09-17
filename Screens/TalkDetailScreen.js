import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  Image,
} from "react-native";
import { Avatar, TextInput } from "react-native-paper";
import Comment from "../Components/Comment";
import FakeComments from "../API/FakeComments";

function TalkDetailScreen({ route }) {
  const { post } = route.params;
  const [comment, setComment] = useState("");

  const [isLiked, setIsLiked] = useState(false);
  const likedOpacity = useRef(new Animated.Value(0)).current;

  const toggleIsLiked = () => {
    animate();
    setIsLiked(!isLiked);
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
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 15 }}>
          <View style={styles.avatar_container}>
            <Avatar.Image
              size={50}
              source={{
                uri: post.author.avatar,
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: "Avenir-Heavy" }}>
                {post.author.name}
              </Text>
              <Text
                style={{
                  fontFamily: "Avenir",
                  color: "rgba(0,0,0,0.4)",
                }}
              >
                {post.author.alias}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              paddingVertical: 5,
            }}
          >
            <Text style={{ textAlign: "justify", fontFamily: "Avenir" }}>
              {post.content}
            </Text>
            {post.image_url ? (
              <View
                style={{
                  height: 150,
                  marginVertical: 15,
                  backgroundColor: "rgba(0,0,0,0.8)",
                  borderRadius: 15,
                }}
              >
                <Image
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
          <View>
            {FakeComments.map((item) => {
              return <Comment key={item.id} comment={item} />;
            })}
            <TouchableOpacity
              style={{
                borderTopWidth: 0.3,
                borderColor: "rgba(0,0,0,0.1)",
                padding: 15,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Avenir",
                  color: "purple",
                }}
              >
                Load more comments ...
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        style={{ backgroundColor: "#fff" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={92}
      >
        <View style={styles.input_container}>
          <TextInput
            placeholder="Your comment"
            right={<TextInput.Affix text={`${comment.length}/100`} />}
            style={styles.input}
            underlineColor="purple"
            selectionColor="purple"
            multiline
            maxLength={100}
            defaultValue={comment}
            onChangeText={setComment}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 80,
              }}
            >
              <TouchableOpacity>
                <Avatar.Icon
                  size={40}
                  style={{ backgroundColor: "#fff" }}
                  icon="emoticon-happy-outline"
                  color="purple"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Avatar.Icon
                  style={{ backgroundColor: "#fff" }}
                  size={40}
                  icon="camera"
                  color="purple"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Avenir",
                  fontWeight: "400",
                }}
              >
                Talk
              </Text>
              <Avatar.Icon
                style={{
                  backgroundColor: "purple",
                  transform: [{ rotateZ: "-25deg" }],
                }}
                size={30}
                icon="send"
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingBottom: 0,
  },
  content: {
    flex: 1,
  },
  input_container: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    borderColor: "rgba(0,0,0,0.3)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  input: {
    backgroundColor: "#fff",
    fontFamily: "Avenir",
    fontSize: 13,
    height: 45,
  },
  btn: {
    backgroundColor: "purple",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 25,
  },
  avatar_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    borderTopWidth: 0.3,
    borderColor: "rgba(0,0,0,0.1)",
  },
  button_content: {
    flexDirection: "row",
    alignItems: "center",
  },
  button_Text: {
    fontFamily: "Avenir",
    color: "rgba(0,0,0,0.4)",
  },
  avatar: {
    backgroundColor: "transparent",
  },
});

export default TalkDetailScreen;
