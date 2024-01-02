import AddMovie from "@/components/Form/AddMovie";
import { moviesService } from "@/services/movies/index.service";
import { getLocalStorageToken } from "@/utils/common.util";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";

export default function CreateMovie() {
    const [imageUrl, setImageUrl] = useState();
    const router = useRouter();
    const submit = async (value) => {
        try {

            const bodyData = {
                title: value.title,
                publishingYear: value.year,
                movieImage: imageUrl.basePath

            }

            const res = await moviesService.createMovie(bodyData)
            if (res?.success) {

                toast.success(res?.message);
                router.push("/myMovies")

            } else {
                toast.warning(res?.message);
            }
        }

        catch (err) {
            toast.error(err)
        }

    }

    const onCancel=()=>{
         router.push("/myMovies")
    }

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
                    <h1>Create a new movie</h1>
                    <AddMovie onSubmit={submit} imageUrl={imageUrl} setImageUrl={setImageUrl} onCancel={onCancel} />
                </div>
            </Container>
        </section>
    </>
}