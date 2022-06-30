import React, {useState, useEffect, useRef} from 'react'
import Example from './example'

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
        text: input 
    })
    setInput('');

  };
  return (
    <form className='todo-form' onSubmit={handleSubmit} autoComplete='off'>
        <input 
        type='text' 
        placeholder='Add a todo' 
        value={input}
        name='text' 
        className='todo-input'
        onChange={handleChange}
        ref={inputRef}
        /> 
    <button className='todo-button'>Add 
    todo</button>
    <br /> 
    <Example/>
    </form>
  )
}

export default TodoForm