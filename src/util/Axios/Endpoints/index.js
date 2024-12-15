const rootURL = process.env.ENVIRONMENT == 'dev' ? 'http://localhost:3000/api' : 'https://resto-nahdi.vercel.app/api'

export const ADD_TO_WAITLIST_API = `${rootURL}/add-to-waitlist`;
export const CHECK_OTP_API = `${rootURL}/check-otp`;
