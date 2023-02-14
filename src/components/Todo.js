import React, { memo, useCallback } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faArrowRotateLeft, faXmark } from '@fortawesome/free-solid-svg-icons';

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
		font-size: 14px;
		font-weight: 600;

		transition: all 0.6s;

		&:hover {
			cursor: pointer;
			background-color: #e5e5e5;
		}

		&:active {
			background-color: #ccc;
		}

		&.todo__completed {
			color: #aaa;
			text-decoration-line: line-through;
		}
	}

	button {
		width: 25px;
		height: 25px;
		font-size: 12px;
		font-weight: 600;
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
      background-color: #98b1a3;

      &:active {
        background-color: #437e61;
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
	const onTodoClick = useCallback(e => {
		props.setNowTodoIndex(e.currentTarget.dataset.index);
		props.openModal();
	}, [props]);

	return (
		<TodoItem>
			{
				props.checked ? (
					<>
						<span className='todo__completed' data-index={props.index} onClick={onTodoClick}>{props.title}</span>
						<button data-index={props.index} onClick={props.reprocessing}>
							<FontAwesomeIcon icon={faArrowRotateLeft} />
						</button>
					</>
				) : (
					<>
						<span data-index={props.index} onClick={onTodoClick}>{props.title}</span>
						<button data-index={props.index} onClick={props.complete}>
							<FontAwesomeIcon icon={faCheck} />
						</button>
					</>
				)
			}
			<button data-index={props.index} onClick={props.delete}>
				<FontAwesomeIcon icon={faXmark} />
			</button>
		</TodoItem>
	);
});

export default Todo;