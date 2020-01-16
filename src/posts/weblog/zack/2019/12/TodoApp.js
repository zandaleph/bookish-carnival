import React, { useReducer } from 'react';
import { css } from '@emotion/core';
import TodoItem from './TodoItem';

function initTodos(initialTodos) {
  return initialTodos.map(e => ({ text: e }));
}

function mergeTodos(todos, idx) {
  if (idx < 0 || idx >= todos.length - 1) {
    return todos;
  }
  const newTodos = [...todos];
  const firstTodo = newTodos[idx];
  const secondTodo = newTodos[idx + 1];
  newTodos.splice(idx, 2, {
    ...firstTodo,
    text: firstTodo.text + secondTodo.text,
    focus: firstTodo.text.length,
  });
  return newTodos;
}

function todoReducer(todos, action) {
  const idx = action.index;
  switch (action.type) {
    case 'SET_TODO': {
      const newTodos = [...todos];
      newTodos[idx] = action.todo;
      return newTodos;
    }
    case 'SPLIT_TODO': {
      const newTodos = [...todos];
      const prevTodo = newTodos[idx];
      newTodos.splice(
        idx,
        1,
        { ...prevTodo, text: prevTodo.text.substring(0, action.start) },
        { text: prevTodo.text.substring(action.end), isDone: false, focus: 0 }
      );
      return newTodos;
    }
    case 'MERGE_PREV_TODO': {
      return mergeTodos(todos, idx - 1);
    }
    case 'MERGE_NEXT_TODO': {
      return mergeTodos(todos, idx);
    }
    case 'FOCUSED': {
      const newTodos = [...todos];
      newTodos[idx] = { ...newTodos[idx], focus: undefined };
      return newTodos;
    }
    default: {
      return todos;
    }
  }
}

const todoAppCss = css`
  margin: 1rem;
  border: 1px solid black;
  padding: 1rem;

  h1 {
    margin: 0;
  }
  ul {
    list-style-type: none;
    margin: 0;
    li {
      margin-bottom: 0;
    }
  }
`;

export default function TodoApp(props) {
  const { initialTodos } = props;
  const [todos, dispatch] = useReducer(todoReducer, initialTodos, initTodos);
  const todoItems = todos.map((todo, idx) => {
    return (
      <TodoItem
        todo={todo}
        key={idx.toString()}
        dispatch={action => dispatch({ ...action, index: idx })}
      />
    );
  });
  return (
    <div css={todoAppCss}>
      <h1>MY TODO LIST</h1>
      <ul>{todoItems}</ul>
    </div>
  );
}
