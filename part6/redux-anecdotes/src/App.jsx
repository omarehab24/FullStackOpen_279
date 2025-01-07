import Anecdotes from "./components/Anecdotes"
import NewAnecdote from "./components/NewAnecdote"
import TextFilter from "./components/TextFilter"
const App = () => {

  return (
    <div>
      
     <TextFilter />
     <NewAnecdote />
     <Anecdotes />
     
    </div>
  )
}

export default App