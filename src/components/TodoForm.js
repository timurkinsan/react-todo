import React, {useState, useEffect, useRef} from 'react'
import Example from './example'
import TodoList from './TodoList'
import styled from 'styled-components'
import Todo, { colorRandom } from './Todo'

const StyledInput = styled.input`
  padding: 14px 39px 14px 16px;
  border-radius: 4px 0 0 4px;
  border: 2px solid #5d0cff;
  outline: none;
  width: 320px;
  background: transparent;
  color: #fff;
  ::placeholder {
    color: #e6d9d9;}
`

const StyledButton = styled.button`
  padding: 16px;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  outline: none;
  background: linear-gradient(
    90deg,
    rgba(93, 12, 255, 1) 0%,
    rgba(155, 0, 250, 1) 100%
  );
  color: white;
  text-transform: capitalize;
`
const Form = styled.form`
  margin-bottom: 32px;
`
// function saveColorsToLocalStorage (JSON.stringify(todos)) {
//   localStorage.setItem('Todos', props.onSubmit())
// }


function TodoForm(props) {
  const [input, setInput] = useState('');
  
  
  const inputRef = useRef (null) 
  useEffect (() => {
    inputRef.current.focus()
  })

  
  const handleChange = e => {
    setInput(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
        id: Math.floor(Math.random() * 10000),
        text: input,
        color_1: colorRandom(),
        color_2: colorRandom()
    })
    setInput('');
    function saveCountersToLocalStorage(Todo) {
      localStorage.setItem('todos', )
    }
  };
  return (
    <Form className='todo-form' onSubmit={handleSubmit} autoComplete='off'>
        <StyledInput 
        type='text' 
        placeholder='Add a todo' 
        value={input}
        name='text' 
        className='todo-input'
        onChange={handleChange}
        ref={inputRef}
        /> 
    <StyledButton className='todo-button'>Add 
    todo</StyledButton>
    <br /> 
    <Example/>
    </Form>
  )
}

export default TodoForm