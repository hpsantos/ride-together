import { buildResponse } from './helpers'

const API_URL = '/api/routes'

const fetchRoutes = async (params = {}) => {
  const url = `${API_URL}?${new URLSearchParams(params).toString()}`
  const response = await fetch(url)

  return buildResponse(response)
}

const createRoute = async (params) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(params),
  })

  return buildResponse(response)
}

export { createRoute, fetchRoutes }
