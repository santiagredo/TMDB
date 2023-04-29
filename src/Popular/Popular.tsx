import React from "react";
import "./Popular.css";
import { api, images_api } from "../links";
import { useNavigate } from "react-router-dom";



export function Popular () {
    const [media, set_media] = React.useState("movies");

    return (
        <div className="popular_container">
            <p className="popular_title">Popular</p>

            <nav className="popular_media_options">
                <a onClick={() => set_media("movies")} className={media === "movies" ? "popular_media_options_anchor_active" : ""}>Movies</a>
                <a onClick={() => set_media("tv")} className={media === "tv" ? "popular_media_options_anchor_active" : ""}>TV</a>
            </nav>
            
            {media === "movies" && <Popular_movies_fetcher/>}
            {media === "tv" && <Popular_tv_fetcher/>}
        </div>
    );
};







export interface PopularMovies {
    page:          number;
    results:       MovieResult[];
    total_pages:   number;
    total_results: number;
}

export interface MovieResult {
    adult:             boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    id:                number;
    original_language: MovieOriginalLanguage;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    release_date:      Date;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
};

export enum MovieOriginalLanguage {
    En = "en",
    Es = "es",
    Ko = "ko",
};

function Popular_movies_fetcher () {
    const navigate = useNavigate();

    const [popular_movies, set_popular_movies] = React.useState<MovieResult[] | undefined>(undefined);

    React.useEffect(() => {
        const fetch_data = async () => {
            const {data} = await api("/movie/popular");
            const results = data.results;
            // console.log(results);
            set_popular_movies(results);
        };
        fetch_data();
    }, [])

    return (
        <section className="popular_media_results_container">
            {popular_movies && popular_movies.slice(0, 12).map((ele: MovieResult, index) => {

                return (
                    <div className="popular_single_media_container" key={ele.id}>
                            <span className="popular_media_type">#{index + 1}</span>
                        <div className="popular_image_container">
                            <img alt={ele.title} src={`${images_api}${ele.poster_path}`} onClick={() => navigate(`/movie/${ele.id}/${ele.title}`)}/>
                        </div>
                        <div className="popular_media_overview">
                            <h2 className="popular_media_overview_title" onClick={() => navigate(`/movie/${ele.id}/${ele.title}`)}>{ele.title}</h2>
                            <ul className="popular_media_overview_tags_container">
                                <li>📺 {String(ele.release_date).split("-")[0]}</li>
                                <li>⭐ {ele.vote_average.toFixed(1)}</li>
                            </ul>
                            <p className="popular_media_overview_description">{ele.overview}</p>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};




export interface PopularTvResult {
    page:          number;
    results:       TvResult[];
    total_pages:   number;
    total_results: number;
};

export interface TvResult {
    backdrop_path:     null | string;
    first_air_date:    Date;
    genre_ids:         number[];
    id:                number;
    name:              string;
    origin_country:    string[];
    original_language: string;
    original_name:     string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    vote_average:      number;
    vote_count:        number;
};

function Popular_tv_fetcher () {
    const navigate = useNavigate();

    const [popular_tv, set_popular_tv] = React.useState<TvResult[] | undefined>(undefined);

    React.useEffect(() => {
        const fetch_data = async () => {
            const {data} = await api("/tv/popular");
            const results = data.results;
            // console.log(results);
            set_popular_tv(results);
        };
        fetch_data();
    }, [])

    return (
        <section className="popular_media_results_container">
            {popular_tv && popular_tv.slice(0, 12).map((ele: TvResult, index) => {

                return (
                    <div className="popular_single_media_container" key={ele.id}>
                            <span className="popular_media_type">#{index + 1}</span>
                        <div className="popular_image_container">
                            <img alt={ele.name} src={`${images_api}${ele.poster_path}`} onClick={() => navigate(`/tv/${ele.id}/${ele.name}`)}/>
                        </div>
                        <div className="popular_media_overview">
                            <h2 className="popular_media_overview_title" onClick={() => navigate(`/tv/${ele.id}/${ele.name}`)}>{ele.name}</h2>
                            <ul className="popular_media_overview_tags_container">
                                <li>📺 {String(ele.first_air_date).split("-")[0]}</li>
                                <li>⭐ {ele.vote_average.toFixed(1)}</li>
                            </ul>
                            <p className="popular_media_overview_description">{ele.overview}</p>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};