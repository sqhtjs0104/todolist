import React, { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { cloneDeep } from 'lodash';
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

    @media screen and (max-width: 450px) {
      margin: 20px auto 10px;
    }
  }

  .adding {
    padding: 10px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    box-sizing: border-box;
    position: relative;

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

    @media screen and (max-width: 450px) {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 70px;
      padding-bottom: 20px;
      background-color: #fff;
      border-top: 1px solid #aaa;
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
    overflow-y: hidden;

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

      @media screen and (max-width: 450px) {
        padding-bottom: 50px;
      }
    }
  }
`;

const App = memo(() => {
  /** ?????? Todo list ?????? ???????????? */
  // Todo ?????? ????????? state
  const [todos, setTodos] = useState([]);
  
  // localStorage?????? ????????? state??? ??????
  useEffect(() => {
    const data = localStorage.getItem('TodoList');
    if (!data) {
      return
    }
    setTodos(JSON.parse(data));
  }, []);
  
  /** ??? item ?????? ??? ?????? ?????? */
  // ?????? input ??? ??? ????????? state
  const [newTodoValue, setNewTodoValue] = useState(null);

  // input change??? ?????? value??? state ?????????
  const onNewTodoChange = useCallback(e => {
    setNewTodoValue(e.currentTarget.value);
  }, []);

  // state ?????? ????????? ??? ?????? ????????? ?????? ?????? ?????? disabled ??????
  useEffect(() => {
    if (newTodoValue && newTodoValue.length > 0) {
      document.querySelector('.addBtn').disabled = false;
    } else {
      document.querySelector('.addBtn').disabled = true;
    }
  }, [newTodoValue])

  // ???????????? ?????? ??? ?????? ??? todo list state(Todos)??? ??????
  const onAddTodoClick = useCallback(e => {
    const json = {
      title: document.querySelector('#newTodo').value,
      description: null,
      deadline: null,
      checked: false
    };
    setTodos(state => {
      const temp = cloneDeep(state);
      temp.unshift(json);
      return temp;
    });
    document.querySelector('#newTodo').value = '';
  }, [newTodoValue]);

  /** Todo item ?????? ?????? ?????? */
  // ???????????? ?????????, Todos state??? ?????? index item??? checked ?????? true???
  const onCompleteButtonClick = useCallback(e => {
    const index = e.currentTarget.dataset.index;
    setTodos(state => {
      const temp = cloneDeep(state);
      temp[index].checked = true;
      return temp;
    });
  }, []);

  // ?????? ???????????? ?????? ??? ?????? index item??? checked false
  const onReprocessingButtonClick = useCallback(e => {
    const index = e.currentTarget.dataset.index;
    setTodos(state => {
      const temp = cloneDeep(state);
      temp[index].checked = false;
      return temp;
    });
  }, []);

  // ???????????? ?????? ??? ?????? index item splice??? ??????
  const onDeleteButtonClick = useCallback(e => {
    const index = e.currentTarget.dataset.index;
    setTodos(state => {
      const temp = cloneDeep(state);
      temp.splice(index, 1);
      return temp;
    });
  }, []);

  /** ?????? Todo item madal ??? ?????? */
  // ??? ?????? ?????? ????????? state
  const [isModalOpen, setIdModalOpen] = useState(false);
  // ?????? ?????? todo??? ????????? ????????? state
  const [nowTodoIndex, setNowTodoIndex] = useState(null);

  // ????????? ?????????(state true??? ??????) ??? ??????
  const openModal = useCallback(e => {
    setIdModalOpen(true);
  }, []);

  // ????????? ?????????(state false??? ??????) ??? ??????
  const closeModal = useCallback(e => {
    setIdModalOpen(false);
  }, []);

  /** ?????? todo ?????? ????????? localStorage ????????? */
  useEffect(() => {
    localStorage.setItem('TodoList', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Main>
        <h1 className='title'>
          To Do&nbsp;<FontAwesomeIcon icon={faCheckSquare} />
        </h1>
        <div className='adding'> {/** ?????? ?????? ?????? */}
          <input type="text" id='newTodo' onChange={onNewTodoChange} />
          <button className='addBtn' onClick={onAddTodoClick}>Add</button>
        </div>

        <div className='list'>
          <ul className='processingList'> {/** ?????? ?????? Todo list ?????? */}
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

      {/* ??? Todo item ?????? ??? ?????? ???????????? modal */}
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