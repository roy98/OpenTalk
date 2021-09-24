import React, { useCallback, useMemo, useRef, useState } from "react";
import { Avatar, Colors, IconButton, TextInput } from "react-native-paper";
import {
  ActionSheetIOS,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as CameraFunctions from "../Utils/CameraFunctions";
import { validateEmail, wait } from "../Utils/core";
import {
  signUp as APISignUP,
  uploadImage,
  createUser,
} from "../API/Auth.service";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../Store/action_creators/index";

function SignupForm({ onNext, hideLoader, displayLoader }) {
  /* Global State for login */
  const dispatch = useDispatch();
  const { signUp, error } = bindActionCreators(actionCreators, dispatch);

  /* Bottom sheet reference and snap points */
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [1, "18%"], []);

  /* State to show or hide passwords */
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  /* Sign up Form */
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmP, setconfirmP] = useState("");

  const validateForm = () => {
    if (!name || name == "") {
      error("The field Name is required");
      return false;
    }
    if (!email || email == "") {
      error("The field Email is required");
      return false;
    }
    if (!password || password == "") {
      error("The field Password is required");
      return false;
    }
    if (!confirmP || confirmP == "") {
      error("Passwords doesn't match");
      return false;
    }
    if (confirmP !== password) {
      error("Passwords doesn't match");
      return false;
    }

    return true;
  };

  // S3 bucket Access denied when uploadind a files
  /*   const handleSubmit = () => {
    if (validateForm()) {
      displayLoader();
      if (image) {
        const filename = `${
          name.split(" ")[0]
        }_avatar_${new Date().toISOString()}_${
          Math.floor(Math.random() * 9) - 1
        }`;
        uploadImage(filename, image)
          .then((res) => {
            console.log(res);
            startSignIn();
          })
          .catch((err) => {
            console.log(err);
            hideLoader();
          });
      } else {
        startSignIn();
      }
    }
  }; */

  const handleSubmit = () => {
    if (validateForm()) {
      startSignIn();
    }
  };

  const startSignIn = () => {
    displayLoader();
    APISignUP(name, email, password)
      .then((res) => {
        startUserCreation(
          res.userSub,
          name,
          email,
          `@${email.split("@")[0]}`,
          password,
          res.user.Session
        );
        hideLoader();
      })
      .catch((err) => {
        error(err.message.split(": ")[1] || err.message);
        hideLoader();
      });
  };

  const startUserCreation = (id, name, email, alias, password, session) => {
    displayLoader();
    createUser({
      id: id,
      name: name,
      email: email,
      alias: alias,
    })
      .then((res) => {
        hideLoader();
        signUp({
          user: {
            id: id,
            name: name,
            email: email,
            alias: alias,
            password: password,
            session: session,
          },
        }),
          onNext();
      })
      .catch((err) => {
        error("An exception occur, please try again later!");
        hideLoader();
      });
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        opacity={0.5}
      />
    ),
    []
  );

  const showBottomSheet = () => {
    if (!CameraFunctions.hasCameraPermission()) {
      CameraFunctions.requestCameraPermission();
    }
    if (!CameraFunctions.hasMediaLibraryPermission()) {
      CameraFunctions.requestMediaLibraryPermission();
    }
    if (Platform.OS === "android") {
      bottomSheetRef.current.expand();
    } else if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Take Photo", "Choose Photo", "Reset Photo", "Cancel"],
          cancelButtonIndex: 3,
          destructiveButtonIndex: 2,
        },
        (index) => {
          if (index === 0) {
            openCamera();
          } else if (index === 1) {
            openMediaLibrary();
          } else if (index === 2) {
            setImage(null);
          }
        }
      );
    }
  };

  const openCamera = async () => {
    CameraFunctions.launchCamera().then((r) => setImage(r));
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };

  const openMediaLibrary = async () => {
    CameraFunctions.launchImageLibrary().then((r) => setImage(r));
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#fff" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.form}>
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
              Create Account
            </Text>
            <TouchableOpacity
              onPress={() => showBottomSheet()}
              style={{
                height: 80,
                width: 80,
                backgroundColor: Colors.grey200,
                justifyContent: "center",
                alignItems: "center",
                borderColor: Colors.deepPurple100,
                borderWidth: 1,
                borderRadius: 50,
              }}
            >
              {image ? (
                <Avatar.Image
                  source={{
                    uri: "data:image/jpeg;base64," + image.base64,
                    height: image.height,
                    width: image.width,
                  }}
                  size={78}
                />
              ) : (
                <IconButton
                  icon="camera"
                  color={Colors.deepPurple500}
                  size={20}
                  animated={true}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.input_container}>
            <TextInput
              label="Name"
              placeholder="Your name"
              defaultValue={name}
              onChangeText={setName}
              style={styles.input}
              right={
                name &&
                name.trim().length > 3 && <TextInput.Icon name="check" />
              }
              maxLength={40}
            />
            <TextInput
              label="Email"
              placeholder="Your email"
              defaultValue={email}
              onChangeText={setEmail}
              style={styles.input}
              right={
                email && validateEmail(email) && <TextInput.Icon name="check" />
              }
              maxLength={30}
            />
            <TextInput
              label="Password"
              placeholder="Your password"
              defaultValue={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
              style={styles.input}
              right={
                <TextInput.Icon
                  onPress={() => setShowPass(!showPass)}
                  name={showPass ? "eye-off" : "eye"}
                />
              }
            />
            <TextInput
              label="Confirm password"
              secureTextEntry={!showConfirmPass}
              defaultValue={confirmP}
              onChangeText={setconfirmP}
              placeholder="Confirm password"
              style={styles.input}
              right={
                <TextInput.Icon
                  onPress={() => setShowConfirmPass(!showConfirmPass)}
                  name={showConfirmPass ? "eye-off" : "eye"}
                />
              }
            />
          </View>
          <View style={styles.btn_container}>
            <TouchableOpacity onPress={handleSubmit} style={[styles.btn]}>
              <Text
                style={[
                  { textAlign: "center", color: "purple" },
                  styles.btn_text,
                ]}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {Platform.OS === "android" && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={true}
        >
          <BottomSheetView
            style={{
              flex: 1,
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              onPress={() => openCamera()}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton color="rgba(0,0,0,0.5)" icon="camera" />
              <Text style={{ color: "rgba(0,0,0,0.5)" }}>Take a picture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openMediaLibrary()}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton color="rgba(0,0,0,0.5)" icon="folder-image" />
              <Text style={{ color: "rgba(0,0,0,0.5)" }}>Open the Gallery</Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: "space-evenly",
    paddingRight: 25,
    paddingLeft: 25,
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
  input_container: {
    flex: 2,
    padding: 5,
    paddingTop: 0,
    justifyContent: "space-evenly",
  },
  btn_container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 20,
  },
  btn_text: {
    fontFamily: "Avenir-Heavy",
    color: "#FFF",
  },
  input: {
    backgroundColor: "#fff",
    marginVertical: 5,
  },
});

export default SignupForm;
