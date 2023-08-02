import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";

interface IProfileProps {
  navigation: NavigationProp<any>;
}

const Profile: React.FC<IProfileProps> = ({ navigation }) => {
  const { user, SignOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {user?.nome} </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.textBtn}> Registrar Gastos </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: "#f20000" }]}
        onPress={SignOut}
      >
        <Text style={styles.textBtn}> Sair </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10100F",
    alignItems: "center",
    paddingTop: "10%",
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  btn: {
    width: "90%",
    backgroundColor: "#7bd74a",
    padding: 8,
    borderRadius: 14,
    marginBottom: 15,
  },
  textBtn: {
    textAlign: "center",
    fontSize: 24,
    color: "#fff",
    fontWeight: "700",
  },
});

export default Profile;
