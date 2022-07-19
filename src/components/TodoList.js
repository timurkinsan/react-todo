import React, {useEffect, useState} from 'react'
import Todo, { colorRandom } from './Todo';
import TodoForm from './TodoForm'
import styled from 'styled-components';
const TODOS_URL = 'https://gist.githubusercontent.com/alexandrtovmach/0c8a29b734075864727228c559fe9f96/raw/c4e4133c9658af4c4b3474475273b23b4a70b4af/todo-task.json'

const CreatedCount = styled.p`
    margin-top: 1%;
    display: flex;
    flex-direction:column;
    background: #161a2b;
    color:rgb(176, 207, 38);
  `
  const HeaderText = styled.h1`
    margin: 32px 0;
    color: rgb(187, 73, 73);
    font-size: 24px;
  `
  
function saveCountersToLocalStorage(counters) {
  localStorage.setItem('counters', counters)
}
function saveTodosToLocalStorage(todos) {
  localStorage.setItem('todos', todos)
}

function TodoList(props) {
    const [todos, setTodos] = useState([])
    const [createdCount, setCreatedCount] = useState(props.createdCount);
    const [updatedCount, setUpdatedCount] = useState(props.updatedCount);
    const [deletedCount, setDeletedCount] = useState(props.deletedCount);
    useEffect(() => {
      saveCountersToLocalStorage(JSON.stringify({
        createdCount: createdCount,
        updatedCount: updatedCount,
        deletedCount: deletedCount
      }))
    }, [createdCount, updatedCount, deletedCount])
    
    useEffect(() => {
      saveTodosToLocalStorage(JSON.stringify(todos))
      console.log(todos)
    }, [todos])
   
    useEffect(() => {
      fetch(TODOS_URL).then(
        (response) => response.json()
      // ).then(
      //   (rawData) => {
      //     console.log(rawData)
      //     return JSON.parse(rawData.text)}
      ).then(
        (data) => {
          console.log(data)

          const newTodos = data.filter((todo) => todos.findIndex((t) => t.id === todo.id) === -1)
          newTodos.forEach(
            (el) => { 
              el.color_1 = colorRandom()
              el.color_2 = colorRandom()
            }
          );
          setTodos((todos) => [...todos, ...newTodos])
          setCreatedCount((createdCount) => createdCount + newTodos.length)

        })
    }, [])

  function addTodo(todo) {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];

    console.log(newTodos);

    setTodos(newTodos);
    setCreatedCount(createdCount + 1);
    
  }


  const updateTodo = (todoId, newValue) => {
    if (!newValue.text|| /^\s*$/.test(newValue.text)) {
        return;
    }

    setTodos (prev => prev.map(item => (item.id === todoId ? newValue : item)))
    setUpdatedCount(updatedCount + 1);
  }
  
  
  const removeTodo =  id => {
    const removeArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removeArr);
    setDeletedCount(deletedCount + 1);
  }



  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
        if (todo.id === id) {
            todo.isComplete = !todo.isComplete;
        }
        return todo;
    })
    setTodos(updatedTodos);
  }
    return (
    <div>
    <CreatedCount className='created-count'>Created Count {createdCount}</CreatedCount>
    <CreatedCount className='created-count'>Updated Count {updatedCount}</CreatedCount>
    <CreatedCount className='created-count'>Deleted Count {deletedCount}</CreatedCount>  
    <HeaderText>Todo list</HeaderText>

    <TodoForm onSubmit={addTodo} />

    <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo ={updateTodo}/>
    
    </div>
  )
}

export default TodoList