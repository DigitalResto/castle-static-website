import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        const {username, password} = req.body;
        console.log(req.body);
        if(username != process.env.ADMIN_USER_NAME) return res.status(401).json({message:"Invalid username"})
        if(password != process.env.ADMIN_PASSWORD) return res.status(401).json({message:"Invalid password"})
        res.status(200).json({message: "Login Success"});
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: error.message});
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}