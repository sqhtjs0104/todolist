import React, { memo, useCallback } from 'react';
import styled from 'styled-components';

const TodoItem = styled.li`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	padding: 8px 2px;
	border-bottom: 1px solid #aaa;

  animation: appear 0.3s ease-in-out;
  @keyframes appear {
    0% {
      transform: translate(0, 10px);
			opacity: 0.8;
    }
    100% {
      transform: translate(0, 0);
			opacity: 1;
    }
  }

	span {
		flex: 1;
		padding: 6px 2px 6px 8px;
		border-radius: 5px;

		transition: all 0.4s;
		
		&:hover {
			cursor: pointer;
			background-color: #edf8e6;
		}

		&:active {
			background-color: #adb9ad;
		}
	}

	button {
		width: 25px;
		height: 25px;
		font-size: 12px;
		border: none;
		border-radius: 50%;
		margin-left: 5px;
		color: #fff;

		transition: all 0.2s;

		&:hover {
			cursor: pointer;
			scale: 1.1;
		}

		&:active {
			scale: 1;
		}

		&:first-of-type {
      background-color: #cdcdf5;

      &:active {
        background-color: #7c7cf0;
      }
		}

		&:last-of-type {
      background-color: #fa9f9f;

      &:active {
      	background-color: #eb5858;
      }
		}
	}
`

const Todo = memo(props => {
	return (
		<TodoItem>
			<span>{props.content}</span>
			<button>V</button>
			<button>X</button>
		</TodoItem>
	);
});

export default Todo;