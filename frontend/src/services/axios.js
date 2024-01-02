
import { toast } from "react-toastify";
import axios from "axios";
import { getLocalStorageToken, removeLocalStorageToken } from "@/utils/common.util";
import dotenv from "dotenv";


dotenv.config();

const APIrequest = async ({ method, bodyData, url, baseURL, queryParams, token = "" }) => {

  const apiToken = token !== "" ? token : getLocalStorageToken();
  
  
  try {

    const axiosConfig = {
      method: method || "GET",
      baseURL: process.env.NEXT_PUBLIC_BASE_PATH,
      headers: {
        "content-type": "application/json",
        "X-Frame-Options": "sameorigin",
      },
    };

    if (baseURL) {
      axiosConfig.baseURL = baseURL;
    }

    if (url) {
      axiosConfig.url = url;
    }

    if (bodyData) {
      const bodyPayload = {};
      for (const key in bodyData) {
        if (Object.hasOwnProperty.call(bodyData, key)) {
          let element = bodyData[key];
          if (typeof element === "string") {
            element = element.trim();
          }
          if (![null, undefined, NaN].includes(element)) {
            bodyPayload[key] = element;
          }
        }
      }
      axiosConfig.data = bodyPayload;
    }



    if (queryParams) {
      const queryParamsPayload = {};
      for (const key in queryParams) {
        if (Object.hasOwnProperty.call(queryParams, key)) {
          let element = queryParams[key];
          if (typeof element === "string") {
            element = element.trim();
          }
          if (!["", null, undefined, NaN].includes(element)) {
            queryParamsPayload[key] = element;
          }
        }
      }
      axiosConfig.params = queryParamsPayload;
    }

      if (apiToken) {
        axiosConfig.headers = {
          ...axiosConfig.headers,
          authorization: apiToken,
        };
      }
   console.log(axiosConfig);
     const res= await axios(axiosConfig) 
     return res.data;
      
 
  }
  catch (error) {
    if (axios.isCancel(error)) {
      throw Error(error)
    }
    else {
      const errorRes = error.response;
      
      if (errorRes.data.message) {
          toast.warning(errorRes.data.message)
          
          removeLocalStorageToken();
        
          if ([401].includes(errorRes.status)) {
            removeLocalStorageToken();
            window.location.replace('/');
   
      
        
       }
        }
        else
        toast.warning("error in api request")
     

      
    }


  }
}


export default APIrequest;