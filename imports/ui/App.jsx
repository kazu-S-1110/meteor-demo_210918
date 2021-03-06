import React, { useState } from 'react'
import { TasksCollection } from '../api/TasksCollection.js'
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import { Hello } from './Hello.jsx'
import { Info } from './Info.jsx'
import { Task } from './Task'
import { TaskForm } from './TaskForm.jsx'
import { LoginForm } from './LoginForm.jsx'

// const tasks = [
//   { _id: 1, text: "First Task" },
//   { _id: 2, text: "Second Task" },
//   { _id: 3, text: "Third Task" },
// ]

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false)

  const hideCompletedFilter = { isChecked: { $ne: true } }
  const user = useTracker(() => Meteor.user())
  const userFilter = user ? { userId: user._id } : {}
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter }



  const tasks = useTracker(() => {
    if (!user) {
      return []
    }

    return TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch()
  })
  const toggleChecked = ({ _id, isChecked }) => Meteor.call('tasks.setIsChecked', _id, !isChecked)


  const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id)

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0
    }

    return TasksCollection.find(pendingOnlyFilter).count()
  })

  const pendingTasksTitle = `${pendingTasksCount ? `(${pendingTasksCount})` : ""}`

  const logout = () => Meteor.logout()

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>Welcome to Meteor! 📝 This is Todo List! {pendingTasksTitle}</h1>
          </div>
        </div>
      </header>

      <div className="main">
        {user ? (
          <>
            <TaskForm />
            <div className="user" onClick={logout}>
              {user.username} 🚪 logout
            </div>
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
          </>

        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  )
}
