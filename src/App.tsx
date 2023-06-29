import { useState } from 'react'
import { TodoList, TaskType } from './components/TodoList'
import {v1} from 'uuid'

export type FilterValuesType = "all" | "completed" | "active"

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'HTML & CSS', isDone: false },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'GraphQl', isDone: false },
    { id: v1(), title: 'NodeJs', isDone: false },
  ])
  console.log(tasks)
  let [filter, setFilter]= useState<FilterValuesType>("all")

  let tasksForTodoList = tasks 
  if(filter === "completed"){
    tasksForTodoList = tasks.filter( task => task.isDone)
  }
  if(filter === "active"){
    tasksForTodoList = tasks.filter( task => !task.isDone)
  }

  function addTask(title: string){
    let newTask = { id: v1(), title: title, isDone: false }
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((task) => task.id !== id)
    setTasks(filteredTasks)
  }

  function changeFilter(value: FilterValuesType){
    console.log(value)
    setFilter(value)
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((task)=> task.id === taskId)
    if(task) {
      task.isDone = isDone
    }
   
    let copyTasks = [...tasks]
    setTasks(copyTasks)
  }


  return (
    <div className="App">
      <TodoList 
        tasks={tasksForTodoList} 
        title="Techonlogies" 
        removeTask={removeTask} 
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        />
    </div>
  )
}

export default App
