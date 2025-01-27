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
      const settingsCollection  = database.collection("settings");
      const otp_enabled = await settingsCollection.findOne({})
      console.log("OTP ==>",otp_enabled.otp_enabled)
      if(otp_enabled.otp_enabled == false){
        const result = await collection.insertOne({ name, number, persons, isWaiting:'waiting',time: new Date().toLocaleTimeString()});
        return res.status(200).json({
          message: "Added to waitlist",
          otp: false,
          data: result,
        })
      }
      const result = await collection.insertOne({ name, number, persons, isWaiting:'waiting',time: new Date().toLocaleTimeString()});
      
      const otp = generateOtp();
      
      // Create a session and store OTP
      const session = await getIronSession(req, res, sessionOptions);
      session.otp = otp;
      await session.save();
      
      res.status(200).json({ message: "Data inserted successfully!", data: result , otp: true});
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