import APIrequest from "../axios";
import user from "@/apiEndPoint/user";

export const userService={
    userSingin:async(bodyData)=>{
        try {
          const payload = {
              ...user.login,bodyData
          };
          const res = await APIrequest(payload);
          return res;
        } catch (error) {
          return error
        }
      },

      logOut:async()=>{
        try {
          const payload = {
              ...user.logOut
          };
          const res = await APIrequest(payload);
          return res;
        } catch (error) {
          return error
        }
      },
}