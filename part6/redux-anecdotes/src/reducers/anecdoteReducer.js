import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const id = action.payload
      return state.map(anecdote => 
        anecdote.id !== id
          ? anecdote
          : {
              ...anecdote,
              votes: anecdote.votes + 1
            }
      ).sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload) // Redux Toolkit utilizes the Immer library with reducers created by createSlice function, which makes it possible to mutate the state argument inside the reducer. Immer uses the mutated state to produce a new, immutable state and thus the state changes remain immutable.
      // console.log(current(state));
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

// asynchronous action creator
export const initializeAnecdotes = () => {
  return async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => async dispatch => {
  const newAnecdote = await anecdoteService.createNew(content)
  dispatch(appendAnecdote(newAnecdote))
}

export const voteAnecdote = id => async dispatch => {
  await anecdoteService.newVote(id)
  dispatch(vote(id))
}



export default anecdoteSlice.reducer