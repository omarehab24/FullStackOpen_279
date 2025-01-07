import { setNotification, clearNotification } from '../reducers/notificationReducer'
const notify = (dispatch, message, time) => {
    dispatch(setNotification(message))
    setTimeout(() => dispatch(clearNotification()), time * 1000)
}

export default notify