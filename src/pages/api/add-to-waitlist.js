import { MongoClient } from "mongodb";
import { getIronSession } from "iron-session";

// Define session options
const sessionOptions = {
  password: 'fwenfiwufnwieufbwifubweifbefiwufbwifbwifwiffwef', // Must be at least 32 characters long
  cookieName: "waitlist-session",
  cookieOptions: {
    secure: false,
  },
};

export default async function handler(req, res) {
  const { name, number, persons } = req.body;
  
  if (!name || !number || !persons) {
    return res.status(400).json({ message: "All fields (name, number, persons) are required!" });
  }
  
  if (req.method === "POST") {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
      await client.connect();
      const database = client.db("nahdi-mandi");
      const collection = database.collection("waitlist");
      
      const result = await collection.insertOne({ name, number, persons, isWaiting:'waiting'});
      console.log("Inserted data=>", result);
      
      const otp = generateOtp();
      console.log("Otp generated=>", otp);
      
      // Create a session and store OTP
      const session = await getIronSession(req, res, sessionOptions);
      session.otp = otp;
      await session.save();
      
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

function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}