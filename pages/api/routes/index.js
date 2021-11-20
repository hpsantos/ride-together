import clientPromise from 'lib/mongodb'

const allRoutes = async (res, client) => {
  const routes = await client.db().collection('routes').find({}).toArray()
  res.json(routes)
}

const createRoute = async (client, req, res) => {
  const body = JSON.parse(req.body)
  await client.db().collection('routes').insertOne(body)

  res.json({ message: 'Created successfuly' })
}

const handler = async (req, res) => {
  const client = await clientPromise

  if (req.method === 'POST') {
    return createRoute(client, req, res)
  }

  return allRoutes(res, client)
}

export default handler
