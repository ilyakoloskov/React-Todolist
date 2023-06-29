import { ChangeEvent, ChangeEventHandler, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "../App"



export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string)=> void
  changeFilter: (value: FilterValuesType)=> void
  addTask: (title: string)=> void
  changeTaskStatus: (id: string, isDone: boolean)=> void
}

export function TodoList(props: PropsType) {

  let [newTaskTitle, setNewTaskTitle] = useState("")

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
    setNewTaskTitle(e.currentTarget.value);
  }

  const addTask = ()=> {
    if(newTaskTitle.trim() === ""){
      return setNewTaskTitle("")
    }else{
      props.addTask(newTaskTitle.trim())
      setNewTaskTitle("");
    }
  }
  
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==="Enter"){
      props.addTask(newTaskTitle)
      setNewTaskTitle("");}
  }


  const filterAllTask = ()=>{
    props.changeFilter("all")
  }

  const filterCompletedTask = ()=>{
    props.changeFilter("completed")
  }

  const filterActiveTask = ()=>{
    props.changeFilter("active")
  }

  return (
    <div>
      <h3 className="title">{props.title}</h3>
      <div>
        <input 
          value={newTaskTitle} 
          onKeyPress={onKeyPressHandler}
          onChange={onNewTitleChangeHandler}/>
        <button onClick={addTask}>+</button>
      </div>
      <div>
        <ul>
          {
            props.tasks.map((task) => {
              
              const onRemoveHandler = ()=>{props.removeTask(task.id)}
              const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(task.id, e.currentTarget.checked)}

              return <li key={task.id}>
                  <input type="checkbox" onChange={onChangeHandler} checked={task.isDone}/>
                  <span>{task.title}</span>
                  <button onClick={onRemoveHandler}>
                    X
                  </button>
                </li>
            })
          }
        </ul>
      </div>
      <div>
        <button onClick={filterAllTask}>All</button>
        <button onClick={filterCompletedTask}>Active</button>
        <button onClick={filterActiveTask}>Completed</button>
      </div>
    </div>
  )
}
