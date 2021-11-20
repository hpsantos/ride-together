import { buildResponse } from "./helpers"

const API_URL = "/api/routes"

const fetchRoutes = async () => {
  const response = await fetch(API_URL)

  return buildResponse(response)
}

export { fetchRoutes }
