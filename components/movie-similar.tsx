"use client"

import { API_URL } from '../app/constants';
import styles from '../styles/movie-similar.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export async function getSimilarMovie(id : string){
    const response = await fetch(`${API_URL}/${id}/similar`)
    if (!response.ok) {
        throw new Error("네트워크 응답이 정상적이지 않습니다.");
    }
    return response.json();
    
}


export default async function MovieSimilar({id} : {id:string}){
    const movies = await getSimilarMovie(id);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
      };

    return ( 
        <div className={styles.container}>
            <h2 className={styles.title}>Recommend Movies</h2>
            <Slider {...settings}>
            {movies.map((movie, index) => (
                <Link href={`/movies/${movie.id}`} key={index} className={styles.contentBox}>
                    <img className={styles.poster} src={movie.poster_path} alt={movie.title} />
                    <span>{movie.title}</span>
                </Link>
            ))}
        </Slider>
        </div>
    )
}