import {useEffect, useState} from 'react'
import Todo, { colorRandom,  TodoItem } from './Todo';
import TodoForm from './TodoForm'
import styled from 'styled-components';
const TODOS_URL: string = 'https://gist.githubusercontent.com/alexandrtovmach/0c8a29b734075864727228c559fe9f96/raw/c4e4133c9658af4c4b3474475273b23b4a70b4af/todo-task.json'

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
  
function saveCountersToLocalStorage(counters:string): void {
  localStorage.setItem('counters', counters)
}

function saveTodosToLocalStorage(todos:string): void {
  localStorage.setItem('todos', todos)
}
interface TodoListProps {
  id: number
  createdCount: number,
  updatedCount: number,
  deletedCount: number

}


function TodoList(props:TodoListProps) {
    const [todos, setTodos] = useState<Array<TodoItem>>([])
    const [createdCount, setCreatedCount] = useState<number>(props.createdCount);
    const [updatedCount, setUpdatedCount] = useState<number>(props.updatedCount);
    const [deletedCount, setDeletedCount] = useState<number>(props.deletedCount);
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
        (response:Response) => response.json()
      // ).then(
      //   (rawData) => {
      //     console.log(rawData)
      //     return JSON.parse(rawData.text)}
      ).then(
        (data:Array<TodoItem>) => {
          console.log(data)

          
          setTodos((todos: Array<TodoItem>) => {
            const newTodos = data.filter((todo:TodoItem) => todos.findIndex((t:TodoItem) => t.id === todo.id) === -1)
            newTodos.forEach(
              (el) => { 
                el.color_1 = colorRandom()
                el.color_2 = colorRandom()
              }
            );
            setCreatedCount((createdCount) => createdCount + newTodos.length)
            return [...todos, ...newTodos] 
          }
          )


        })
    }, [])

  function addTodo(todo:TodoItem): void {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos:Array<TodoItem> = [todo, ...todos];

    console.log(newTodos);

    setTodos(newTodos);
    setCreatedCount(createdCount + 1);
    
  }


  const updateTodo = (todoId: number, newValue: TodoItem): void=> {
    if (!newValue.text|| /^\s*$/.test(newValue.text)) {
        return;
    }

    setTodos ((prev: Array<TodoItem>) => prev.map((item:TodoItem) => (item.id === todoId ? newValue : item)))
    setUpdatedCount(updatedCount + 1);
  }
  
  
  const removeTodo =  (id: number): void => {
    const removeArr = [...todos].filter((todo: TodoItem) => todo.id !== id);

    setTodos(removeArr);
    setDeletedCount(deletedCount + 1);
  }



  const completeTodo = (id: number): void => {
    let updatedTodos:Array<TodoItem> = todos.map((todo: TodoItem) => {
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