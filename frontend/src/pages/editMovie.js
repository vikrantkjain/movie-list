import AddMovie from "@/components/Form/AddMovie";
import { moviesService } from "@/services/movies/index.service";
import { getLocalStorageToken } from "@/utils/common.util";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";


export default function EditMovie() {
    const [imageUrl, setImageUrl] = useState();
    const router = useRouter()
    const [movie,setMovie]=useState();
    const {query:{id}} = router;
  

    const getMovie=async()=>{
        try{
            if(id){
                const res = await moviesService.getMovie(id);
                if(res?.success)
                {
                  setMovie(res?.data)
                  setImageUrl({
                    baseUrl:res?.data?.movieImageUrl,
                    basePath:res?.data?.movieImage
                    
                  })

                 
                }
            }
              
        }
        catch(err){

        }
    }
 
    const submit=async (value)=>{
        try{
        const bodyData={
            title:value?.title,
            publishingYear:value?.year,
            movieImage:imageUrl?.basePath
        }

        const res= await moviesService.editMovie(movie.id,bodyData)
        if(res?.success){

            toast.success(res?.message)
            await router.push("/myMovies");
        }

    }catch(err){
        toast.error(err);
    }
      

    }
    const onCancel=()=>{
        router.push("/myMovies")
   }

    useEffect(()=>{
        getMovie();
    },[id])

    useEffect(() => {
        if (!getLocalStorageToken()) {
          router.push("/")
        }
        else {
        
        }
      }, [])
    return <>
        <section className='createMovie bg-img'>
            <Container>
                <div>
                    <h1>Edit Movie</h1>
                  <AddMovie onSubmit={submit} imageUrl={imageUrl} setImageUrl={setImageUrl} movie={movie} onCancel={onCancel}/>
                </div>
            </Container>
        </section>
    </>
}