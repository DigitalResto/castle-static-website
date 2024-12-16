import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
      await client.connect();
      const database = client.db("nahdi-mandi");
      const collection = database.collection("waitlist");
      const result = await collection.find({isWaiting:'waiting'}).toArray();
      console.log("Result ==>" , result);
      res.status(200).json({ message: "Data fetched successfully!", data: result });
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