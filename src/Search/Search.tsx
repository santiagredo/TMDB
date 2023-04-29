import React from "react";
import "./Search.css";
import { api, images_api } from "../links";
import { useLocation, useNavigate } from "react-router-dom";

const not_found = new URL("../assets/not-found.png", import.meta.url).href;

export interface SearchResults {
    adult:             boolean;
    backdrop_path:     null | string;
    id:                number;
    title?:            string;
    original_language: string;
    original_title?:   string;
    overview:          string;
    poster_path:       string;
    media_type:        string;
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



export function Search () {
    const navigate = useNavigate();
    const location = useLocation();
    const [_, __, search_query] = location.pathname.split("/");

    const [search_results, set_search_results] = React.useState<SearchResults[] | undefined>(undefined);

    React.useEffect(() => {
        const fetch_data = async () => {
            const {data} = await api(`/search/multi`, {params: {page: 1, include_adult: true, query: decodeURI(search_query)}});
            const results = data.results;
            console.log(results);
            set_search_results(results);
        };
        fetch_data();
    }, [search_query])
    
    return (
        <React.Fragment>
            <h2 className="search_results_container_title">Search results for: {decodeURI(search_query)}</h2>

            <section className="search_results_container">
                {search_results && search_results.map((ele) => {
                    
                    const image_url = ele.poster_path ? `${images_api}${ele.poster_path}` : not_found;
                    return (
                        <div key={ele.id} className="search_results_single_container" onClick={() => navigate(`/${ele.media_type}/${ele.id}/${ele.title || ele.name}`)}>
                            <figure className="search_results_single_image_container">
                                <img alt={ele.title || ele.name} src={image_url}/>
                            </figure>

                            <h2 className="search_results_single_title">{ele.title || ele.name}</h2>
                        </div>
                    );
                })}
            </section>
        </React.Fragment>
    );
};