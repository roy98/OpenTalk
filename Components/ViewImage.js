import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { getImageSize } from "../Utils/core";

function ViewImage({ show, toggleModal, image }) {
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();

  useEffect(() => {
    if (!show) {
      StatusBar.setBarStyle("dark-content");
    } else {
      StatusBar.setBarStyle("light-content");
    }
  }, [show]);

  useEffect(() => {
    if (image) {
      Image.getSize(image, (width, height) => {
        // calculate image width and height
        const screenWidth = Dimensions.get("window").width;
        const scaleFactor = width / screenWidth;
        const imageHeight = height / scaleFactor;
        setWidth(screenWidth - 15);
        setHeight(Math.floor(imageHeight));
      });
    }
  }, [image]);

  return (
    <>
      <Modal
        animationType="fade"
        presentationStyle="overFullScreen"
        transparent={false}
        visible={show}
        onRequestClose={() => {
          toggleModal();
        }}
      >
        <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TouchableOpacity
              onPress={toggleModal}
              style={{ position: "absolute", top: 0, right: 0 }}
            >
              <Avatar.Icon
                icon="close"
                style={{ backgroundColor: "#000" }}
                color="#fff"
                size={40}
              />
            </TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: image,
                  height: height,
                  width: width,
                  cache: "default",
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.99)",
    padding: 10,
  },
});

export default ViewImage;
