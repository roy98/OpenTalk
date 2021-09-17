import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActionSheetIOS,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Colors, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

function CreatePostModal({ show, toggleModal }) {
  /* Bottom sheet reference and snap points */
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["35%"], []);

  const [isPublic, setIsPublic] = useState(true);
  const [post, onPostChange] = useState("");
  const postRef = useRef(null);

  const toggleIsPublic = () => setIsPublic(!isPublic);
  const alertCancel = () => {
    if (Platform.OS === "android") {
      Alert.alert(
        "Continue editing?",
        "If you discard now, you'll lose this post.",
        [
          { text: "Keep Editing", style: "cancel" },
          {
            text: "Discard Post",
            style: "destructive",
            onPress: () => toggleModal(),
          },
        ]
      );
    } else if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Keep Editing", "Discard Post", "Cancel"],
          cancelButtonIndex: 2,
          destructiveButtonIndex: 1,
          title: "Continue editing?",
          message: "if you discard now, you'll lose this post.",
        },
        (index) => {
          if (index === 1) {
            toggleModal();
          }
        }
      );
    }
  };

  useEffect(() => {
    if (show) {
      StatusBar.setBarStyle("dark-content");
    } else {
      StatusBar.setBarStyle("light-content");
    }
    onPostChange("");
  }, [show]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={show}
        onRequestClose={() => {
          toggleModal();
        }}
      >
        <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
          <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "#fff" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.content}>
              <View style={styles.btn_container}>
                <TouchableOpacity
                  onPress={() => (post ? alertCancel() : toggleModal())}
                  style={styles.cancel}
                >
                  <Text style={{ fontFamily: "Avenir", fontSize: 17 }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontFamily: "Avenir-Heavy", fontSize: 20 }}>
                  Start Post
                </Text>
                <TouchableOpacity
                  //onPress={() => toggleModal()}
                  style={[
                    styles.post_btn,
                    !post ? styles.post_btn_disabled : null,
                  ]}
                  disabled={!post}
                >
                  <Text
                    style={[
                      {
                        fontFamily: "Avenir-Heavy",
                        fontSize: 15,
                        color: "#fff",
                      },
                      { opacity: post ? 1 : 0.5 },
                    ]}
                  >
                    Post
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{ flexGrow: 1 }}
              >
                <View style={styles.userBox}>
                  <Avatar.Text
                    label="JD"
                    size={50}
                    style={{ marginRight: 10 }}
                  />
                  <View>
                    <Text
                      style={{
                        fontFamily: "Avenir-Heavy",
                        fontSize: 16,
                      }}
                    >
                      Jean Depardieux Felix
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderRadius: 50,
                        borderColor: "rgba(0,0,0,0.2)",
                        borderWidth: 1,
                        justifyContent: "space-around",
                        width: 120,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Avenir-Heavy",
                          fontSize: 12,
                          color: "rgba(0,0,0,0.5)",
                        }}
                      >
                        {isPublic ? "Anyone" : "Private"}
                      </Text>
                      <Switch
                        value={isPublic}
                        onValueChange={toggleIsPublic}
                        trackColor={{ true: "green", false: "red" }}
                        ios_backgroundColor="red"
                        style={{
                          transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }],
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.input_container}>
                  <TextInput
                    placeholder="What do you want to talk about?"
                    multiline={true}
                    autoFocus={false}
                    enablesReturnKeyAutomatically={true}
                    maxLength={500}
                    style={styles.input}
                    value={post}
                    onChangeText={(text) => onPostChange(text)}
                    ref={postRef}
                  />
                  <View style={styles.uploaded_image}></View>
                </View>
              </ScrollView>
              <View style={[styles.bottom_actions]}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity>
                    <IconButton
                      style={styles.action_icon}
                      icon="camera"
                      color="rgba(0,0,0,0.6)"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <IconButton
                      style={styles.action_icon}
                      icon="image"
                      color="rgba(0,0,0,0.6)"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <IconButton
                      style={styles.action_icon}
                      icon="video"
                      color="rgba(0,0,0,0.6)"
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => toggleIsPublic()}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      color="rgba(0,0,0,0.6)"
                      style={{ margin: 0 }}
                      icon="earth"
                    />
                    <Text style={{ fontFamily: "Avenir", fontSize: 14 }}>
                      {isPublic ? "Anyone" : "Private"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onChange={(index) =>
              postRef.current && index === -1 && postRef.current.focus()
            }
            bottomInset={0}
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <BottomSheetView
              style={{
                flex: 1,
                justifyContent: "space-evenly",
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                //onPress={() => openCamera()}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <IconButton color="rgba(0,0,0,0.7)" icon="image" />
                <Text
                  style={{
                    color: "rgba(0,0,0,0.7)",
                    fontFamily: "Avenir-Heavy",
                  }}
                >
                  Add a photo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                //onPress={() => openCamera()}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <IconButton color="rgba(0,0,0,0.7)" icon="camera" />
                <Text
                  style={{
                    color: "rgba(0,0,0,0.7)",
                    fontFamily: "Avenir-Heavy",
                  }}
                >
                  Take a picture
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                //onPress={() => openCamera()}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <IconButton color="rgba(0,0,0,0.7)" icon="video" />
                <Text
                  style={{
                    color: "rgba(0,0,0,0.7)",
                    fontFamily: "Avenir-Heavy",
                  }}
                >
                  Take a video
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={true}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <IconButton color="rgba(0,0,0,0.7)" icon="file-document" />
                <Text
                  style={{
                    color: "rgba(0,0,0,0.7)",
                    fontFamily: "Avenir-Heavy",
                  }}
                >
                  Add a document
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={true}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <IconButton color="rgba(0,0,0,0.7)" icon="map-marker" />
                <Text
                  style={{
                    color: "rgba(0,0,0,0.7)",
                    fontFamily: "Avenir-Heavy",
                  }}
                >
                  Share your locaion
                </Text>
              </TouchableOpacity>
            </BottomSheetView>
          </BottomSheet>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  btn_container: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  post_btn: {
    padding: 8,
    paddingHorizontal: 15,
    backgroundColor: "purple",
    borderRadius: 5,
  },
  post_btn_disabled: {
    backgroundColor: Colors.purple300,
  },
  userBox: {
    padding: 15,
    flexDirection: "row",
  },
  input_container: {
    padding: 15,
    flex: 1,
  },
  input: {
    fontFamily: "Avenir",
    fontSize: 17,
  },
  bottom_actions: {
    paddingHorizontal: 10,
    borderColor: "rgba(0,0,0,0.1)",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopStartRadius: 13,
    borderTopEndRadius: 13,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
  },
});

export default CreatePostModal;
