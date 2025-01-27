import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
      await client.connect();
      const database = client.db("nahdi-mandi");
      const collection = database.collection("settings");
        console.log('Body ==>',req.body);
        const otp_enabled  = req.body.data;
      if (typeof otp_enabled !== "boolean") {
        return res.status(400).json({ message: "Invalid data format!" });
      }
      const result = await collection.updateOne(
        {},
        { $set: { otp_enabled } },
        { upsert: true }
      );
      res.status(200).json({ message: "OTP setting updated successfully!", result });
    } catch (error) {
      console.error("Error updating OTP setting: ", error);
      res.status(500).json({ message: "Something went wrong!" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}
