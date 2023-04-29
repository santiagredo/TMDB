import React from "react";
import "./Genres.css";
import { useLocation, useNavigate } from "react-router-dom";
import { api, images_api } from "../links";

const not_found = new URL("../assets/not-found.png", import.meta.url).href;

export interface Result {
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
    poster_path:       string;
    vote_average:      number;
    vote_count:        number;
}



export function TvGenres () {
    const navigate = useNavigate();
    const location = useLocation();
    const [_, __, ___, tv_genre_name, tv_genre_id] = location.pathname.split("/");
    // console.log(tv_genre_id);

    const [genre_results, set_genre_results] = React.useState<Result[] | undefined>(undefined);

    React.useEffect(() => {
        const fetch_data = async () => {
            const {data} = await api(`/discover/tv`, {params: {include_adult: true, with_genres: tv_genre_id, page: 1}});
            const results = data.results;
            // console.log(results);
            set_genre_results(results);
        };    
        fetch_data();
    }, [tv_genre_id]);

    return (
        <React.Fragment>
            <h2 className="genre_container_title">{decodeURI(tv_genre_name)} genre tv shows</h2>
            <section className="genre_container">


                {genre_results && genre_results.map((ele) => {

                    const image_url = ele.poster_path ? `${images_api}${ele.poster_path}` : not_found;
                    return (
                        <div key={ele.id} className="genre_single_container" onClick={() => navigate(`/tv/${ele.id}/${ele.name}`)}>
                            <figure className="genre_single_image_container">
                                <img alt={ele.name} src={image_url}/>
                            </figure>
                            <h2 className="genre_single_title">{ele.name}</h2>
                        </div>
                    );
                })}
            </section>
        </React.Fragment>
    );
}