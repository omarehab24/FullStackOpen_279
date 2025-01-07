import Anecdotes from "./components/Anecdotes"
import NewAnecdote from "./components/NewAnecdote"
import TextFilter from "./components/TextFilter"
import Notification from "./components/Notification"
const App = () => {

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