const buildResponse = async (response) => {
  const responseObject = { status: response.status }

  if (!response.ok) {
    return responseObject
  }

  try {
    const data = await response.json()
    return { ...responseObject, data }
  } catch (error) {
    console.error("Error parsing json object: ", error)
    return { status: 500 }
  }
}

export { buildResponse }
