"use client"

import { API_URL } from '../app/constants';
import styles from '../styles/movie-similar.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        slidesToShow: 5,
        slidesToScroll: 1,
      };

    return ( 
        <div style={{margin:"100px"}}>
            <h2 style={{textAlign:"center", fontWeight:"bold", fontSize:"25px"}}>Similar Movies</h2>
            <Slider {...settings}>
            {movies.map((movie, index) => (
                <div key={index} className={styles.contentBox}>
                    <img style={{height:"200px"}} src={movie.poster_path} alt={movie.title} />
                    <span>{movie.title}</span>
                </div>
            ))}
        </Slider>
        </div>
    )
}