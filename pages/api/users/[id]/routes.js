import clientPromise from '~lib/mongodb'

const handler = async (req, res) => {
  const { id } = req.query
  const client = await clientPromise
  const findParams = { user: id }
  const routes = await client
    .db()
    .collection('routes')
    .find(findParams)
    .toArray()

  if (routes) {
    res.json(routes)
  } else {
    res.status(404).json({})
  }
}

export default handler
