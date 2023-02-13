import React, { memo } from 'react';
import styled from 'styled-components';

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
  }
  
  fieldset {
    border: 2px solid #555;
    border-radius: 10px;
    height: 45%;

    legend {
      font-size: 16px;
      padding: 0px 5px;
      color: #333;
    }

    ul {
      padding: 10px;
      margin: 0;
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
`

const App = memo(() => {
  return (
    <Main>
      <h1 className='title'>To Do List</h1>
      <div className='adding'> {/** 상단 제어 영역 */}
        <input type="text" />
        <button>Add</button>
      </div>

      <div className='list'>
        <fieldset className='processing'>
          <legend>Processing</legend>
          <ul id='processingList'> {/** 중단 현재 Todo list 영역 */}
            <Todo number={1} />
            <Todo number={2} />
            <Todo number={3} />
            <Todo number={4} />
            <Todo number={5} />
            <Todo number={6} />
            <Todo number={7} />
            <Todo number={8} />
            <Todo number={9} />
          </ul>
        </fieldset>
        <fieldset className='completed'>
          <legend>Completed</legend>
          <ul id='completedList'> {/** 하단 완료한 Todo list 영역 */}
          </ul>
        </fieldset>
      </div>
    </Main>
  );
});

export default App;