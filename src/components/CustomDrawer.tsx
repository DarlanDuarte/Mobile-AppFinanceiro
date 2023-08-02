import React, { useContext } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { View, Image, Text } from "react-native";
import { AuthContext } from "../context/authContext";

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const { user, SignOut } = useContext(AuthContext);

  return (
    <DrawerContentScrollView>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          resizeMode={"contain"}
          source={require("../img/LogoFinance.png")}
          style={{ width: 150, height: 150, marginTop: 35 }}
        />
        <Text
          style={{
            color: "#fff",
            fontSize: 25,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          Bem-Vindo
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 25,
            fontWeight: "bold",
            marginTop: 5,
            paddingBottom: 25,
          }}
        >
          {user?.nome}
        </Text>
      </View>

      <DrawerItemList {...props} />
      <DrawerItem
        {...props}
        label={"Sair do app"}
        inactiveBackgroundColor={"#940000"}
        labelStyle={{ fontWeight: "900", fontSize: 18, color: "#ffffff" }}
        onPress={() => SignOut()}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
