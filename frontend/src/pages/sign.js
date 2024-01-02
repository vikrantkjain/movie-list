import UserLoginForm from "@/components/Form/LoginForm";
import { Container } from "react-bootstrap";
import { useRouter} from "next/router";
import { userService } from "@/services/user/index.service";
// import { login } from "@/redux/AuthSlice";
// import { useDispatch } from "react-redux";
import { getLocalStorageToken, setLocalStorageToken } from "@/utils/common.util";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function SignIn() {
  const router=useRouter();

    const submit =async (val) => {
        try{
    
        const bodyData={
            email:val.email,
            password:val.password,
        }

        const res= await userService.userSingin(bodyData);
      
        if (res?.success) {
            setLocalStorageToken(res?.data?.token)
            // dispatch(login(res?.data?.userDetails))
            router.push('/myMovies')
            // toast.success(res?.message);
          } else {
            toast.warning(res?.message);
          }
        }
        catch(err){
            console.log(err)
            toast.error(err)
        }
    }
    useEffect(() => {
        if (getLocalStorageToken()) {
          router.push("/myMovies")
        }
        else {
        
        }
      }, [])

    return <>



        <div>
            <section className='signUppage bg-img'>
                <Container>
                    <div className='vh-100 d-flex align-items-center justify-content-center'>
                        <div className='signUppage_form'>
                            <h1>Sign in</h1>
                            <UserLoginForm onSubmit={submit} />
                        </div>
                    </div>
                </Container>
            </section>
        </div>

    </>

}

