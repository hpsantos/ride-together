import mongo from "mongodb";

import clientPromise from "/lib/mongodb";

const handler = async (req, res) => {
  const { id } = req.query;
  const client = await clientPromise;
  const findParams = { $or: [{ name: id }] };

  try {
    findParams.$or.push({ _id: new mongo.ObjectID(id) });
  } catch {}

  const user = await client.db().collection("users").findOne(findParams);
  res.json(user);
};

export default handler;
