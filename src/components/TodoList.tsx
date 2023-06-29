import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValuesType } from '../App'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  id: string
  tasksObj: Array<TaskType>
  filter: FilterValuesType
  removeTask: (id: string, todoListId: string) => void
  changeFilter: (value: FilterValuesType, todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
}

export function TodoList(props: PropsType) {
  let [newTaskTitle, setNewTaskTitle] = useState('')
  let [error, setError] = useState<string | null>(null)

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle.trim(), props.id)
      setNewTaskTitle('')
    } else {
      setError('Поле не может быть пустым')
    }
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === 'Enter') {
      props.addTask(newTaskTitle, props.id)
      setNewTaskTitle('')
    }
  }

  const filterAllTask = () => {
    props.changeFilter('all', props.id)
  }

  const filterCompletedTask = () => {
    props.changeFilter('completed', props.id)
  }

  const filterActiveTask = () => {
    props.changeFilter('active', props.id)
  }

  return (
    <div>
      <h3 className="title">{props.title}</h3>
      <div>
        <input
          className={error ? 'error' : ''}
          value={newTaskTitle}
          onKeyPress={onKeyPressHandler}
          onChange={onNewTitleChangeHandler}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <div>
        <ul>
          {props.tasksObj.map((task) => {
            const onRemoveHandler = () => {
              props.removeTask(task.id, props.id)
            }
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
            }

            return (
              <li className={task.isDone ? 'is-done' : ''} key={task.id}>
                <input type="checkbox" onChange={onChangeHandler} checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={onRemoveHandler}>X</button>
              </li>
            )
          })}
        </ul>
      </div>
      <div>
        <button className={props.filter === 'all' ? 'button-active' : ''} onClick={filterAllTask}>
          All
        </button>
        <button
          className={props.filter === 'completed' ? 'button-active' : ''}
          onClick={filterCompletedTask}
        >
          Active
        </button>
        <button
          className={props.filter === 'active' ? 'button-active' : ''}
          onClick={filterActiveTask}
        >
          Completed
        </button>
      </div>
    </div>
  )
}
