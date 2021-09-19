import React from 'react'
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


  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch())
  return (

    <div>
      <h1>Welcome to Meteor!</h1>
      <Hello />
      <Info />
      <TaskForm />
      <ul>
        {tasks.map(task => <Task key={task._id} task={task} />)}
      </ul>
    </div>
  )
}
