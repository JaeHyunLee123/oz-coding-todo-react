/* eslint-disable react/prop-types */
//@ts-check

import { useState } from "react";
import "./App.css";

/**
 * @typedef {Object} Todo
 * @property {number} id
 * @property {string} content
 * @property {boolean} isComplete
 */

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", isComplete: false },
    { id: 1, content: "코딩 공부하기", isComplete: false },
    { id: 2, content: "잠 자기", isComplete: false },
  ]);

  return (
    <>
      <h1>Oz TODO React</h1>

      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
      <h3>&copy; 이재현</h3>
    </>
  );
}

/**
 * @typedef {Object} TodoInputProps
 * @property {Array<Todo>} todoList
 * @property {Function} setTodoList
 */

/**
 *
 * @param {TodoInputProps} props
 */
function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="todo-input">
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </div>
  );
}

/**
 * @typedef {Object} TodoListProps
 * @property {Array<Todo>} todoList
 * @property {Function} setTodoList
 */

/**
 *
 * @param {TodoListProps} props
 * @returns
 */
function TodoList({ todoList, setTodoList }) {
  return (
    <ul className="todo-list">
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

/**
 * @typedef {Object} TodoProps
 * @property {Todo} todo
 * @property {Function} setTodoList
 */

/**
 *
 * @param {TodoProps} props
 * @returns
 */
function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const [isModifyStatus, setIsModifyStatus] = useState(false);

  return (
    <li className={`todo-list__todo `}>
      <input
        className="todo__complete-checkbox"
        type="checkbox"
        checked={todo.isComplete}
        onClick={() => {
          setTodoList((prev) =>
            prev.map((el) =>
              el.id === todo.id ? { ...el, isComplete: !todo.isComplete } : el
            )
          );
        }}
      ></input>
      <span
        className={`todo__content ${
          todo.isComplete ? "todo__content--complete" : ""
        }`}
      >
        {todo.content}
      </span>

      {isModifyStatus ? (
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      ) : null}

      <button
        className="todo__button todo__button--modify"
        onClick={() => {
          if (isModifyStatus) {
            setTodoList((prev) =>
              prev.map((el) =>
                el.id === todo.id ? { ...el, content: inputValue } : el
              )
            );
            setIsModifyStatus(false);
          } else {
            setIsModifyStatus(true);
          }
        }}
      >
        수정
      </button>
      <button
        className="todo__button todo__button--remove"
        onClick={() => {
          setTodoList((prev) => {
            return prev.filter((el) => el.id !== todo.id);
          });
        }}
      >
        삭제
      </button>
    </li>
  );
}

export default App;
