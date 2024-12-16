import axiosInstance from "../AxiosInstance"
import { ADD_TO_WAITLIST_API, CHANGE_STATUS_API, CHECK_OTP_API, GET_WAITLIST_API } from "../Endpoints";
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
export const GET_WAITLIST_FN = () =>{
    try{
        return axiosInstance.get(GET_WAITLIST_API);
    }catch(err){
        return err;
    }
}

export const changeStatus_FN = (id, status)=>{
    try{
        return axiosInstance.post(CHANGE_STATUS_API, {id, status});
    }catch(err){
        return err;
    }
}
