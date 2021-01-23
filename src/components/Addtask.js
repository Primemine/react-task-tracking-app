import React from 'react'
import { useState } from 'react'

const AddTask = ({ onAdd }) =>{
  
  const [text,setText] = useState()
  const [day,setDay] = useState()
  const [remainder,setRemainder] = useState(false)
  
  const onSending = (e) =>{
    e.preventDefault()
    
    //validation
    if(!text){
      alert('Enter the task....')
      return
    }
    onAdd({text,day,remainder})
    
    setRemainder(false)
    setDay('')
    setText('')
  }
  return(
    <form className='add-form' onSubmit={ onSending }>
      <div className='form-control'>
        <label>Task</label>
        <input type='text' placeholder='Add Task' value={text} onChange={ (e) => setText(e.target.value)} />
      </div>
      <div className='form-control'>
        <label>Time & Date</label>
        <input type='text' placeholder='Add Time and Date' value={ day } onChange={ (e)=>setDay(e.target.value)}/>
      </div>
      <div className='form-control form-control-check'>
        <label>Remainder</label>
        <input type='checkbox'  checked={remainder} value={remainder} onChange={ (e) =>setRemainder(e.currentTarget.checked)}/>
      </div>
      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddTask