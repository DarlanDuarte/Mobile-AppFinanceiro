import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { Entypo } from "@expo/vector-icons";

export type IDataProps = {
  key: string | number;
  tipo: string;
  valor: number;
  date: string;
};

interface IHistoricoProps {
  data: IDataProps;
  deleteItem: (data: IDataProps) => Promise<void>;
}

const Historico: React.FC<IHistoricoProps> = ({ data, deleteItem }) => {
  const styles = StyleSheet.create({
    container: {
      padding: 15,
    },
    wrapper: {
      backgroundColor: "rgba(0,0,0,0.04)",
      /* paddingVertical: 20, */
      height: 70,
      padding: 6,
      borderRadius: 10,
    },
    iconWrapper: {
      width: "40%",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: data.tipo === "receita" ? "#7bd74a" : "#f00000",
      borderRadius: 10,
      shadowColor: "#000",
      elevation: 5,
    },
    textIcons: {
      fontSize: 18,
      fontWeight: "700",
      color: "#fff",
      marginLeft: 10,
    },
    valor: {
      fontSize: 26,
      fontWeight: "bold",
      paddingLeft: 5,
    },
  });

  return (
    <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.iconWrapper}>
            <Entypo
              name={
                data.tipo === "receita"
                  ? "arrow-with-circle-up"
                  : "arrow-with-circle-down"
              }
              size={25}
              color={data.tipo === "receita" ? "#345c04" : "#7b000b"}
              style={{ color: data.tipo === "receita" ? "#6f6" : "#ff3c3c" }}
            />
            <Text style={styles.textIcons}>{data.tipo}</Text>
          </View>
          <View style={{ shadowColor: "#000", elevation: 5 }}>
            <Text style={styles.valor}>{`R$ ${data.valor}`}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Historico;
