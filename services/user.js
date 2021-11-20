import { buildResponse } from "./helpers"

const API_URL = "/api/users"

const fetchUser = async (username) => {
  const response = await fetch(API_URL + "/" + username)

  return buildResponse(response)
}

const fetchUserRoutes = async (username) => {
  const response = await fetch(`${API_URL}/${username}/routes`)

  return buildResponse(response)
}

export { fetchUser, fetchUserRoutes }
