type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: Function
}

export function TodoList(props: PropsType) {
  return (
    <div>
      <h3 className="title">{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <div>
        <ul>
          {props.tasks.map((task) => (
            <li>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <button
                onClick={() => {
                  props.removeTask(task.id)
                }}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}
