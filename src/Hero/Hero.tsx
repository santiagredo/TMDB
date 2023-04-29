import React from "react";
import "./Hero.css";
import { api, images_api } from "../links";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import { useNavigate} from "react-router-dom";

export interface Trending {
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

export interface Result {
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

export interface HeroSlider {
    title?:            string;
    overview:          string;
    poster_path:       string;
    vote_average:      number;
    release_date?:     Date;
}

export function Hero () {
    const navigate = useNavigate();

    const [trending, setTrending] = React.useState<Result[] | undefined>(undefined);

    React.useEffect (() => {
        const fetch_data = async () => {
            const {data} = await api("/trending/all/week");
            const results = data.results;
            // console.log(results);
            setTrending(results);
        }
        fetch_data()
    }, [])


    return (
        <React.Fragment>
            <p className="hero_title">Trending</p>
            <div className="hero_container"> 
                <AliceCarousel
                    autoPlay
                    autoPlayStrategy="none"
                    autoPlayInterval={3000}
                    animationDuration={1000}
                    animationType="slide"
                    infinite
                    touchTracking={false}
                    disableButtonsControls
                    controlsStrategy="alternate"

                    responsive={{
                        768: {
                            items: 2,
                        },
                        1024: {
                            items: 4,
                        }
                    }}

                    items={
                        trending?.map((ele: Result) => {
                            const media_title = (ele.title || ele.name);

                            return (
                                <div className="hero_details_container">
                                    <img src={`${images_api}${ele.backdrop_path}`}/>
                                    <div className="hero_details_container_text">
                                        <h3 onClick={() => navigate(`/${ele.media_type}/${ele.id}/${ele.title || ele.name}`)}>{ele.title || ele.name}</h3>
                                        <p>⭐{ele.vote_average.toFixed(1)} 📺{ele.release_date ? 
                                                String(ele.release_date).split("-")[0] : 
                                                String(ele.first_air_date).split("-")[0]}
                                        </p>
                                        <a onClick={() => navigate(`/${ele.media_type}/${ele.id}/${media_title}`)}>⏯️ See details</a>
                                    </div>
                                </div>
                            )
                        })
                    }
                />
            </div>
        </React.Fragment>
    );
};