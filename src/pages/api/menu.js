import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();
    const menuCollection = db.collection("menu");
    const categoryCollection = db.collection("categories");

    switch (req.method) {
      case "GET":
        // Get all categories first
        const categories = await categoryCollection.find({}).toArray();
        // Get all menu items
        const menuItems = await menuCollection.find({}).toArray();
        // Combine the data
        const menuData = {
          categories: categories,
          items: menuItems,
        };
        res.status(200).json(menuData);
        break;

      case "POST":
        if (req.body.type === "category") {
          // Handle category creation
          const { name } = req.body;
          const categoryResult = await categoryCollection.insertOne({
            name,
            createdAt: new Date(),
          });
          res
            .status(201)
            .json({ message: "Category created", category: categoryResult });
        } else {
          // Handle menu item creation
          const { categoryId, title, price, description, imageUrl } = req.body;

          if (!categoryId || !title || !price) {
            return res.status(400).json({ message: "Missing required fields" });
          }

          const newItem = {
            categoryId: new ObjectId(categoryId),
            title,
            price: parseFloat(price),
            description: description || "",
            imageUrl: imageUrl || "",
            createdAt: new Date(),
          };

          const result = await menuCollection.insertOne(newItem);
          res.status(201).json({ message: "Menu item created", item: result });
        }
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

        res
          .status(200)
          .json({ message: "Menu item updated", result: updateResult });
        break;

      case "DELETE":
        if (req.body.type === "category") {
          const { categoryId } = req.body;
          // Check if category has items
          const hasItems = await menuCollection.findOne({
            categoryId: new ObjectId(categoryId),
          });
          if (hasItems) {
            return res
              .status(400)
              .json({ message: "Cannot delete category with existing items" });
          }
          await categoryCollection.deleteOne({ _id: new ObjectId(categoryId) });
          res.status(200).json({ message: "Category deleted" });
        } else {
          const { itemId } = req.body;
          await menuCollection.deleteOne({ _id: new ObjectId(itemId) });
          res.status(200).json({ message: "Menu item deleted" });
        }
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
