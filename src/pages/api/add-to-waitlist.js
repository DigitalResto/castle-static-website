import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    console.log(req.body);
    if (req.method === "POST") {
        const client = new MongoClient(process.env.MONGODB_URI);
        try {
            await client.connect();
            const database = client.db("nahdi-mandi");
            const collection = database.collection("waitlist");
            const { name, number, persons } = req.body;
            if (!name || !number || !persons) {
                res.status(400).json({ message: "All fields (name, number, persons) are required!" });
                return;
            }
            const result = await collection.insertOne({ name, number, persons });
            console.log("Inserted data=>", result);
            res.status(200).json({ message: "Data inserted successfully!", data: result });
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
