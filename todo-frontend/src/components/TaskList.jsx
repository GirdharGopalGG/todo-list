import { useState, useEffect } from "react";
import axios from 'axios'

const TaskList = ()=>{
    const [tasks,setTasks] = useState([])
    const [text,setText] = useState('')


    useEffect(()=>{
        axios.get('/api/tasks')
            .then(res => setTasks(res.data))
            .catch(err => console.log(err))
    },[])
    


    const addTask = ()=>{
        axios.post('/api/tasks',{text})
            .then((res)=>setTasks([...tasks,res.data]))
            .catch((err)=> console.log(err))
        setText('')
    }

    const toggleComplete = (id)=>{
        axios.put(`/api/tasks/${id}`)
            .then((res)=>{
                setTasks(tasks.map(task=>task._id===id?res.data:task))
            })
            .catch(err=>console.log(err))
    }



    const deleteTask = (id)=>{
        axios.delete(`/api/tasks/${id}`)
            .then((res)=>{
                setTasks(tasks.filter(task=>task._id!==id))
            })
            .catch(err=>console.log(err))
    }
    
     return (
    <div>
      <h1>ToDo List</h1>
      <input className = "text" value={text} onChange={e => setText(e.target.value)} />
      <button className="add" onClick={addTask}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <span className = "text" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <button className="pad" onClick={() => toggleComplete(task._id)}>Toggle</button>
            <button className="pad" onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );  
}

export default TaskList