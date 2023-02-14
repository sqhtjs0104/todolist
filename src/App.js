import React, { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { cloneDeep, remove, find } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

import Todo from './components/Todo';
import TodoModal from './components/TodoModal';

const Main = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: 20px 10px;
  box-sizing: border-box;

  .title {
    font-size: 30px;
    margin: 0 auto 10px;
    color: #313186;
  }

  .adding {
    padding: 10px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    box-sizing: border-box;

    * {
      border-radius: 5px;
      font-size: 14px;
      padding: 8px;
    }

    input {
      margin-right: 10px;
      border: 2px solid #000;
      flex: 1;
    }

    button {
      border: none;
      background-color: #5a5ad4;
      color: white;
      padding: 8px 10px;
      font-weight: 600;

      &:disabled {
        background-color: #ccc;
      }

      &:not(:disabled):hover {
        cursor: pointer;
        scale: 1.1;
      }

      &:not(:disabled):active {
        scale: 1;
        background-color: #313186;
      }
    }
  }

  .list {
    flex: 1;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;

    ul {
      margin: 0;
      padding: 10px;
      list-style: none;
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;

      overflow-y: auto;

      ::-webkit-scrollbar {
        width: 20px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #a5a5a5;
        background-clip: padding-box;
        border: 8px solid #ffffff00;
        border-radius: 20px;
      }
      ::-webkit-scrollbar-track {
        background-color: none;
      }

      li {
        margin-bottom: 5px;
      }
    }
  }
`;

const test = [
  {
    title: "안녕하세요 1",
    description: null,
    deadline: null,
    checked: false,
  },
  {
    title: "안녕하세요 2",
    description: null,
    deadline: '2023-02-13',
    checked: false,
  },
  {
    title: "안녕하세요 3",
    description: null,
    deadline: '2023-02-17',
    checked: true,
  },
  {
    title: "안녕하세요 4",
    description: null,
    deadline: null,
    checked: false,
  },
  {
    title: "안녕하세요 5",
    description: null,
    deadline: null,
    checked: true,
  },
]

const App = memo(() => {
  /** 최초 Todo list 정보 불러오기 */
  // Todo 목록 저장할 state
  const [todos, setTodos] = useState([]);
  
  // Todo 적재(외부 데이터에서, 여기선 test)
  useEffect(() => {
    setTodos(test);
  }, []);
  
  /** 새 item 입력 및 추가 처리 */
  // 입력 input 내 값 저장할 state
  const [newTodoValue, setNewTodoValue] = useState(null);

  // input change시 안의 value로 state 덮어씀
  const onNewTodoChange = useCallback(e => {
    setNewTodoValue(e.currentTarget.value);
  }, []);

  // state 값이 바뀌면 새 값의 길이에 따라 추가 버튼 disabled 처리
  useEffect(() => {
    if (newTodoValue && newTodoValue.length > 0) {
      document.querySelector('.addBtn').disabled = false;
    } else {
      document.querySelector('.addBtn').disabled = true;
    }
  }, [newTodoValue])

  // 추가하기 누를 시 해당 값 todo list state(Todos)에 저장
  const onAddTodoClick = useCallback(e => {
    const json = {
      title: document.querySelector('#newTodo').value,
      checked: false
    };
    setTodos(state => {
      const temp = cloneDeep(state);
      temp.unshift(json);
      return temp;
    });
    document.querySelector('#newTodo').value = '';
  }, [newTodoValue]);

  /** Todo item 버튼 클릭 처리 */
  // 완료하기 누를시, Todos state의 해당 index item의 checked 값을 true로
  const onCompleteButtonClick = useCallback(e => {
    const index = e.currentTarget.dataset.index;
    setTodos(state => {
      const temp = cloneDeep(state);
      temp[index].checked = true;
      return temp;
    });
  }, []);

  // 다시 처리하기 누를 시 해당 index item의 checked false
  const onReprocessingButtonClick = useCallback(e => {
    const index = e.currentTarget.dataset.index;
    setTodos(state => {
      const temp = cloneDeep(state);
      temp[index].checked = false;
      return temp;
    });
  }, []);

  // 삭제하기 누를 시 해당 index item splice로 삭제
  const onDeleteButtonClick = useCallback(e => {
    const index = e.currentTarget.dataset.index;
    setTodos(state => {
      const temp = cloneDeep(state);
      temp.splice(index, 1);
      return temp;
    });
  }, []);

  /** 상세 Todo item madal 창 처리 */
  // 창 열림 여부 저장할 state
  const [isModalOpen, setIdModalOpen] = useState(false);
  // 현재 상세 todo의 번호를 저장할 state
  const [nowTodoIndex, setNowTodoIndex] = useState(null);

  // 모달을 열도록(state true로 변경) 할 함수
  const openModal = useCallback(e => {
    setIdModalOpen(true);
  }, []);

  // 모달을 닫도록(state false로 변경) 할 함수
  const closeModal = useCallback(e => {
    setIdModalOpen(false);
  }, []);

  return (
    <>
      <Main>
        <h1 className='title'>
          To Do&nbsp;<FontAwesomeIcon icon={faCheckSquare} />
        </h1>
        <div className='adding'> {/** 상단 제어 영역 */}
          <input type="text" id='newTodo' onChange={onNewTodoChange} />
          <button className='addBtn' onClick={onAddTodoClick}>Add</button>
        </div>

        <div className='list'>
          <ul className='processingList'> {/** 중단 현재 Todo list 영역 */}
            {
              todos.map((v, i) => {
                return (
                  <Todo
                    key={i}
                    index={i}
                    title={v.title}
                    checked={v.checked}
                    deadline={v.deadline}
                    complete={onCompleteButtonClick}
                    reprocessing={onReprocessingButtonClick}
                    delete={onDeleteButtonClick}
                    openModal={openModal}
                    setNowTodoIndex={setNowTodoIndex}
                  />
                )
              })
            }
          </ul>
        </div>
      </Main>

      {/* 각 Todo item 클릭 시 나올 상세보기 modal */}
      <TodoModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        nowTodo={todos[nowTodoIndex]}
        index={nowTodoIndex}
        setTodos={setTodos}
      />
    </>
  );
});

export default App;