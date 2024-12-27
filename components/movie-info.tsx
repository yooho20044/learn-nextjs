import { API_URL } from "../app/(home)/page";

async function getMovie(id:string){
    console.log(`Fetching Movies: ${Date.now()}`)
    //await new Promise((resolve) => setTimeout(resolve, 5000))
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export default async function MovieInfo({id}:{id:string}){
    const movie = await getMovie(id);
    return (
    <div>
        <h2>{movie.title}</h2>
        <img src={movie.backdrop_path} alt={movie.title} />
        <h6>{JSON.stringify(movie)}</h6>
    </div>
    )
}