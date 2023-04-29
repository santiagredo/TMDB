import React from "react";
import "./MovieDetails.css";
import { api, images_api } from "../links";
import { useLocation, useNavigate } from "react-router-dom";

const not_found = new URL("../assets/not-found.png", import.meta.url).href;

export interface MovieDetails {
    adult:                 boolean;
    backdrop_path:         string;
    belongs_to_collection: BelongsToCollection;
    budget:                number;
    genres:                Genre[];
    homepage:              string;
    id:                    number;
    imdb_id:               string;
    original_language:     string;
    original_title:        string;
    overview:              string;
    popularity:            number;
    poster_path:           string;
    production_companies:  ProductionCompany[];
    production_countries:  ProductionCountry[];
    release_date:          Date;
    revenue:               number;
    runtime:               number;
    spoken_languages:      SpokenLanguage[];
    status:                string;
    tagline:               string;
    title:                 string;
    video:                 boolean;
    vote_average:          number;
    vote_count:            number;
}

export interface BelongsToCollection {
    id:            number;
    name:          string;
    poster_path:   string;
    backdrop_path: string;
}

export interface Genre {
    id:   number;
    name: string;
}

export interface ProductionCompany {
    id:             number;
    logo_path:      string;
    name:           string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name:       string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1:    string;
    name:         string;
}




export interface SimilarResults {
    adult:             boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    id:                number;
    original_language: OriginalLanguage;
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

export enum OriginalLanguage {
    En = "en",
}



export function MovieDetails () {
    const location = useLocation();
    const navigate = useNavigate();
    const [_, __, movie_id] = location.pathname.split("/");

    const [movie_details, set_movie_details] = React.useState<MovieDetails | undefined>(undefined);
    const [similar_movies, set_similar_movies] = React.useState<SimilarResults[] | undefined>(undefined);

    const image_url = movie_details?.poster_path ? `${images_api}${movie_details?.poster_path}` : not_found;

    React.useEffect(() => {
        window.scrollTo(0,0)
        const fetch_data = async () => {
            const {data} = await api(`/movie/${movie_id}`);
            // console.log(data);
            set_movie_details(data);
        };

        const fetch_similar_data = async () => {
            const {data} = await api(`/movie/${movie_id}/similar`);
            const results = data.results;
            // console.log(results);
            set_similar_movies(results);
        };
        fetch_data();
        fetch_similar_data();
    }, [movie_id])

    return (
        <div className="movie_container">
            {movie_details && (
                <section className="movie_details_container">
                    <figure className="movie_details_image_container">
                        <img src={image_url} alt={movie_details?.title}/>
                    </figure>

                    <div className="movie_details_description_container">
                        <h2 className="movie_details_description_container_title">{movie_details?.title}</h2>

                        <ul className="movie_details_description_container_tags">
                            <li>⭐{movie_details.vote_average.toFixed(1)}</li> 
                            <li className="movie_details_description_container_tags_middle">🕒{movie_details.runtime}</li>
                            <li>🗓️{String(movie_details.release_date).split("-")[0]}</li>
                        </ul>
                        
                        <p className="movie_details_description_container_overview">{movie_details.overview}</p>

                        <ul className="movie_details_description_container_genres">
                            Genres: 
                            {movie_details.genres.map((ele) => {
                                return (
                                    <li key={ele.id}>{ele.name}</li>
                                );
                            })}
                        </ul>
                    </div>
                </section>
            )}

            <p className="similar_movies_main_container_title">Similar</p>

            <section className="similar_movies_main_container">
                {similar_movies && similar_movies.map((ele) => {

                    const image_url = ele.poster_path ? `${images_api}${ele.poster_path}` : not_found;
                    return (
                        <div key={ele.id} className="similar_movies_single_container" onClick={() => navigate(`/movie/${ele.id}/${ele.title}`)}>
                            <figure className="similar_movies_single_image_container">
                                <img src={image_url}/>
                            </figure>

                            <h2 className="similar_movies_single_container_title">{ele.title}</h2>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};