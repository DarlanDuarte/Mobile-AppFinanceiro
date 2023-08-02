import React from "react";
import { Picker as RNPicker } from "@react-native-picker/picker";
import { Text, View, StyleSheet } from "react-native";

interface IPickerProps {
  onChange: React.Dispatch<React.SetStateAction<string>>;
  tipo: string;
}

const Picker: React.FC<IPickerProps> = ({ onChange, tipo }) => {
  return (
    <View style={styles.container}>
      <RNPicker
        style={{
          width: "100%",
          backgroundColor: "#f7f1f1",
        }}
        selectedValue={tipo}
        onValueChange={(valor) => onChange(valor)}
      >
        <RNPicker.Item label={"Receita"} value={"receita"} />
        <RNPicker.Item label={"Despesa"} value={"despesa"} />
      </RNPicker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    width: "80%",
    marginTop: 15,
    borderRadius: 5,
  },
});

export default Picker;
