import React, { useReducer, Reducer } from 'react';
import { css } from '@emotion/core';
import TodoItem, { Todo } from './TodoItem';

function initTodos(initialTodos: string[]): Todo[] {
  const todos = initialTodos != null ? initialTodos : ['Make a Todo'];
  return todos.map(e => ({ text: e }));
}

function mergeTodos(todos: Todo[], idx: number): Todo[] {
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

// TODO: fix type of action.
function todoReducer(todos: Todo[], action: any): Todo[] {
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

interface Props {
  initialTodos: string[];
}

export default function TodoApp({ initialTodos }: Props) {
  const [todos, dispatch] = useReducer<Reducer<Todo[], any>, string[]>(
    todoReducer,
    initialTodos,
    initTodos
  );
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
