import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import { validateEmail, wait } from "../Utils/core";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../Store/action_creators/index";
import { login } from "../API/Auth.service";

function LoginScreen({ navigation }) {
  /* Global State for login */
  const dispatch = useDispatch();
  const { signIn, error, success } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handleLogin = () => {
    displayLoader();
    login(email, password)
      .then((res) => {
        hideLoader();
        const data = res.signInUserSession.idToken;
        signIn({
          token: data.jwtToken,
          user: {
            id: data.payload.sub,
            email: email,
            name: data.payload.name,
            alias: `@${email.split("@")[0]}`,
          },
        });
      })
      .catch((err) => {
        error(err.message);
        hideLoader();
      });
  };

  /* Activity indicator */
  const [showLoader, setShowLoader] = useState(false);
  const displayLoader = () => setShowLoader(true);
  const hideLoader = () => setShowLoader(false);

  useEffect(() => {
    hideLoader(false);
  }, []);

  /* State to show or hide passwords */
  const [showPass, setShowPass] = useState(false);

  /* Sign in Form */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      {showLoader ? (
        <View style={styles.loader}>
          <ActivityIndicator color="purple" size="large" />
        </View>
      ) : null}
      <SafeAreaView style={styles.container}>
        <LinearGradient
          style={styles.gradient}
          start={[0, 1]}
          end={[1, 0]}
          colors={["indigo", "purple"]}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("signup")}
            style={styles.signUp_container}
          >
            <Text style={{ fontFamily: "Avenir-Heavy", color: "#FFF" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image source={require("../assets/icon.png")} style={styles.logo} />
            <Text style={styles.app_name}>OpenTalk</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
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
              Login
            </Text>
          </View>
          <View style={styles.input_container}>
            <TextInput
              label="Email"
              placeholder="Your email"
              defaultValue={email}
              onChangeText={setEmail}
              style={styles.input}
              right={
                email && validateEmail(email) && <TextInput.Icon name="check" />
              }
            />
            <View>
              <TextInput
                label="Password"
                secureTextEntry={!showPass}
                defaultValue={password}
                onChangeText={setPassword}
                placeholder="Your password"
                style={[styles.input, { marginBottom: 8 }]}
                right={
                  <TextInput.Icon
                    onPress={() => setShowPass(!showPass)}
                    name={showPass ? "eye-off" : "eye"}
                  />
                }
              />
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: "Avenir",
                    fontStyle: "italic",
                    fontSize: 12,
                    color: "rgba(0,0,0,0.5)",
                    textAlign: "right",
                  }}
                >
                  Forget your password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.btn_container}>
            <TouchableOpacity
              onPress={() => handleLogin()}
              style={[styles.btn]}
            >
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    backgroundColor: "purple",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 220,
    borderRadius: 15,
    justifyContent: "center",
  },
  form: {
    backgroundColor: "#fff",
    flexGrow: 0.6,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input_container: {
    flex: 2,
    padding: 5,
    paddingVertical: 5,
    justifyContent: "space-evenly",
  },
  btn_container: {
    flex: 1,
    justifyContent: "center",
  },
  btn_text: {
    fontFamily: "Avenir-Heavy",
    color: "#FFF",
  },
  input: {
    backgroundColor: "#fff",
  },
  logo: {
    height: 50,
    width: 50,
  },
  app_name: {
    color: "#fff",
    margin: 15,
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Avenir-Heavy",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  signUp_container: {
    alignItems: "flex-end",
    padding: 25,
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

export default LoginScreen;
