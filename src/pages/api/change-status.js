import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        const {id , status} = req.body;
        console.log(req.body);
      await client.connect();
      const database = client.db("nahdi-mandi");
      const collection = database.collection("waitlist");
      if (status == 'accept') {
        console.log("Accepted");
          const result = await collection.updateOne(
              { _id : new ObjectId(id)}, 
              { $set: { isWaiting: 'accepted' } }
          );
          res.status(200).json({ message: "Updated", data: result });
      } else {
          const result = await collection.findOneAndUpdate(
              {_id: new ObjectId(id)}, 
              { $set: { isWaiting: 'rejected' } }
          );
          res.status(200).json({ message: "Updated", data: result });
      }
    } catch (error) {
      console.error("Error inserting data: ", error);
      res.status(500).json({ message: "Something went wrong!" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}

function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}