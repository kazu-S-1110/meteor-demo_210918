import React, { useState } from 'react'
import { TasksCollection } from '../api/TasksCollection'

export const TaskForm = ({ user }) => {
  const [text, setText] = useState("")


  const handleSubmit = e => {
    e.preventDefault()

    if (!text) return

    TasksCollection.insert({
      text: text.trim(),
      createdAt: new Date(),
      userId: user._id
    })

    setText('')
  }
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type to add new tasks"
      />
      <button type="submit">Add Task</button>
    </form>
  )
}
