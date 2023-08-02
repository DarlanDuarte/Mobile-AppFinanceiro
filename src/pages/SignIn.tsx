import React, { useState, useContext } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";

interface ISignIn {
  navigation: NavigationProp<any>;
}

const Signin: React.FC<ISignIn> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { SignIn, authLoading } = useContext(AuthContext);

  function handleLogin() {
    SignIn(email, password);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Signin}>
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Image
            style={styles.image}
            source={require("../img/LogoFinance.png")}
          />

          <View style={styles.wrapperInput}>
            <TextInput
              style={styles.input}
              value={email}
              placeholder={"Email"}
              placeholderTextColor={"#DCCAE9"}
              autoCorrect={false}
              autoCapitalize={"none"}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={styles.wrapperInput}>
            <TextInput
              style={styles.input}
              value={password}
              placeholder={"Senha"}
              placeholderTextColor={"#DCCAE9"}
              autoCorrect={false}
              autoCapitalize={"none"}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <TouchableOpacity onPress={handleLogin} style={styles.btn}>
            {authLoading ? (
              <ActivityIndicator size={42} color={"#fff"} />
            ) : (
              <Text style={styles.textBtn}> Acessar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ color: "#fff", textAlign: "center", marginTop: 15 }}>
              Criar uma Conta
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#10100F",
  },
  Signin: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
    width: 200,
    height: 200,
    marginBottom: 12,
  },
  wrapperInput: {
    alignSelf: "center",
    width: "90%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "rgba(60,60,60,0.2)",
    marginBottom: 10,
    borderRadius: 8,
  },

  input: {
    width: "100%",
    color: "#fff",
    fontSize: 18,
  },
  btn: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#724C9D",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  textBtn: {
    fontWeight: "900",
    fontSize: 18,
    /* textAlign: "center", */
    color: "#F4F9FC",
  },
});

export default Signin;
