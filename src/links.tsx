import axios from "axios";

const API_KEY = "fa8b0a28fa9b9bdce4dcd1b2a3b1a430";

export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY
    }
});


export const images_api = "https://image.tmdb.org/t/p/w500";
