import axiosInstance from "../AxiosInstance"
import { ADD_TO_WAITLIST_API, CHECK_OTP_API } from "../Endpoints";
export const addToWaitList_FN = (data) =>{
    try{
        return axiosInstance.post(ADD_TO_WAITLIST_API, data);
    }catch(err){
        return err;
    }
}

export const checkOTP_FN = (otp) =>{
    try{
        return axiosInstance.post(CHECK_OTP_API, {otp});
    }catch(err){
        return err;
    }
}