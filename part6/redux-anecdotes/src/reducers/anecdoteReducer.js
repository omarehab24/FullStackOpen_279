import { createSlice, current } from '@reduxjs/toolkit'

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
    createAnecdote: (state, action) => {
      state.push(action.payload) // Redux Toolkit utilizes the Immer library with reducers created by createSlice function, which makes it possible to mutate the state argument inside the reducer. Immer uses the mutated state to produce a new, immutable state and thus the state changes remain immutable.
      console.log(current(state));
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer