import "react-native-gesture-handler";

import { StyleSheet, Text, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import app from "./src/services/app";
import Router from "./src/routes/Router";
import AuthContextProvider from "./src/context/authContext";

if (!app.automaticDataCollectionEnabled) {
  app.automaticDataCollectionEnabled = true;
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={"#0B0205"} barStyle={"light-content"} />
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </NavigationContainer>
  );
}
