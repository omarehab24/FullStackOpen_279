import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import notify from '../utils/notify'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = () => {
   
    const dispatch = useDispatch()

    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
        notify(dispatch, `you created a new anecdote: '${content}'`, 5)
    }

    return (
        <div>
            <h2>Create new anecdote</h2>
            <form onSubmit={newAnecdote}>
                <input name="anecdote" type='text' title='characters only' pattern='[A-Za-z]*'/>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewAnecdote