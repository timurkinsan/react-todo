
import react, { useEffect, useMemo } from 'react';
import './App.scss';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import styled from 'styled-components'

const TodoApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 1000px;
  min-height: 600px;
  background: #161a2b;
  text-align: center;
  margin: 128px auto;
  border-radius: 10px;
  padding-bottom: 32px;
`

function getCountersFromLocalStorage() {
  const item = localStorage.getItem('counters')
  if (item !== null) {
    return JSON.parse(item)
  }
  return {
    createdCount: 0,
    updatedCount: 0,
    deletedCount: 0
  }
}
console.log(localStorage);
function App() {
  const counters = useMemo(() => getCountersFromLocalStorage(), [])
  return (
    <TodoApp className="todo-app">
      <TodoList 
      createdCount={counters.createdCount}
      updatedCount={counters.updatedCount}
      deletedCount={counters.deletedCount}/>
    </TodoApp>
  );
}

export default App;
