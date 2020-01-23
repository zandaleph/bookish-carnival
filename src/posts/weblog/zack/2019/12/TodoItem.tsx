import React, { useEffect, useRef } from 'react';
import { css } from '@emotion/core';

function todoItemOnKeyDown(
  dispatch: (action: any) => void
): React.KeyboardEventHandler<HTMLInputElement> {
  return e => {
    if (e.key === 'Enter') {
      dispatch({
        type: 'SPLIT_TODO',
        start: e.currentTarget.selectionStart,
        end: e.currentTarget.selectionEnd,
      });
    } else if (
      e.key === 'Backspace' &&
      e.currentTarget.selectionStart === 0 &&
      e.currentTarget.selectionEnd === 0
    ) {
      e.preventDefault();
      dispatch({
        type: 'MERGE_PREV_TODO',
      });
    } else if (
      e.key === 'Delete' &&
      e.currentTarget.selectionStart === e.currentTarget.value.length &&
      e.currentTarget.selectionEnd === e.currentTarget.value.length
    ) {
      e.preventDefault();
      dispatch({
        type: 'MERGE_NEXT_TODO',
      });
    }
  };
}

const checkboxCss = css`
  display: inline-flex;
  cursor: pointer;
  position: relative;
  vertical-align: middle;

  input {
    height: 25px;
    width: 25px;
    appearance: none;
    border: 1px solid black;
    border-radius: 4px;
    outline: none;
    transition-duration: 0.3s;
    background-color: white;
    cursor: pointer;
  }

  input:checked {
    &:after {
      content: '\\2713';
      display: block;
      text-align: center;
      color: black;
      position: absolute;
      left: 0.3rem;
      top: -0.15rem;
    }
  }

  input:active,
  input:focus {
    border: 2px solid black;
  }
`;

const textInputCss = css`
  border: none;
  background: transparent;
  font-size: 1.4rem;
  outline: none;
  width: 80%;
  vertical-align: middle;
  margin-left: 8px;
  border: 1px solid white;
  padding: 0.2rem;

  &:focus {
    border: 1px solid black;
  }
`;

export interface Todo {
  text: string;
  isDone?: boolean;
  focus?: number;
}

interface Props {
  todo: Todo;
  dispatch: (action: any) => void;
}

export default function TodoItem({ todo, dispatch }: Props) {
  const textInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (todo.focus != null && textInput.current != null) {
      textInput.current.focus();
      textInput.current.setSelectionRange(todo.focus, todo.focus);
      dispatch({
        type: 'SET_TODO',
        todo: { ...todo, focus: undefined },
      });
    }
  }, [todo, dispatch]);

  return (
    <li>
      <label css={checkboxCss}>
        <input
          type="checkbox"
          checked={todo.isDone ?? false}
          onChange={e =>
            dispatch({
              type: 'SET_TODO',
              todo: { ...todo, isDone: e.target.checked },
            })
          }
        />
      </label>
      <input
        type="text"
        ref={textInput}
        value={todo.text}
        onKeyDown={todoItemOnKeyDown(dispatch)}
        onChange={e =>
          dispatch({
            type: 'SET_TODO',
            todo: { ...todo, text: e.target.value },
          })
        }
        css={[
          textInputCss,
          todo.isDone === true && { textDecoration: 'line-through' },
        ]}
      />
    </li>
  );
}
