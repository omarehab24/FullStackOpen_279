import Anecdotes from "./components/Anecdotes"
import NewAnecdote from "./components/NewAnecdote"
import TextFilter from "./components/TextFilter"
import Notification from "./components/Notification"

import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

import { useEffect } from "react"
const App = () => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])


  return (
    <div>
      <Notification/>
     <TextFilter />
     <NewAnecdote />
     <Anecdotes />
     
    </div>
  )
}

export default App