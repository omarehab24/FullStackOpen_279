import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import anecdoteService from "../services/anecdotes"

function Anecdotes() {
    const queryClient = useQueryClient()

    const updateAnecdoteMutation = useMutation({
      mutationFn: anecdoteService.updateAnecdote,
      onSuccess: () => {
        queryClient.invalidateQueries(['anecdotes']) // // causes React Query to automatically update a query with the key anecdotes, i.e. fetch the anecdotes from the server. As a result, the application renders the up-to-date state on the server, i.e. the added note is also rendered.
        
      }
    })

    const handleVote = (anecdote) => {
      const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
      updateAnecdoteMutation.mutate(updatedAnecdote)
    }
  
    const result = useQuery({
      queryKey: ['anecdotes'],
      queryFn: anecdoteService.getAll,
      refetchOnWindowFocus: false,
      retry: false
    })
  
    if (result.isLoading) {
      return <div>loading data...</div>
    }
  
    if (result.isError) {
      return <div>anecdote service not available due to problems in server</div>
    }
  
    const anecdotes = result.data

    anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h3>Anecdotes</h3>

        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotes