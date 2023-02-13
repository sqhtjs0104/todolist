import React, { memo, useCallback } from 'react';
import styled from 'styled-components';

const TodoItem = styled.li`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;

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
		color: green;
		transition: all 0.5s;
	}

	input[type="checkbox"]:checked + label + span {
		text-decoration: line-through;
		color: #333;
	}
`

const Todo = memo(props => {
	return (
		<TodoItem>
			<input id={`todoCheck${props.number}`} type="checkbox" />
			<label htmlFor={`todoCheck${props.number}`}>V</label>
			<span>Hello</span>
		</TodoItem>
	);
});

export default Todo;