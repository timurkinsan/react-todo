import React, {useState} from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import {RiCloseCircleLine} from 'react-icons/ri';
import {TiEdit} from 'react-icons/ti';
import styled, { css } from 'styled-components'

interface TodoRowProps{
    color?: string,
    color1?: string,
    color2?: string,

}
const TodoRow = styled.div`
display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4px auto;
    color: #fff;
    background: linear-gradient(
      90deg,
      ${(props: TodoRowProps) =>props.color1 } 0%,
      ${(props: TodoRowProps) =>props.color2 } 100%
    // background: ${(props: TodoRowProps) =>props.color }
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
export function colorRandom (): string {
    const r: number = Math.floor(Math.random()*255)
    const g: number = Math.floor(Math.random()*255)
    const b: number = Math.floor(Math.random()*255)
  
    return `rgb(${r}, ${g}, ${b})`
  
  }
export interface TodoItem {
    id: number,
    text: string,
    isComplete: boolean,
    color_1?: string,
    color_2?: string
  }
export interface EditObject {
    id: number | null,
    value: string,
}
interface TodoProps {
    todos: Array<TodoItem>
    completeTodo: (id: number) => void,
    removeTodo: (id: number) => void,
    updateTodo: (id: number, value: TodoItem) => void

}


function Todo({todos, completeTodo, removeTodo, updateTodo} :TodoProps) {
    const [edit, setEdit] = useState<EditObject>({
        id: null,
        value: ''
      
    })
    const submitUpdate = (value: TodoItem): void => {
        updateTodo(edit.id, value)
        setEdit ({
            id: null,
            value: ''
            
        })
    }
    if (edit.id) {
        return <TodoForm edit={edit} onSubmit = {submitUpdate} />
    }
  
  
    return(
        <> 
        {todos.map((todo:TodoItem, index: number) => (
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
            ))}
        </>)
}

export default Todo
