import React from "react";
import "./TvDetails.css";
import { api, images_api } from "../links";
import { useLocation, useNavigate } from "react-router-dom";

const not_found = new URL("../assets/not-found.png", import.meta.url).href;



export interface TvDetails {
    adult:                boolean;
    backdrop_path:        string;
    created_by:           CreatedBy[];
    episode_run_time:     number[];
    first_air_date:       Date;
    genres:               Genre[];
    homepage:             string;
    id:                   number;
    in_production:        boolean;
    languages:            string[];
    last_air_date:        Date;
    last_episode_to_air:  TEpisodeToAir;
    name:                 string;
    next_episode_to_air:  TEpisodeToAir;
    networks:             Network[];
    number_of_episodes:   number;
    number_of_seasons:    number;
    origin_country:       string[];
    original_language:    string;
    original_name:        string;
    overview:             string;
    popularity:           number;
    poster_path:          string;
    production_companies: Network[];
    production_countries: ProductionCountry[];
    seasons:              Season[];
    spoken_languages:     SpokenLanguage[];
    status:               string;
    tagline:              string;
    type:                 string;
    vote_average:         number;
    vote_count:           number;
}

export interface CreatedBy {
    id:           number;
    credit_id:    string;
    name:         string;
    gender:       number;
    profile_path: null;
}

export interface Genre {
    id:   number;
    name: string;
}

export interface TEpisodeToAir {
    id:              number;
    name:            string;
    overview:        string;
    vote_average:    number;
    vote_count:      number;
    air_date:        Date;
    episode_number:  number;
    production_code: string;
    runtime:         number;
    season_number:   number;
    show_id:         number;
    still_path:      null;
}

export interface Network {
    id:             number;
    logo_path:      null | string;
    name:           string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name:       string;
}

export interface Season {
    air_date:      Date;
    episode_count: number;
    id:            number;
    name:          string;
    overview:      string;
    poster_path:   string;
    season_number: number;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1:    string;
    name:         string;
}



export interface SimilarResults {
    adult:             boolean;
    backdrop_path:     null | string;
    genre_ids:         number[];
    id:                number;
    origin_country:    string[];
    original_language: string;
    original_name:     string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    first_air_date:    Date;
    name:              string;
    vote_average:      number;
    vote_count:        number;
}



export function TvDetails () {
    const location = useLocation();
    const navigate = useNavigate();
    const [_, __, tv_id] = location.pathname.split("/");

    const [tv_details, set_tv_details] = React.useState<TvDetails | undefined>(undefined);
    const [similar_tvs, set_similar_tvs] = React.useState<SimilarResults[] | undefined>(undefined);

    const image_url = tv_details?.poster_path ? `${images_api}${tv_details?.poster_path}` : not_found;

    React.useEffect(() => {
        window.scrollTo(0,0)
        const fetch_data = async () => {
            const {data} = await api(`/tv/${tv_id}`);
            // console.log(data);
            set_tv_details(data);
        };

        const fetch_similar_data = async () => {
            const {data} = await api(`/tv/${tv_id}/similar`);
            const results = data.results;
            // console.log(results);
            set_similar_tvs(results);
        };
        fetch_data();
        fetch_similar_data();
    }, [tv_id])

    return (
        <div className="tv_container">
            {tv_details && (
                <section className="tv_details_container">
                    <figure className="tv_details_image_container">
                        <img src={image_url} alt={tv_details?.name}/>
                    </figure>

                    <div className="tv_details_description_container">
                        <h2 className="tv_details_description_container_title">{tv_details?.name}</h2>

                        <ul className="tv_details_description_container_tags">
                            <li>⭐{tv_details.vote_average.toFixed(1)}</li> 
                            <li className="tv_details_description_container_tags_middle">🕒{tv_details.number_of_episodes} episodes</li>
                            <li>🗓️{String(tv_details.first_air_date).split("-")[0]}</li>
                        </ul>
                        
                        <p className="tv_details_description_container_overview">{tv_details.overview}</p>

                        <ul className="tv_details_description_container_genres">
                            Genres: 
                            {tv_details.genres.map((ele) => {
                                return (
                                    <li key={ele.id}>{ele.name}</li>
                                );
                            })}
                        </ul>
                    </div>
                </section>
            )}

            {similar_tvs && (<p className="similar_tvs_main_container_title">Similar</p>)}

            <section className="similar_tvs_main_container">
                {similar_tvs && similar_tvs.map((ele) => {

                    const image_url = ele.poster_path ? `${images_api}${ele.poster_path}` : not_found;
                    return (
                        <div key={ele.id} className="similar_tvs_single_container" onClick={() => navigate(`/tv/${ele.id}/${ele.name}`)}>
                            <figure className="similar_tvs_single_image_container">
                                <img src={image_url}/>
                            </figure>

                            <h2 className="similar_tvs_single_container_title">{ele.name}</h2>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};