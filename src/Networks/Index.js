import axios from "axios"
import config from "../config/Config";

export const getRequest=async (headers={} ,url)=>{
    try{
        const response= await axios.get(`${config.apiUrl}${url}`, {
            headers: {
            ...headers
            },
          });
          return response
    }catch(err){
        throw err
    }
}