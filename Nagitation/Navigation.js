import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "../Screens/SplashScreen";
import LoginScreen from "../Screens/LoginScreen";
import WelcomeScreen from "../Screens/WelcomeScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import HomeScreen from "../Screens/HomeScreen";
import LinearGradient_background from "../Components/LinearGradient_background";
import { HeaderLeftDrawer, HeaderRightAvatar } from "../Components/HeaderItems";
import { IconButton } from "react-native-paper";
import SearchScreen from "../Screens/SearchScreen";
import NotificationScreen from "../Screens/NotificationScreen";
import MessageScreen from "../Screens/MessageScreen";
import {
  CustomMainHeader,
  CustomBackHeader,
  CustomSearchHeader,
} from "../Components/CustomHeader";
import TalkDetailScreen from "../Screens/TalkDetailScreen";
import ProfileScreen from "../Screens/ProfileScreen";

const MainStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function HomeNavigation() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ header: CustomMainHeader }}
      />
      <HomeStack.Screen
        name="Talk"
        component={TalkDetailScreen}
        options={{ header: CustomBackHeader }}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ header: CustomBackHeader }}
      />
    </HomeStack.Navigator>
  );
}

function SearchNavigation() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ header: CustomSearchHeader }}
      />
      <SearchStack.Screen
        name="Profiles"
        component={ProfileScreen}
        options={{ header: CustomBackHeader }}
      />
    </SearchStack.Navigator>
  );
}

function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsLoading(false);
      setIsAuth(true);
    }, 3000);
    () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <>
        <SplashScreen />
      </>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!isAuth ? (
          <MainStack.Navigator>
            <MainStack.Screen
              name="welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="signup"
              component={SignUpScreen}
              options={{ headerShown: false, gestureEnabled: false }}
            />
          </MainStack.Navigator>
        ) : (
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              headerBackground: LinearGradient_background,
              tabBarBackground: LinearGradient_background,
              headerShown: false,
              headerStyle: {
                height: 100,
              },
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: "Avenir-Heavy",
                color: "#fff",
              },
              headerLeft: HeaderLeftDrawer,
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
              component={NotificationScreen}
              options={{ title: "Notification", headerShown: true }}
            />
            <Tab.Screen
              name="Message"
              component={MessageScreen}
              options={{ title: "Message", headerShown: true }}
            />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Navigation;
