import clientPromise from '~lib/mongodb'

const handler = async (req, res) => {
  const client = await clientPromise
  const routes = await client.db().collection('routes').find({}).toArray()
  res.json(routes)
}

export default handler
