import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();
    const menuCollection = db.collection("menu");

    switch (req.method) {
      case "GET":
        const menuItems = await menuCollection.find({}).toArray();
        res.status(200).json(menuItems);
        break;

      case "POST":
        const { category, title, price, description, imageUrl } = req.body;
        
        if (!category || !title || !price) {
          return res.status(400).json({ message: "Missing required fields" });
        }

        const newItem = {
          category,
          title,
          price: parseFloat(price),
          description: description || "",
          imageUrl: imageUrl || "",
          createdAt: new Date()
        };

        const result = await menuCollection.insertOne(newItem);
        res.status(201).json({ message: "Menu item created", item: result });
        break;

      case "PUT":
        const { id, ...updateData } = req.body;
        
        if (!id) {
          return res.status(400).json({ message: "Item ID is required" });
        }

        const updateResult = await menuCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );

        res.status(200).json({ message: "Menu item updated", result: updateResult });
        break;

      case "DELETE":
        const { itemId } = req.body;
        
        if (!itemId) {
          return res.status(400).json({ message: "Item ID is required" });
        }

        await menuCollection.deleteOne({ _id: new ObjectId(itemId) });
        res.status(200).json({ message: "Menu item deleted" });
        break;

      default:
        res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  } finally {
    await client.close();
  }
}