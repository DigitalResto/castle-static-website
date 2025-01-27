const rootURL = process.env.NEXT_PUBLIC_ENVIRONMENT === "dev" 
? "http://localhost:3000/api" 
: "https://resto-Castle Resto.vercel.app/api";

export const ADD_TO_WAITLIST_API = `${rootURL}/add-to-waitlist`;
export const CHECK_OTP_API = `${rootURL}/check-otp`;
export const GET_WAITLIST_API = `${rootURL}/get-waitinglist`;
export const CHANGE_STATUS_API = `${rootURL}/change-status`;
export const ADMIN_LOGIN_API = `${rootURL}/admin-login`;
export const FETCH_DASHBOARD_DATA_API = `${rootURL}/fetch-dashboard-data`;
export const UPDATE_OTP_STATUS_API = `${rootURL}/update-otp-status`;
