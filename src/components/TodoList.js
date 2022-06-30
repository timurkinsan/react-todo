import React, {useEffect, useState} from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'

function saveCountersToLocalStorage(counters) {
  localStorage.setItem('counters', counters)
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


  const addTodo = todo => {
     if (!todo.text|| /^\s*$/.test(todo.text)) {
      return;
     }
     const newTodos = [todo, ...todos];

     console.log(newTodos);
     
     setTodos(newTodos);
     setCreatedCount(createdCount + 1)
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
    <p>Created Count {createdCount}</p>
    <p>Updated Count {updatedCount}</p>
    <p>Deleted Count {deletedCount}</p>  
    <h1>Записки красной туфельки</h1>

    <TodoForm onSubmit={addTodo} />
    <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo ={updateTodo}/>
    </div>
  )
}

export default TodoList