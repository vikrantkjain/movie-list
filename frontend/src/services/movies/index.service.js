import Movie from "@/apiEndPoint/movie";
import APIrequest from "../axios";

export const moviesService={
    createMovie: async (bodyData) => {
        const payload = {
          ...Movie.createMovie,bodyData
        }
        const res = await APIrequest(payload);
        return res;
      },
      movieList: async (queryParams) => {
        try {
          const payload = {
            ...Movie.getMovie,queryParams
          }
          const res = await APIrequest(payload);
          return res;
        } catch (error) {
        }
      },
      getMovie: async (id) => {
        try {
          const payload = {
            ...Movie.getOneMovie(id)
          }
          const res = await APIrequest(payload);
          return res;
        } catch (error) {
        }
      },
      editMovie: async (id,bodyData) => {
        try {
          const payload = {
            ...Movie.editMovie(id), bodyData 
          }
          const res = await APIrequest(payload);
          return res;
        } catch (error) {
        }
      },
}