import { buildResponse } from './helpers'

const API_URL = '/api/routes'

const fetchRoutes = async () => {
  const response = await fetch(API_URL)

  return buildResponse(response)
}

const createRoute = async (params) => {
  const response = fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(params),
  })

  return buildResponse(response)
}

export { createRoute, fetchRoutes }
