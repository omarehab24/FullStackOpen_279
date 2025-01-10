import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Anecdotes from './components/Anecdotes'

const App = () => {
 

  return (
    <div>
      <h1>Anecdote app</h1>
    
      <Notification />
      <AnecdoteForm />
      <Anecdotes />
      
    </div>
  )
}

export default App
