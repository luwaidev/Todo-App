import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import TodoItem from "./src/components/TodoItem";

const windowHeight = Dimensions.get("window").height;

export default function App() {
  var currentTodo = 0;
  const [todos, setTodos] = useState([[]]);
  const [text, onChangeText] = React.useState("Useless Text");

  function handleCheck(id) {
    console.log("Checked");
    const newTodos = [...todos];
    console.log(newTodos);
    const todo = newTodos[currentTodo].find((todo) => todo.key == id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  function handleAddTodo() {
    if (text != "") {
      const newTodos = [...todos];
      newTodos[currentTodo] = [
        ...newTodos[currentTodo],
        { key: Date.now(), name: text, completed: false },
      ];

      setTodos(newTodos);
      console.log(todos);
      onChangeText("");
    }
  }

  function handleRemoveCompletedTodos() {
    console.log("Remove Todos");

    const newTodos = [...todos];
    newTodos[currentTodo] = todos[currentTodo].filter((todo) => {
      return !todo.completed;
    });
    setTodos(newTodos);
  }

  function switchCurrentTodo() {
    console.log("pressed");
  }

  return (
    <View style={styles.container}>
      {/* List */}
      <ScrollView style={styles.todoList}>
        <View style={{ height: "100%" }}>
          {todos[currentTodo].map((todo) => (
            <TodoItem
              key={todo.key}
              text={todo.name}
              handleCheck={handleCheck}
              id={todo.key}
            />
          ))}
        </View>
      </ScrollView>

      {/* Footer input section */}
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.footerInput}
          onChangeText={onChangeText}
          placeholder="To do"
          value={text}
        />

        {/* Add Todo Button */}
        <View style={styles.footerButton}>
          <TouchableOpacity onPress={handleAddTodo}>
            <Icon
              name="add"
              style={styles.footerButtonIcon}
              color={"#404040"}
              reverse
            />
          </TouchableOpacity>
        </View>

        {/* Remove Completed Todos Button */}
        <View style={(styles.footerButton, { marginRight: 0 })}>
          <TouchableOpacity onPress={handleRemoveCompletedTodos}>
            <Icon
              name="delete"
              style={styles.footerButtonIcon}
              color={"#404040"}
              reverse
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  todoList: {
    marginTop: 50,
    width: "95%",
    height: 1000,
    overflow: "visible",
  },
  // Footer styles
  footerContainer: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    width: "95%",
    borderRadius: 10,
    position: "absolute",
    bottom: 10,
  },
  footerButton: {
    justifyContent: "center",
    alignItems: "stretch",
    alignSelf: "stretch",
    overflow: "hidden",
    borderRadius: 50,
    margin: -5,
  },
  footerButtonIcon: {
    height: 30,
    width: 30,
    color: "#7d7d7d",
  },
  footerInput: {
    flex: 1,
    height: 50,
    margin: 10,
    borderWidth: 1,
    borderColor: "#7d7d7d",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
