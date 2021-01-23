import Header from './components/Header'
import Tasks from './components/Tasks'
import React, { useState ,useEffect} from 'react'
import AddTask from './components/Addtask'

function App() {
  const [showAddTask,setAddTask] = useState(true)
  const [tasks,setTask] = useState([])
  
  useEffect( ()=>{
    const getTaskFromServer = async () =>{
      const taskFromServer = await fetchTask()
      setTask(taskFromServer)
    }
    
    getTaskFromServer()
  },[])
  
  //Fetching data from the database....
  const fetchTask = async () =>{
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json() //converting the res data from the database into json format
    return data
  }
  
  
  const fetchSingleTask = async (id) =>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json() //converting the res data from the database into json format
    return data
  }
  //Adding task
  const AddingTask = async (task) =>{
    const res = await fetch(`http://localhost:5000/tasks`,{
      method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify(task)
    })
    const data = await res.json()
    
    setTask([...tasks,data])
    /*const id = Math.floor((Math.random()) * 10000)+ 1 //generating random id's.........
    const newTask = { id,...task }
    setTask([...tasks,newTask])*/
  }
  /*
  Deleting a task
   */
  /*const deleteTask =(id) =>{
    setTask(tasks.filter((task) =>task.id !== id))
  }*/
  
  //deleting data from the database
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    
    setTask(tasks.filter((task) => task.id !== id))
  }
  
  //Toggle reminder
  /*const toggleReminder = (id)=> {
    setTask(tasks.map((task) => task.id===id ? {...task,remainder: !task.remainder} :task))
  }*/
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchSingleTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })
    
    const data = await res.json()
    
    setTask(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }
  return (
    <div className="container">
      <Header onAddTask={() =>setAddTask(!showAddTask)} />
      { showAddTask && <AddTask onAdd={ AddingTask }/>}
      { tasks.length >0 ?
        <Tasks task={ tasks } onDelete={ deleteTask }  onToggle={ toggleReminder }/> : 'No task' }
    </div>
  );
}

export default App;
