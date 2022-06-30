
import react, { useEffect, useMemo } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

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

function App() {
  const counters = useMemo(() => getCountersFromLocalStorage(), [])
  return (
    <div className="todo-app">
      <TodoList 
      createdCount={counters.createdCount}
      updatedCount={counters.updatedCount}
      deletedCount={counters.deletedCount}/>
    </div>
  );
}

export default App;
