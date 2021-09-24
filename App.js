import { StatusBar } from "react-native";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Navigation from "./Nagitation/Navigation";
import { Provider } from "react-redux";
import store from "./Store/Store";
import Amplify from "aws-amplify";
import config from "./src/aws-exports";
import Alert from "./Components/Alert";
Amplify.configure(config);

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Navigation />
        <StatusBar barStyle={"light-content"} />
        <Alert />
      </PaperProvider>
    </Provider>
  );
}
