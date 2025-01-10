import { createContext, useReducer, useContext } from "react";

const NotificationContext = createContext()

export default NotificationContext

const notificationReducer = (state, action) => {
    switch(action.type) {
        case "SHOW":
            return action.payload
        case "HIDE":
            return null
        default:
            return state
    }
}

export const NotificationContextProvider = ({children}) => {

    const [notification, dispatch] = useReducer(notificationReducer, null)
        
    return (
        <NotificationContext.Provider value={[notification, dispatch]}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notification = useContext(NotificationContext)[0]
    return notification
}

export const useNotificationDispatch = () => {
    const [ , dispatch] = useContext(NotificationContext)
    return dispatch
}
