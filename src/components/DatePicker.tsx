import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";

interface IDatePickerProps {
  onClose: () => void;
  onChange: (currentDate: Date) => void;
  date: Date;
}

const DatePicker: React.FC<IDatePickerProps> = ({
  onChange,
  onClose,
  date,
}) => {
  const [dateNow, setDateNow] = useState(new Date(date));

  return (
    <TouchableOpacity style={styles.container}>
      {Platform.OS === "ios" && (
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text> Fechar </Text>
          </TouchableOpacity>
        </View>
      )}
      <DateTimePicker
        style={{ backgroundColor: "#fff" }}
        value={dateNow}
        mode={"date"}
        display={"default"}
        themeVariant="light"
        onChange={(event, date) => {
          const currentDate: Date = date || dateNow;
          setDateNow(currentDate);
          onChange(currentDate);
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    justifyContent: "flex-end",
  },
  header: {
    width: "100%",
    padding: 12,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#222",
  },
});

export default DatePicker;
