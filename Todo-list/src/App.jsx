import { createEffect, createSignal } from "solid-js";
import { styled } from "solid-styled-components";
import "./index.css";

const TodoText = styled("span")`
  margin-left: 15px;
  // text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  // color: ${(props) => (props.completed ? "#999" : "#333")};
`;

function App() {
  const [todos, setTodos] = createSignal([]);
  const [newTodo, setNewTodo] = createSignal("");
  const [showCompleted, setShowCompleted] = createSignal(false);

  function addTodo() {
    if (newTodo()) {
      setTodos([...todos(), { text: newTodo(), completed: false }]);
      setNewTodo("");
    }
  }

  function toggleCompleted(todoIndex) {
    setTodos(
      todos().map((todo, index) =>
        index === todoIndex ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function removeTodo(todoIndex) {
    setTodos(todos().filter((todo, index) => index !== todoIndex));
  }
  const updateTodo = (index, updatedTodo) => {
    const newTodoss = todos();
    newTodoss[index].text = updatedTodo;
    setTodos(newTodoss);
  };
  createEffect(() => {
    console.log("todos", JSON.stringify(todos()));
    console.log("newTodo", newTodo());
    console.log("showCompleted", showCompleted());
  });
  console.log(todos().map((todo, index) => todo.completed.length));
  return (
    <div class="container">
      <div class="wrapper">
        <div>
          <h1 class="heading">Todo List</h1>
          <div class="inputStyle">
            <input
              class="inputFieldStyle"
              type="text"
              value={newTodo()}
              onInput={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
            />
          </div>
          <div class="groupButton">
            <button onClick={addTodo} class="addBtn buttonStyle">
              Add Todo
            </button>

            <button
              onClick={() => setShowCompleted(!showCompleted())}
              class="completebtn buttonStyle"
            >
              {showCompleted() ? `Hide Completed List` : `Show Completed List`}
            </button>
          </div>
        </div>
        <div class="containerForlist">
          {todos().map((todo, index) => {
            if (!showCompleted() && todo.completed) return null;
            return (
              <div key={index} class="listItemStyle">
                <div style={{ width: "80%" }}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onInput={() => toggleCompleted(index)}
                  />
                  {!todo.completed && (
                    <input
                      type="text"
                      class="inputShowStyle"
                      value={todo.text}
                      onInput={(e) => updateTodo(index, e.target.value)}
                    />
                  )}
                  {todo.completed === true && (
                    <TodoText completed={todo.completed}>{todo.text}</TodoText>
                  )}
                </div>
                <div>
                  <button onClick={() => removeTodo(index)} class="removebtn">
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
