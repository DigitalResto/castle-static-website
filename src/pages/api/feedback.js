import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Handle feedback submission
    try {
      await client.connect();
      const db = client.db("nahdi-mandi");
      const collection = db.collection("feedback");

      const { name, email, visitDate, feedback, categoryRatings, overallRating } = req.body;

      const newFeedback = {
        name,
        email,
        visitDate,
        feedback,
        categoryRatings,
        overallRating,
        date: new Date()
      };

      const result = await collection.insertOne(newFeedback);
      res.status(201).json({ message: "Feedback submitted successfully", feedback: result });
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      res.status(500).json({ message: "Something went wrong!" });
    } finally {
      await client.close();
    }
  } else if (req.method === "GET") {
    // Handle feedback retrieval
    try {
      await client.connect();
      const db = client.db("nahdi-mandi");
      const collection = db.collection("feedback");

      const feedbacks = await collection.find({}).toArray();
      res.status(200).json({ feedbacks });
    } catch (error) {
      console.error("Error fetching feedback: ", error);
      res.status(500).json({ message: "Something went wrong!" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}