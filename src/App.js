import React, { memo } from 'react';
import styled from 'styled-components';

import Todo from './components/Todo';

const App = memo(() => {
  return (
    <>
      <h1>To Do List</h1>
      <div> {/** 상단 제어 영역 */}
        <form>
          <input type="text" />
          <button type='submit'>Add</button>
        </form>
      </div>

      <div>
        <fieldset>
          <legend>To Do</legend>
          <ul> {/** 중단 현재 Todo list 영역 */}
            <Todo />
          </ul>
        </fieldset>
        <fieldset>
          <legend>Completed</legend>
          <ul> {/** 하단 완료한 Todo list 영역 */}
            <Todo />
          </ul>
        </fieldset>
      </div>
    </>
  );
});

export default App;