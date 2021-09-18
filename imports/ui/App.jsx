import React from 'react'
import { Hello } from './Hello.jsx'
import { Info } from './Info.jsx'
import { Task } from './Task'

const tasks = [
  { _id: 1, text: "First Task" },
  { _id: 2, text: "Second Task" },
  { _id: 3, text: "Third Task" },
]

export const App = () => (

  <div>
    <h1>Welcome to Meteor!</h1>
    <Hello />
    <Info />
    <ul>
      {tasks.map(task => <Task key={task._id} task={task} />)}
    </ul>
  </div>
)
