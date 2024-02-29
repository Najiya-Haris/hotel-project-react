import { vieChefendpoints } from "../ApiNames/Manager"
import { getRequest } from "../Networks/Index"


export const viewChef=async (token)=>{
    let headers= {
        Authorization: token,
       
      }
    try{
        const response =getRequest(headers,vieChefendpoints)
          return response
    }catch(err){
        throw err
    }
}