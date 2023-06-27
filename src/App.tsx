import { useState } from 'react'
import { TodoList } from './components/TodoList'

function App() {
  let initialTasks = [
    { id: 1, title: 'HTML & CSS', isDone: false },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'React', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
    { id: 5, title: 'GraphQl', isDone: false },
    { id: 6, title: 'NodeJs', isDone: false },
  ]

  let arr = useState(initialTasks)
  let tasks = arr[0]
  let setTasks = arr[1]

  function removeTask(id: number) {
    let filteredTasks = tasks.filter((task) => task.id !== id)
    setTasks(filteredTasks)
  }

  return (
    <div className="App">
      <TodoList tasks={tasks} title="Techonlogies" removeTask={removeTask} />
    </div>
  )
}

export default App
