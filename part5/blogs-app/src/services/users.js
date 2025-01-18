import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getUser = (username) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(`${baseUrl}/${username}`, config)
  return request.then(response => response.data)
}


export default { getUser, setToken}