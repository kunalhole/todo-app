import React, { useState, useEffect } from "react"
import { Button, FormControl, InputLabel, Input } from "@mui/material"
import "./App.css"
import AddTodo from "./components/AddTodo"
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "./firebaseApp"

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")

  const addTodos = (event) => {
    //do not refersed the page.
    event.preventDefault()
    //this is working when we click on button
    // setTodos([...todos, { text: input }])
    addDoc(collection(db, "todos"), {
      text: input,
      timestamp: serverTimestamp(),
    })
    //for clearing input
    setInput("")
  }

  useEffect(() => {
    // app is loaded and get data from firestore
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setTodos(items)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="App">
      <form>
        <h1>Hello World !</h1>
        <FormControl>
          <InputLabel>Write Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          disabled={!input}
          onClick={addTodos}
          type="submit"
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
        {/* <button onClick={addTodos}>Add Todo</button> */}
      </form>
      <ul>
        {todos.length > 0 ? (
          <>
            <h3>Total: {todos.length}</h3>
            {todos.map((todo) => (
              <AddTodo key={todo.id} todo={todo} />
            ))}
          </>
        ) : (
          <p>You have no Items currently to work on!</p>
        )}
      </ul>
    </div>
  )
}

export default App
