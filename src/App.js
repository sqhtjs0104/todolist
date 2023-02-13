import React, { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { cloneDeep, remove, find } from 'lodash';

import Todo from './components/Todo';

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

      &:hover {
        cursor: pointer;
        scale: 1.1;
      }

      &:active {
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
    id: 1,
    content: "안녕하세요 1",
    checked: false,
  },
  {
    id: 2,
    content: "안녕하세요 2",
    checked: false,
  },
  {
    id: 3,
    content: "안녕하세요 3",
    checked: true,
  },
  {
    id: 4,
    content: "안녕하세요 4",
    checked: false,
  },
  {
    id: 5,
    content: "안녕하세요 5",
    checked: true,
  },
]

const App = memo(() => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const temp = [];
    for (let i = test.length - 1; i >= 0; i--) {
      temp.push(test[i]);
    }
    setTodos(temp);
  }, []);
  
  const [newTodoValue, setNewTodoValue] = useState(null);

  const onNewTodoChange = useCallback(e => {
    setNewTodoValue(e.currentTarget.value);
  }, []);

  const onTodoChange = useCallback(e => {
    const id = parseInt(e.currentTarget.dataset.id);

    setTodos(state => {
      const temp = cloneDeep(state);
      const item = remove(temp, {id: id})[0];
      item.checked = !item.checked;
      temp.unshift(item);
      return temp;
    });
  }, []);
  
  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <Main>
      <h1 className='title'>To Do List</h1>
      <div className='adding'> {/** 상단 제어 영역 */}
        <input type="text" id='newTodo' onChange={onNewTodoChange} />
        <button>Add</button>
      </div>

      <div className='list'>
        <ul className='processingList'> {/** 중단 현재 Todo list 영역 */}
          {
            todos.map((v, i) => {
              if (!v.checked) {
                return (
                  <Todo
                    key={i}
                    content={v.content}
                    id={v.id}
                    onTodoChange={onTodoChange}
                  />
                )
              } else return '';
            })
          }
        </ul>
      </div>
    </Main>
  );
});

export default App;