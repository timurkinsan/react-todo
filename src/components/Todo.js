import React, {useState} from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import {RiCloseCircleLine} from 'react-icons/ri';
import {TiEdit} from 'react-icons/ti';
import styled, { css } from 'styled-components'


const TodoRow = styled.div`
display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4px auto;
    color: #fff;
    background: linear-gradient(
      90deg,
      ${props =>props.color1 } 0%,
      ${props =>props.color2 } 100%
    // background: ${props =>props.color }
    );
  
    padding: 16px;
    border-radius: 5px;
    width: 90%;
`
const Icons = styled.div`
    display: flex;
    align-items: center;
    font-size: 24px;
    cursor: pointer; 
     
`
const DeleteIcon = styled(RiCloseCircleLine)`
    margin-right: 5px;
    color: rgb(22, 20, 20);
`

const TiEditIcon = styled(TiEdit)`
    margin-right: 5px;
    color: rgb(97, 37, 10);
`
export function  colorRandom () {
    const r = Math.floor(Math.random()*255)
    const g = Math.floor(Math.random()*255)
    const b = Math.floor(Math.random()*255)
  
    return `rgb(${r}, ${g}, ${b})`
  
  }

function Todo({todos, completeTodo, removeTodo, updateTodo} ) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
      
    })
    const submitUpdate = value => {
        updateTodo (edit.id, value)
        setEdit ({
            id: null,
            value: ''
            
        })
    }
    if (edit.id) {
        return <TodoForm edit = {edit} onSubmit = {submitUpdate} />
    }
  
  
    return todos.map((todo, index) => (
    <TodoRow  color1 = {todo.color_1} color2 = {todo.color_2} className={todo.isComplete ? 'todo-row-complete': 'todo-row'} key={index}
    >
        <div key={todo.id} onClick={() => completeTodo(todo.id)} >
            {todo.text} 
        </div>
        <div>
        <Icons className= 'icons'></Icons>
        <DeleteIcon 
        onClick={() => removeTodo(todo.id)}
        className='delete-icon'/>
        <TiEditIcon 
         onClick={() => setEdit({id: todo.id, value: todo.text})}
         className='edit-icon'/>
        </div>
        
    </TodoRow>
  ))
}

export default Todo
