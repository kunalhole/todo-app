import React from "react"
import { List, ListItem, ListItemText, ListItemAvatar } from "@mui/material"
import "./Todo.css"
function AddTodo({ todo }) {
  return (
    <List className="todo_List">
      <ListItem>
        <ListItemAvatar></ListItemAvatar>
        <ListItemText
          primary={todo.text}
          secondary={String(todo.timestamp?.toDate())}
        />
      </ListItem>
    </List>
  )
}

export default AddTodo
