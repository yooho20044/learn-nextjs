import styles from "../../styles/home.module.css";
import Movie from "../../components/movie";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { API_URL } from "../constants";

export const metadata = {
    title: "Home",
    meta: [
        {
          name: "permissions-policy",
          content: "picture-in-picture=(self)"
        }
    ]
}

async function getMovies(){
    // await new Promise((resolve) =>setTimeout(resolve, 1000))
    const response = await fetch(API_URL);
    const json = await response.json();
    return json;
}

export default async function HomePage() {
    const movies = await getMovies();
    return(
        <div className={styles.container}>
            {movies.map((movie) =>(
                <Movie key={movie.id} id={movie.id} poster_path={movie.poster_path} title={movie.title} />
            ))}
        </div>
    )
}