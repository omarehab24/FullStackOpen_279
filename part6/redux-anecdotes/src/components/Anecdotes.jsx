import { useSelector, useDispatch } from 'react-redux'

import { vote } from '../reducers/anecdoteReducer'
import notify from '../utils/notify'

const Anecdotes = () => {
    
    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdotes
        }

        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })
    const dispatch = useDispatch()



    const newVote = (id) => {
        dispatch(vote(id))
        const content = anecdotes.find(anecdote => anecdote.id === id).content
        notify(dispatch, `you voted '${content}'`, 5)
        
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => newVote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Anecdotes