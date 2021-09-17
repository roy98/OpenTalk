import { StatusBar } from "react-native";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Navigation from "./Nagitation/Navigation";

export default function App() {
  return (
    <PaperProvider>
      <Navigation />
      <StatusBar barStyle={"light-content"} />
    </PaperProvider>
  );
}
