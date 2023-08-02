import React, { useContext, useState } from "react";
import {
  Text,
  View,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Picker from "../components/Picker";
import { AuthContext } from "../context/authContext";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  child,
  get,
  orderByChild,
  limitToLast,
} from "firebase/database";
import { format } from "date-fns";
import { NavigationProp } from "@react-navigation/native";

interface IRegisterProps {
  navigation: NavigationProp<any>;
}

const Register: React.FC<IRegisterProps> = ({ navigation }) => {
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("receita");

  const { user: usuario } = useContext(AuthContext);

  function handleSubmit() {
    Keyboard.dismiss();
    if (isNaN(parseFloat(valor)) || tipo === null) {
      alert("Preencha todos os campos!");
      return;
    }

    Alert.alert(`Confirmando dados`, `Tipo: ${tipo} - Valor: ${valor}`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Confirmar",
        onPress: () => handleAdd(),
      },
    ]);
  }

  async function handleAdd() {
    let uid = usuario?.uid;
    if (!uid) {
      console.error("ID de usuário invalido!");
      return;
    }

    const db = getDatabase();

    //Criando uma referencia e uma key Aleatoria
    const dbRef = ref(db, `historico/${uid}`);

    try {
      const novaReferencia = push(dbRef);
      let key = novaReferencia.key;

      if (!key) {
        console.error("Chave inválida para a nova referência.");
        return;
      }

      await set(child(dbRef, key), {
        tipo: tipo,
        valor: parseFloat(valor),
        data: format(new Date(), "dd/MM/yy"),
      });

      //Atualizar o Saldo
      const dbUser = ref(db, `users/${uid}`);
      const snapshot = await get(dbUser);

      if (snapshot.exists()) {
        let saldo = parseFloat(snapshot.val().saldo);

        tipo === "despesa"
          ? (saldo -= parseFloat(valor))
          : (saldo += parseFloat(valor));

        await set(child(dbUser, "saldo"), saldo);
      } else {
        // Usuário não encontrado, criar o nó do usuário com saldo inicial
        await set(dbUser, {
          nome: usuario?.nome, // Certifique-se de ter o nome do usuário disponível no contexto
          saldo: tipo === "despesa" ? -parseFloat(valor) : parseFloat(valor),
        });
      }
    } catch (error) {
      console.error("Erro ao adicionar dados:", error);
    }

    Keyboard.dismiss();
    setValor("");
    navigation.navigate("Home");
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <SafeAreaView style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input}
            placeholder={"Valor desejado"}
            placeholderTextColor={"#222"}
            keyboardType={"numeric"}
            returnKeyType={"next"}
            onSubmitEditing={() => Keyboard.dismiss()}
            value={valor}
            onChangeText={(text) => setValor(text)}
          />

          <Picker onChange={setTipo} tipo={tipo} />

          <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
            <Text style={styles.textBtn}>Registrar</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10100F",
  },
  input: {
    fontSize: 18,
    fontWeight: "400",
    marginTop: 25,
    width: "80%",
    padding: 10,
    backgroundColor: "#f7f1f1",
    borderRadius: 5,
  },
  btn: {
    width: "80%",
    backgroundColor: "#7bd74a",
    marginTop: 15,
    padding: 12,
    borderRadius: 6,
  },
  textBtn: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});

export default Register;
