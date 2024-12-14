import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    console.log(req.body);
    if (req.method === "POST") {
        console.log(req.body);
        return res.status(200).json("Success");
    } else {
        res.status(405).json({ message: "Method not allowed!" });
    }
}
