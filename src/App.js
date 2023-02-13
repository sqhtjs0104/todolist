import React, { memo } from 'react';
import styled from 'styled-components';

import Todo from './components/Todo';

const Main = styled.div`
  width: 100%;
  height: 100%;

  padding: 10px;
  box-sizing: border-box;

  display: flex;
  flex-flow: column nowrap;

  .title {
    font-size: 30px;
    margin: auto;
  }

  .adding {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    * {
      border-radius: 5px;
      font-size: 14px;
      padding: 8px;
    }

    input {
      margin-right: 10px;
      border: 2px solid #000;
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
  
  fieldset {
    border: 2px solid #555;
    border-radius: 10px;
    margin-top: 10px;

    legend {
      font-size: 16px;
      padding: 0px 5px;
      color: #333;
    }

    ul {
      padding: 10px;
      margin: 0;
      list-style: none;

      li {
        margin-bottom: 5px;
      }
    }
  }

  .processing {
  }

  .completed {
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

      <div>
        <fieldset className='processing'>
          <legend>Processing</legend>
          <ul> {/** 중단 현재 Todo list 영역 */}
            <Todo number={1} />
            <Todo number={2} />
            <Todo number={3} />
          </ul>
        </fieldset>
        <fieldset className='completed'>
          <legend>Completed</legend>
          <ul> {/** 하단 완료한 Todo list 영역 */}
            <Todo number={4} />
            <Todo number={5} />
          </ul>
        </fieldset>
      </div>
    </Main>
  );
});

export default App;