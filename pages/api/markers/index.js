import clientPromise from "/lib/mongodb";

const handler = async (req, res) => {
  const client = await clientPromise;
  const markers = await client.db().collection("markers").find({}).toArray();
  res.json(markers);
};

export default handler;
