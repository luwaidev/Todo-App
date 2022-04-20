import React, { useRef, useEffect } from "react";
import {
  Keyboard,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function TodoItem({ text, completed, handleCheck, id }) {
  const translation = useRef(
    new Animated.Value(Dimensions.get("window").height - 200)
  ).current;

  useEffect(() => {
    Animated.timing(translation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const styles = StyleSheet.create({
    todoView: {
      flexDirection: "row",
      // backgroundColor: "#bdbdbd",
      height: 50,
      width: "100%",
      marginBottom: 1,
      paddingLeft: 10,
      transform: [{ translateY: translation }],
    },
  });
  return (
    <Animated.View style={styles.todoView}>
      <BouncyCheckbox
        key={id}
        onPress={(isChecked) => {
          completed = isChecked;
          handleCheck(id);
        }}
        fillColor="#bdbdbd"
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: "bdbdbd" }}
        textStyle={{ color: "black", fontFamily: "monospace" }}
        text={text}
      />
    </Animated.View>
  );
}
