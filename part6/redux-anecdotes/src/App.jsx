import Anecdotes from "./components/Anecdotes"
import NewAnecdote from "./components/NewAnecdote"
import TextFilter from "./components/TextFilter"
import Notification from "./components/Notification"

import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
const App = () => {
  
  const dispatch = useDispatch()

  anecdoteService.getAll().then(anecdotes => {
    dispatch(setAnecdotes(anecdotes))
  })

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