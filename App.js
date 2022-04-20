import React, { useState } from "react";
import {
  StatusBar,
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
import Swipeout from "react-native-swipeout";

const windowHeight = Dimensions.get("window").height;

export default function App() {
  var currentTodo = 0;
  const [todos, setTodos] = useState([[]]);
  const [text, onChangeText] = useState("");
  const [todoTitles, onChangeTitle] = useState("Title");
  const titles = [todoTitles];

  function handleChangeTitle(text) {
    onChangeTitle(text);
    titles[currentTodo] = text;
  }

  function handleCheck(id) {
    console.log("Checked");
    const newTodos = [...todos];
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
  // Buttons
  var swipeoutBtns = [
    {
      text: "Button",
    },
  ];
  return (
    <View style={styles.container}>
      {/* Menu */}
      {/* <View></View> */}

      {/* Main Items */}
      <View style={styles.container}>
        {/* Title */}
        <TextInput
          style={styles.title}
          onChangeText={handleChangeTitle}
          placeholder="Title"
          value={todoTitles}
        />

        <View
          style={{
            backgroundColor: "black",
            width: "95%",
            height: 2,
            alignSelf: "center",
            marginTop: 5,
          }}
        ></View>

        <Swipeout right={swipeoutBtns} autoClose={true}>
          <View>
            <Text>Swipe me left</Text>
          </View>
        </Swipeout>

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

        <View style={{ backgroundColor: "white", height: 69 }}></View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todoList: {
    marginTop: 10,
    width: "95%",
    flex: 1,
    // overflow: "visible",
    marginLeft: "2.5%",
  },
  title: {
    marginTop: StatusBar.currentHeight + 10,
    alignSelf: "stretch",
    fontSize: 32,
    fontFamily: "monospace",
    textAlign: "center",
  },
  // Footer styles
  footerContainer: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    width: "95%",
    borderRadius: 10,
    position: "absolute",
    bottom: 10,
    marginLeft: "2.5%",
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
    fontFamily: "monospace",
  },
});
