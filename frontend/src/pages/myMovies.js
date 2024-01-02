import { useEffect, useState } from "react"
import EmptyPage from "./empty";
import Pagination from "@/components/Pagination";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { MovieCard } from "@/components";
import Link from "next/link";
import { moviesService } from "@/services/movies/index.service";
import { useRouter } from "next/router";
import user from "@/apiEndPoint/user";
import { userService } from "@/services/user/index.service";
import { toast } from "react-toastify";
import { getLocalStorageToken, removeLocalStorageToken } from "@/utils/common.util";

export default function MovieList() {


  const [movieList, setMovieList] = useState([]);
  const router = useRouter();
  const [param, setParam] = useState({});
  const [noOfPage, setNoOfPage] = useState();
  const [page, setPage] = useState(1);
  const [sizePerPage] = useState(8);
  const [totalCount, setTotalCount] = useState();
  const [loading ,setLoading]=useState(false);


  const { pathname, query } = router;

  const tableReset = () => {
    setLoading(false);
    setMovieList([]);
    setNoOfPage(0);
    setTotalCount(0);
    setPage(1);
  };


  const navigateWithParam = (data, router, pathname) => {
    const searchParams = new URLSearchParams(data).toString();
    router.push(`${pathname}?${searchParams}`);
  };

  const goToPage = (pageNo) => {
    const newParams = { ...param };
    if (pageNo) {
      newParams.page = pageNo;
    }
    navigateWithParam(newParams, router, pathname);
    tableReset();
   
  };


  const logOut = async () => {
    try {
      const res = await userService.logOut();
      if (res?.success) {
        removeLocalStorageToken();
        router.push("/")
      }

    }
    catch (err) {


    }
  }
  const getAllMovie = async () => {
    try {
     
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
      };
      setLoading(true)
      const res = await moviesService.movieList(queryParams);
      const { data, success } = res;


      if (success) {
        setLoading(false)
        setMovieList(data?.rows);
        setTotalCount(data?.count);
        setNoOfPage(data?.count > 0 ? Math.ceil(data?.count / sizePerPage) : 1);
      }
      else{
        toast.warning(res?.message)
      }
    } catch (error) {
      toast.error(error);
    }
  }


  useEffect(() => {
    if (!getLocalStorageToken()) {
      router.push("/")
    }
    else {
     if(!movieList.length){
      goToPage(1);
      getAllMovie();
     }
    }
  }, [])

  useEffect(() => {
    if(getLocalStorageToken()){
    getAllMovie();  
    } 
  }, [page]);

  useEffect(() => {
    if (query) {
      const { query: { page } } = router;
      // setParam(page);
      setPage(page ?? 1);

    }
  }, [router]);

  if (movieList?.length<0) {

    return <>
      <EmptyPage />
    </>

  }
  else {
    return <>
     
  
      <section className='myMoviesPage bg-img'>
        <Container>
          <div className='myMoviesPage_head d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center'>
              <h1>My movies</h1>
              <Link href="/createMovie" className='d-flex'>
                <em className='icon icon-plus-circle' />
              </Link>
            </div>
            <a onClick={() => logOut()}>Logout <em className='icon icon-logout' /></a>
          </div>
          {loading?<center><Spinner animation="border" variant="dark" /></center>:
          <div className=''>
            <Row className='g-md-4 g-3'>
              {movieList?.length  && movieList?.map((item, index) => {
                return (
                  <Col xl={3} md={4} xs={6} key={index}>
                    <MovieCard item={item} />
                  </Col>)

              })

              }
            </Row>
         

          <Pagination
            count={totalCount}
            page={parseInt(page)}
            sizePerPage={sizePerPage}
            noOfPage={noOfPage}
            goToPage={goToPage}
          // handleLimitChange={handleLimitChange}
          // hasLimit={hasLimit}
          />
           </div>}

        </Container>
      </section>

    </>
}
  
}