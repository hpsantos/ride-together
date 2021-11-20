import clientPromise from 'lib/mongodb'
import mongo from 'mongodb'

const handler = async (req, res) => {
  const { id } = req.query
  const client = await clientPromise
  const findParams = { $or: [{ name: id }] }

  try {
    findParams.$or.push({ _id: new mongo.ObjectID(id) })
  } catch {
    console.error('[MongoDB] Cannot parse to ObjectID.')
  }

  const user = await client.db().collection('users').findOne(findParams)
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({})
  }
}

export default handler
