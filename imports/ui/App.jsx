import React, { useState } from 'react'
import { TasksCollection } from '../api/TasksCollection.js'
import { useTracker } from 'meteor/react-meteor-data'

import { Hello } from './Hello.jsx'
import { Info } from './Info.jsx'
import { Task } from './Task'
import { TaskForm } from './TaskForm.jsx'

// const tasks = [
//   { _id: 1, text: "First Task" },
//   { _id: 2, text: "Second Task" },
//   { _id: 3, text: "Third Task" },
// ]

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false)

  const hideCompletedFilter = { isChecked: { $ne: true } }

  const tasks = useTracker(() =>
    TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch()
  )

  const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    })
  }

  const deleteTask = ({ _id }) => TasksCollection.remove(_id)




  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>Welcome to Meteor! 📝 This is Todo List!</h1>
          </div>
        </div>
      </header>

      <div className="main">
        <TaskForm />
        <div className="filter">
          <button onClick={() => setHideCompleted(!hideCompleted)}>
            {hideCompleted ? "Show All" : "Hide Completed"}
          </button>
        </div>

        <ul className="tasks">
          {tasks.map(task => (
            <Task
              key={task._id}
              task={task}
              onCheckboxClick={toggleChecked}
              onDeleteClick={deleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
