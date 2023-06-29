import { useState } from 'react'
import { TodoList, TaskType } from './components/TodoList'
import { v1 } from 'uuid'

export type FilterValuesType = 'all' | 'completed' | 'active'

type TodoListType = { id: string; title: string; filter: FilterValuesType }

function App() {
  function addTask(title: string, todoListId: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todoListId]
    let newTasksObj = [newTask, ...tasks]
    tasksObj[todoListId] = newTasksObj
    setTasksObj({ ...tasksObj })
  }

  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId]
    let filteredtasks = tasks.filter((task) => task.id !== id)
    tasksObj[todoListId] = filteredtasks
    setTasksObj({ ...tasksObj })
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId]
    let task = tasks.find((task) => task.id === taskId)
    if (task) {
      task.isDone = isDone
      debugger
      setTasksObj({ ...tasksObj })
    }
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find((todoList) => todoList.id === todoListId)
    if (todoList) {
      todoList.filter = value
      setTodoLists([...todoLists])
    }
  }

  let todoListId1 = v1()
  let todoListId2 = v1()
  let todoListId3 = v1()

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: todoListId1, filter: 'all' },
    { id: todoListId2, title: todoListId2, filter: 'active' },
    { id: todoListId3, title: todoListId3, filter: 'completed' },
  ])

  const [tasksObj, setTasksObj] = useState({
    [todoListId1]: [
      { id: v1(), title: 'HTML & CSS', isDone: false },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'GraphQl', isDone: false },
      { id: v1(), title: 'NodeJs', isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: 'Book', isDone: false },
      { id: v1(), title: 'Moloko', isDone: true },
    ],
  })
  console.log(tasksObj[todoListId3])

  return (
    <div className="App">
      {todoLists.map((todoList) => {
        let tasksObjForTodoList = tasksObj[todoList.id]
        console.log(tasksObjForTodoList)
        if (todoList.filter === 'completed') {
          debugger
          tasksObjForTodoList = tasksObjForTodoList.filter((task) => task.isDone)
        }
        if (todoList.filter === 'active') {
          tasksObjForTodoList = tasksObjForTodoList.filter((task) => !task.isDone)
        }

        return (
          <TodoList
            tasksObj={tasksObjForTodoList}
            title={todoList.title}
            filter={todoList.filter}
            id={todoList.id}
            key={todoList.id}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
          />
        )
      })}
    </div>
  )
}

export default App
