import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";
import Choose_categories from "../Components/Choose_categories";
import FollowFriends from "../Components/FollowFriends";
import SignupForm from "../Components/SignupForm";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../Store/action_creators/index";
import { login } from "../API/Auth.service";

function SignUpScreen({ navigation }) {
  /* Global State for login */
  const currentUser = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const { signUp, error, success, signIn } = bindActionCreators(
    actionCreators,
    dispatch
  );

  /* Activity indicator */
  const [showLoader, setShowLoader] = useState(false);
  const displayLoader = () => setShowLoader(true);
  const hideLoader = () => setShowLoader(false);
  useEffect(() => {
    hideLoader(false);
  }, []);

  const [activeStep, setActiveStep] = useState(1);

  const nextStep = () => {
    if (activeStep < 3) {
      setActiveStep((step) => step + 1);
    } else {
      displayLoader();
      login(currentUser.email, currentUser.password)
        .then((res) => {
          hideLoader();
          const data = res.signInUserSession.idToken;
          signIn({
            token: data.jwtToken,
            user: {
              id: data.payload.sub,
              email: currentUser.email,
              name: data.payload.name,
              alias: `@${currentUser.email.split("@")[0]}`,
            },
          });
        })
        .catch((err) => {
          error(err.message);
          navigation.popToTop();
          hideLoader();
        });
    }
  };

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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 25,
            }}
          >
            <View
              style={{
                width: 80,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.step_text}>Step</Text>
              <View
                style={[styles.step, activeStep === 1 && styles.step_active]}
              />
              <View
                style={[styles.step, activeStep === 2 && styles.step_active]}
              />
              <View
                style={[styles.step, activeStep === 3 && styles.step_active]}
              />
            </View>
            {activeStep === 1 ? (
              <TouchableOpacity
                onPress={() => navigation.navigate("login")}
                style={styles.logIn_container}
              >
                <Text style={{ fontFamily: "Avenir-Heavy", color: "#FFF" }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
                onPress={nextStep}
              >
                <Text style={{ fontFamily: "Avenir", color: "#FFF" }}>
                  Skip
                </Text>
                <IconButton
                  style={{ margin: 0 }}
                  color="rgba(255,255,255,0.8)"
                  size={20}
                  icon="chevron-right"
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.logoContainer}>
            <Image source={require("../assets/icon.png")} style={styles.logo} />
            <Text style={styles.app_name}>OpenTalk</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
      {activeStep === 1 ? (
        <SignupForm
          onNext={nextStep}
          displayLoader={displayLoader}
          hideLoader={hideLoader}
          error={error}
          success={success}
        />
      ) : activeStep === 2 ? (
        <Choose_categories
          onNext={nextStep}
          displayLoader={displayLoader}
          hideLoader={hideLoader}
        />
      ) : (
        <FollowFriends onNext={nextStep} />
      )}
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
  logIn_container: {},
  step_text: {
    color: "rgba(255,255,255,0.62)",
    fontFamily: "Avenir",
  },
  step: {
    height: 8,
    width: 8,
    borderColor: "rgba(255,255,255,0.62)",
    borderWidth: 1,
    borderRadius: 5,
  },
  step_active: {
    backgroundColor: "#fff",
    width: 15,
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

export default SignUpScreen;
