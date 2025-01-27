import axiosInstance from "../AxiosInstance"
import { 
    ADD_TO_WAITLIST_API, 
    CHANGE_STATUS_API, 
    CHECK_OTP_API, 
    GET_WAITLIST_API, 
    ADMIN_LOGIN_API,
    FETCH_DASHBOARD_DATA_API,
    UPDATE_OTP_STATUS_API

} from "../Endpoints";
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

export const Admin_Login_FN = (data)=>{
    try{
        return axiosInstance.post(ADMIN_LOGIN_API, data);
    }catch(err){
        return err;
    }
}

export const fetchDashboardData_FN = ()=>{
    try{
        return axiosInstance.get(FETCH_DASHBOARD_DATA_API);
    }catch(err){
        return err;
    }
}

export const UPDATE_OTP_STATUS_FN = (data)=>{
    try{
        return axiosInstance.post(UPDATE_OTP_STATUS_API, {data});
    }catch(err){
        return err;
    }
}
