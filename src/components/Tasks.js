import React from 'react'
import Task from './Task'
 
 const Tasks = ({ task,onDelete,onToggle }) =>{
  return( //map function creates a list....
    <>
    { task.map( (task) =>(
      <Task key={ task.id } task={ task } onDelete={ onDelete } onToggle={onToggle}/>))}
    </>
  )
 }
 
 export default Tasks