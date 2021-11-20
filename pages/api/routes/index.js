import clientPromise from '~lib/mongodb'

const getRoutes = async (req, res, client) => {
  const {
    query: { time },
  } = req

  let findParams = {}

  if (time) {
    findParams = {
      ...findParams,
      time: { $gt: parseInt(time) - 30, $lt: parseInt(time) + 30 },
    }
  }

  const routes = await client
    .db()
    .collection('routes')
    .find(findParams)
    .toArray()

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

  return getRoutes(req, res, client)
}

export default handler
