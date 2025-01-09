import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            console.log(action.payload);
            return action.payload
        },
        clearNotification(state, action) {
            return ''
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const notify = (message, time) => async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => dispatch(clearNotification()), time * 1000)
}

export default notificationSlice.reducer