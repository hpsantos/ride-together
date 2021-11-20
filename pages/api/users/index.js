import clientPromise from '~lib/mongodb'

const handler = async (req, res) => {
  const client = await clientPromise
  const users = await client.db().collection('users').find({}).toArray()
  res.json(users)
}

export default handler
