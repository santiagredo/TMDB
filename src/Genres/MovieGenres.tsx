import React from "react";
import "./Genres.css";
import { useLocation, useNavigate } from "react-router-dom";
import { api, images_api } from "../links";

const not_found = new URL("../assets/not-found.png", import.meta.url).href;

export interface Result {
    adult:             boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    id:                number;
    original_language: string;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    release_date:      Date;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}



export function MovieGenres () {
    const navigate = useNavigate();
    const location = useLocation();
    const [_, __, ___, movie_genre_name, movie_genre_id] = location.pathname.split("/");
    // console.log(movie_genre_id);

    const [genre_results, set_genre_results] = React.useState<Result[] | undefined>(undefined);

    React.useEffect(() => {
        const fetch_data = async () => {
            const {data} = await api(`/discover/movie`, {params: {include_adult: true, with_genres: movie_genre_id, page: 1}});
            const results = data.results;
            // console.log(results);
            set_genre_results(results);
        };    
        fetch_data();
    }, [movie_genre_id]);

    return (
        <React.Fragment>
            <h2 className="genre_container_title">{decodeURI(movie_genre_name)} genre movies</h2>
            <section className="genre_container">


                {genre_results && genre_results.map((ele) => {

                    const image_url = ele.poster_path ? `${images_api}${ele.poster_path}` : not_found;
                    return (
                        <div key={ele.id} className="genre_single_container" onClick={() => navigate(`/movie/${ele.id}/${ele.title}`)}>
                            <figure className="genre_single_image_container">
                                <img alt={ele.title} src={image_url}/>
                            </figure>
                            <h2 className="genre_single_title">{ele.title}</h2>
                        </div>
                    );
                })}
            </section>
        </React.Fragment>
    );
};