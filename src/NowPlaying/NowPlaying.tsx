import React from "react";
import "./NowPlaying.css";
import { api, images_api } from "../links";
import { useNavigate } from "react-router-dom";

const not_found = new URL("../assets/not-found.png", import.meta.url).href;

export function NowPlaying () {
    const [media, set_media] = React.useState("movies");

    return (
        <main className="main_container">
            <p className="main_title">Now playing</p>

            <nav className="main_media_options">
                <a onClick={() => set_media("movies")} className={media === "movies" ? "main_media_options_anchor_active" : ""}>Movies</a>
                <a onClick={() => set_media("tv")} className={media === "tv" ? "main_media_options_anchor_active" : ""}>TV</a>
            </nav>

            {media === "movies" && <Movies_now_playing_fetcher/>}
            {media === "tv" && <Tv_on_air_fetcher/>}
        </main>
    );
};




export interface MoviesNowPlaying {
    page:          number;
    results:       MoviesResult[];
    total_pages:   number;
    total_results: number;
}

export interface MoviesResult {
    adult:             boolean;
    backdrop_path:     string;
    id:                number;
    title?:            string;
    original_language: OriginalLanguage;
    original_title?:   string;
    overview:          string;
    poster_path:       string;
    media_type:        MediaType;
    genre_ids:         number[];
    popularity:        number;
    release_date?:     Date;
    video?:            boolean;
    vote_average:      number;
    vote_count:        number;
    name?:             string;
    original_name?:    string;
    first_air_date?:   Date;
    origin_country?:   string[];
}

export enum MediaType {
    Movie = "movie",
    Tv = "tv",
}

export enum OriginalLanguage {
    En = "en",
    Ja = "ja",
}


function Movies_now_playing_fetcher () {
    const navigate = useNavigate();

    const [now_playing_movies, set_now_playing_movies] = React.useState<MoviesResult[] | undefined>(undefined);

    React.useEffect(() => {
        const fetch_data = async () => {
            const {data} = await api("/movie/now_playing");
            const results = data.results;
            // console.log(results);
            set_now_playing_movies(results);
        };
        fetch_data();
    }, [])

    return (
        <section className="media_results_container">
            {now_playing_movies && now_playing_movies.map((ele: MoviesResult) => {

                return (
                    <div key={ele.id} className="single_media_container" onClick={() => navigate(`/${ele.media_type || "movie"}/${ele.id}/${ele.title}`)}>
                        <div className="image_container">
                            <img alt={ele.title} src={`${images_api}${ele.poster_path}`}/>
                            <span className="media_type">Movie</span>
                        </div>
                        <h2>{ele.title}</h2>
                    </div>
                );
            })}
        </section>
    );
};



export interface TvOnAir {
    page:          number;
    results:       TvResult[];
    total_pages:   number;
    total_results: number;
}

export interface TvResult {
    backdrop_path:     string;
    first_air_date:    Date;
    genre_ids:         number[];
    id:                number;
    name:              string;
    origin_country:    string[];
    original_language: string;
    original_name:     string;
    overview:          string;
    popularity:        number;
    poster_path:       null | string;
    vote_average:      number;
    vote_count:        number;
}


function Tv_on_air_fetcher () {
    const navigate = useNavigate();

    const [tv_on_air, set_tv_on_air] = React.useState<TvResult[] | undefined>(undefined);

    React.useEffect(() => {
        const fetch_data = async () => {
            const {data} = await api("/tv/on_the_air");
            const results = data.results;
            // console.log(results);
            set_tv_on_air(results);
        };
        fetch_data();
    }, [])

    return (
        <section className="media_results_container">
            {tv_on_air && tv_on_air.map((ele: TvResult) => {

                const image_url = ele.poster_path ? `${images_api}${ele.poster_path}` : not_found;
                return (
                    <div key={ele.id} className="single_media_container" onClick={() => navigate(`/tv/${ele.id}/${ele.name}`)}>
                        <div className="image_container">
                            <img alt={ele.name} src={image_url}/>
                            <span className="media_type">Tv</span>
                        </div>
                        <h2>{ele.name}</h2>
                    </div>
                );
            })}
        </section>
    );
};