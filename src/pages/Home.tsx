import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { AuthContext } from "../context/authContext";
import Historico, { IDataProps } from "../components/Historico";
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
  equalTo,
  query,
  remove,
} from "firebase/database";
import { format, isPast } from "date-fns";
import { MaterialIcons } from "@expo/vector-icons";
import DatePicker from "../components/DatePicker";

const Home: React.FC = () => {
  const [historico, setHistorico] = useState<
    { key: string; tipo: any; valor: any; date: string }[]
  >([]);

  const [saldo, setSaldo] = useState(0);

  const [newDate, setNewDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const { SignOut, user } = useContext(AuthContext);
  const uid = user?.uid;

  useEffect(() => {
    async function loadList() {
      const db = getDatabase();
      const dbRef = ref(db, `users/${uid}`);
      onValue(dbRef, async (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });

      //Atualizando os Dados
      const dbHistoricoRef = ref(db, `historico/${uid}`);
      const data = format(newDate, "dd/MM/yy");

      const dataQuery = query(
        dbHistoricoRef,
        orderByChild("data"),
        equalTo(data),
        limitToLast(15)
      );

      onValue(dataQuery, async (snapshot) => {
        if (snapshot.exists()) {
          let list: any[] = [];
          snapshot.forEach((item) => {
            list.push({
              key: item.key,
              tipo: item.val().tipo,
              valor: item.val().valor,
              date: item.val().data,
            });
          });
          setHistorico(list.reverse());
        }
      });
    }

    loadList();
  }, [uid, newDate]);

  async function handleDelete(data: IDataProps) {
    if (isPast(new Date(data.date))) {
      alert("Voce não pode excluir um registro antigo!");
      return;
    }

    Alert.alert(
      "Cuidado Atenção!",
      `Voce deseja excluir ${data.tipo} - Valor: ${data.valor} `,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => handleDeleteSucess(data),
        },
      ]
    );
  }

  async function handleDeleteSucess(data: IDataProps) {
    const db = getDatabase();
    const historicoRef = ref(db, `historico/${uid}/${data.key}`);
    await remove(historicoRef)
      .then(async (value) => {
        let saldoAtual: number = saldo;

        data.tipo === "despesa"
          ? (saldoAtual += data.valor)
          : (saldoAtual -= data.valor);

        const usersRef = ref(db, `users/${uid}/saldo`);
        await set(usersRef, saldoAtual);
      })
      .catch((error) => {
        console.warn(`Algo deu Errado na Tentativa de Excluir! ${error}`);
      });
  }

  function handleShowPicker() {
    setShowDate(true);
  }

  function handleCloser() {
    setShowDate(false);
  }

  function onChange(currentDate: Date) {
    setShowDate(Platform.OS === "ios");
    setNewDate(currentDate);
    console.log(currentDate);
  }

  return (
    <View style={styles.container}>
      <View style={{ marginLeft: 15 }}>
        <View style={styles.textWrapper}>
          <Text style={styles.textNome}>{user?.nome} </Text>
          <Text style={styles.textValor}>
            R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
          </Text>
        </View>

        <View style={styles.calendario}>
          <TouchableOpacity onPress={handleShowPicker}>
            <MaterialIcons name="event" size={32} color="#fff" />
          </TouchableOpacity>
          <Text
            style={{
              color: "#7bd74a",
              fontSize: 18,
              fontWeight: "600",
              marginLeft: 5,
            }}
          >
            Últimas Movimentações
          </Text>
        </View>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={historico}
        keyExtractor={(item) => item.key.toString()}
        renderItem={({ item }) => (
          <Historico data={item} deleteItem={handleDelete} />
        )}
      />

      {showDate && (
        <DatePicker onClose={handleCloser} date={newDate} onChange={onChange} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10100F",
    paddingTop: "10%",
    /* paddingLeft: 15, */
  },
  textWrapper: {},
  textNome: {
    color: "#FFF",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
  },
  textValor: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  list: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#f9fbf6",
    marginHorizontal: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  calendario: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
});

export default Home;
