import React, { useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AuthRoutes from "./Auth.Routes";
import { AuthContext } from "../context/authContext";
import AppRoutes from "./App.Routes";

const Router = () => {
  const { signed, loading } = useContext(AuthContext);

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={68} color={"#724C9D"} />
    </View>
  ) : (
    <>{signed ? <AppRoutes /> : <AuthRoutes />}</>
  );
};

export default Router;
