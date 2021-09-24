import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LinearGradient_background from "../Components/LinearGradient_background";
import { HeaderLeftDrawer, HeaderRightAvatar } from "../Components/HeaderItems";
import { IconButton } from "react-native-paper";
import {
  CustomMainHeader,
  CustomBackHeader,
  CustomSearchHeader,
} from "../Components/CustomHeader";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Screens from "../Screens";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../Store/action_creators/index";

const Drawer = createDrawerNavigator();
const LoginStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function HomeNavigation() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={Screens.HomeScreen}
        options={{ header: CustomMainHeader }}
      />
    </HomeStack.Navigator>
  );
}

function SearchNavigation() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={Screens.SearchScreen}
        options={{ header: CustomSearchHeader }}
      />
    </SearchStack.Navigator>
  );
}

function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="HomeNavigation"
      screenOptions={({ route }) => ({
        //headerBackground: LinearGradient_background,
        tabBarBackground: LinearGradient_background,
        headerShown: false,
        /*headerStyle: {
          height: 100,
        },*/
        //headerTitleAlign: "center",
        /*headerTitleStyle: {
          fontFamily: "Avenir-Heavy",
          color: "#fff",
        },*/
        //headerLeft: HeaderLeftDrawer,
        //headerRight: HeaderRightAvatar,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontFamily: "Avenir" },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          color = focused ? "#fff" : "rgba(255,255,255,0.5)";
          size = focused ? size : 22;
          if (route.name === "HomeNavigation") {
            iconName = `home${focused ? "" : "-outline"}`;
          } else if (route.name === "SearchNavigation") {
            iconName = "magnify";
          } else if (route.name === "Notification") {
            iconName = `bell${focused ? "" : "-outline"}`;
          } else if (route.name === "Message") {
            iconName = `email${focused ? "" : "-outline"}`;
          }
          return <IconButton icon={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "rgba(255,255,255,0.5)",
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: "rgba(0,0,0,0.5)",
        },
      })}
    >
      <Tab.Screen
        name="HomeNavigation"
        component={HomeNavigation}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="SearchNavigation"
        component={SearchNavigation}
        options={{ title: "Search" }}
      />
      <Tab.Screen
        name="Notification"
        component={Screens.NotificationScreen}
        options={{
          title: "Notification",
          header: CustomMainHeader,
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Message"
        component={Screens.MessageScreen}
        options={{
          title: "Message",
          header: CustomMainHeader,
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
}

function MainNanigation({ navigation, route }) {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Main" component={TabNavigation} />
      <MainStack.Screen
        name="Profile"
        component={Screens.ProfileScreen}
        options={{ headerShown: true, header: CustomBackHeader }}
      />
      <MainStack.Screen
        name="Talk"
        component={Screens.TalkDetailScreen}
        options={{ header: CustomBackHeader, headerShown: true }}
      />
    </MainStack.Navigator>
  );
}

function Navigation() {
  // Global state
  const authState = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const { restoreToken } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    let timer = setTimeout(() => {
      restoreToken({ token: null, user: null });
    }, 5000);
    () => clearTimeout(timer);
  }, []);

  if (authState.isLoading) {
    return (
      <>
        <Screens.SplashScreen />
      </>
    );
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator>
          {!authState.userToken && authState.userToken == null ? (
            <Drawer.Screen
              name="WelcomeDrawer"
              options={{ headerShown: false, swipeEnabled: false }}
            >
              {() => (
                <LoginStack.Navigator screenOptions={{ headerShown: false }}>
                  <LoginStack.Screen
                    name="welcome"
                    component={Screens.WelcomeScreen}
                    options={{
                      animationTypeForReplace: authState.isSignedOut
                        ? "pop"
                        : "push",
                    }}
                  />
                  <LoginStack.Screen
                    name="login"
                    component={Screens.LoginScreen}
                  />
                  <LoginStack.Screen
                    name="signup"
                    component={Screens.SignUpScreen}
                    options={{ gestureEnabled: false }}
                  />
                </LoginStack.Navigator>
              )}
            </Drawer.Screen>
          ) : (
            <Drawer.Screen
              name="MainDrawer"
              component={MainNanigation}
              options={{
                headerShown: false,
                swipeEnabled: true,
                title: "Main",
              }}
            />
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Navigation;
