import "react-native-gesture-handler";
import React from "react";
import Home from "../pages/Home";
import { createDrawerNavigator } from "@react-navigation/drawer";
import App from "../../App";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import CustomDrawer from "../components/CustomDrawer";

const AppDrawer = createDrawerNavigator();

const AppRoutes = () => {
  return (
    <AppDrawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#0B0205",
        },
        drawerLabelStyle: {
          fontWeight: "900",
          fontSize: 18,
        },
        drawerActiveBackgroundColor: "#724C9D",
        drawerInactiveBackgroundColor: "#2C1B47",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#ADA9BA",
        headerStyle: {
          backgroundColor: "#10100F",
          borderBottomWidth: 2,
          borderColor: "#2C1B47",
        },

        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "800",
        },
      }}
    >
      <AppDrawer.Screen name={"Home"} component={Home} />
      <AppDrawer.Screen
        name={"Profile"}
        component={Profile}
        /* options={{ headerShown: false }} */
      />
      <AppDrawer.Screen name={"Register"} component={Register} />
    </AppDrawer.Navigator>
  );
};

export default AppRoutes;
