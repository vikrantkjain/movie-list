const Movie = {
    createMovie:{
        url:"/movie",
        method:"post"
    },
    getMovie:{
        url:"/movie",
        method:"get"
    },
    editMovie:(id)=>({
        url:`/movie/${id}`,
        method:"patch"
    }),
    getOneMovie:(id)=>({
        url:`/movie/${id}`,
        method:"get"
    }),
  

}

export default Movie ;