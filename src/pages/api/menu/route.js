import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();
    const categories = await db.collection("categories").find({}).toArray();
    const menuItems = await db.collection("menu").find({}).toArray();

    return NextResponse.json({ categories, items: menuItems });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function POST(request) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const body = await request.json();
    await client.connect();
    const db = client.db();

    if (body.type === "category") {
      const result = await db.collection("categories").insertOne({
        name: body.name,
        createdAt: new Date(),
      });
      return NextResponse.json({
        message: "Category created",
        category: result,
      });
    } else {
      const { categoryId, title, price, description, imageUrl } = body;

      if (!categoryId || !title || !price) {
        return NextResponse.json(
          { message: "Missing required fields" },
          { status: 400 }
        );
      }

      const newItem = {
        categoryId: new ObjectId(categoryId),
        title,
        price: parseFloat(price),
        description: description || "",
        imageUrl: imageUrl || "",
        createdAt: new Date(),
      };

      const result = await db.collection("menu").insertOne(newItem);
      return NextResponse.json({ message: "Menu item created", item: result });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function PUT(request) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Item ID is required" },
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db();
    const result = await db
      .collection("menu")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    return NextResponse.json({ message: "Menu item updated", result });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function DELETE(request) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const body = await request.json();
    await client.connect();
    const db = client.db();

    if (body.type === "category") {
      const hasItems = await db.collection("menu").findOne({
        categoryId: new ObjectId(body.categoryId),
      });

      if (hasItems) {
        return NextResponse.json(
          { message: "Cannot delete category with existing items" },
          { status: 400 }
        );
      }

      await db.collection("categories").deleteOne({
        _id: new ObjectId(body.categoryId),
      });
      return NextResponse.json({ message: "Category deleted" });
    } else {
      await db.collection("menu").deleteOne({
        _id: new ObjectId(body.itemId),
      });
      return NextResponse.json({ message: "Menu item deleted" });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
