import React, { memo, useCallback } from 'react';
import styled from 'styled-components';

const TodoItem = styled.li`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;

	transition: all 0.5s;
  animation: appear 0.6s ease-in-out;
  @keyframes appear {
    0% {
      scale: 0.7;
    }
    50% {
      scale: 1.05;
    }
    100% {
      scale: 1;
    }
  }

	input[type="checkbox"] {
		display: none;
	}

	label {
		display: inline-block;
		width: 20px;
		height: 20px;
		border: 1px solid #000;
		border-radius: 5px;
		background-color: #fff;
		color: white;
		transition: all 0.5s;
		box-sizing: border-box;
		margin-right: 10px;
		text-align: center;

		&:hover {
			cursor: pointer;
		}
	}

	input[type="checkbox"]:checked + label {
		background-color: #5a5ada;
	}

	span {
		margin-right: 5px;
		font-size: 20px;
		transition: all 0.5s;

		display: block;
		width: 100%;
		border-radius: 5px;
		padding: 0 5px;

		&:hover {
			cursor: pointer;
			background-color: #89cf89;
		}
	}

	input[type="checkbox"]:checked + label + span {
		text-decoration: line-through;
		color: #333;

		&:hover {
			background-color: #aaa;
		}
	}
`

const Todo = memo(props => {
	const onTodoChange = useCallback(e => {
		const todo = document.querySelector(`#todo${props.number}`);
		const isChecked = e.currentTarget.checked;
		console.log(isChecked);

		let parent = null;
		if (isChecked) {
			parent = document.querySelector('#completedList');
			parent.appendChild(todo);
		} else {
			parent = document.querySelector('#processingList');
			parent.appendChild(todo);
		}

		console.log(parent);
	}, []);

	return (
		<TodoItem id={`todo${props.number}`}>
			<input id={`todoCheck${props.number}`} type="checkbox" onChange={onTodoChange} />
			<label htmlFor={`todoCheck${props.number}`}>V</label>
			<span>Hello</span>
		</TodoItem>
	);
});

export default Todo;