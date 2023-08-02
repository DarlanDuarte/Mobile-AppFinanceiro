import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Signin from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AuthStack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        animationEnabled: false,
      }}
    >
      <AuthStack.Screen
        name={"Signin"}
        component={Signin}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name={"SignUp"}
        component={SignUp}
        options={{
          headerStyle: {
            backgroundColor: "#10100F",
            borderBottomWidth: 2,
            borderBottomColor: "#724C9D",
          },
          headerTintColor: "#fff",
          headerTitle: "Voltar",
          headerBackTitleVisible: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
