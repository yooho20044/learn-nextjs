import { API_URL } from "../app/constants"
import styles from "../styles/movie-info.module.css"

export async function getMovie(id:string){
    console.log(`Fetching Movies: ${Date.now()}`)
    //await new Promise((resolve) => setTimeout(resolve, 5000))
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export default async function MovieInfo({id}:{id:string}){
    const movie = await getMovie(id);
    return (
    <div className={styles.container}>
        <img className={styles.poster} src={movie.poster_path} alt={movie.title} />
        <div className={styles.info}>
            <h1 className={styles.title}>{movie.title}</h1>
            <h3>{movie.release_date}</h3>
            <div className={styles.flexRow}>
                <h3 title={`count: ${movie.vote_count}`}>⭐️ {movie.vote_average}</h3>
                <h3>⌚ {movie.runtime} Min</h3>
            </div>
            <p>{movie.overview}</p>
            <a href={movie.homepage} target={"_blank"}>Homepage &rarr;</a>
            <div className={styles.production}>
            {movie.production_companies.map((prod)=>{
                const isValidLogoPath = prod.logo_path && !prod.logo_path.includes("null");
                
                return isValidLogoPath ? (
                    <img
                        key={prod.name} // 유니크한 키
                        className={styles.production}
                        src={prod.logo_path}
                        alt={prod.name}
                    />
                ) : null; // 경로가 유효하지 않으면 렌더링하지 않음
            })}
            </div>
        </div>
    </div>
    )
}