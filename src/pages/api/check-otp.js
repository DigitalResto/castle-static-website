import { getIronSession } from "iron-session";

const sessionOptions = {
    password: 'fwenfiwufnwieufbwifubweifbefiwufbwifbwifwiffwef',
    cookieName: "waitlist-session",
    cookieOptions: {
      secure: false,
    },
  };

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { otp } = req.body;
console.log("OTP==>" , req.body);
    // Validate input
    if (!otp || !Array.isArray(otp) || otp.length !== 4) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid OTP format. Please enter 4 digits." 
      });
    }

    try {
      // Retrieve the session
      const session = await getIronSession(req, res, sessionOptions);
      const storedOtp = session.otp;

      console.log("Stored OTP in session =>", storedOtp);
      console.log("User entered OTP =>", otp);

      // Convert array to string
      const userOtpString = otp.join('');

      // Compare OTPs
      if (!storedOtp) {
        return res.status(400).json({ 
          success: false, 
          message: "No OTP found in session. Please request a new OTP." 
        });
      }

      if (userOtpString === storedOtp) {
        // Clear the OTP after successful verification
        session.otp = undefined;
        await session.save();

        res.status(200).json({ 
          success: true, 
          message: "OTP verified successfully" 
        });
      } else {
        res.status(400).json({ 
          success: false, 
          message: "Invalid OTP. Please try again." 
        });
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred during OTP verification" 
      });
    }
  } else {
    res.status(405).json({ 
      message: "Method not allowed!" 
    });
  }
}