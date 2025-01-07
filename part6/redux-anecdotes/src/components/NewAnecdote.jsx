import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const newAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
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