import React from "react";
import "./Header.css";
import { api } from "../links";
import ReactDOM from "react-dom";
import { useNavigate, Link } from "react-router-dom";

const menu_icon = new URL("../assets/menu.png", import.meta.url).href;

export function Header () {
    const navigate = useNavigate();

    const [movies_genres, set_movies_genres] = React.useState(false);
    const [tv_genres, set_tv_genres] = React.useState(false);

    const [search_value, set_search_value] = React.useState("");

    const {side_menu_open, set_side_menu_open} = React.useContext(Header_side_menu_context);

    const navigate_to_home =  (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate("/");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {e.preventDefault()};

    const make_new_search = () => {
        navigate(`/search/${search_value}`)
    };

    return (
        <header className="header">
            <a className="header_title" onClick={navigate_to_home}>The Movie DB</a>
            <span className="side_menu_container" onClick={() => set_side_menu_open(!side_menu_open)}>
                <img className="side_menu_icon" alt="Side menu icon" src={menu_icon}/>
            </span>

            {side_menu_open && <Side_menu_portal/>}

            <div className="header_options_container">
                <nav className="header_options_container_navigation">
                    <ul className="header_options_container_navigation_list">
                        <li className="header_options_container_navigation_list_item">
                            <a onClick={navigate_to_home}>Home</a>
                        </li>
                        
                        <li className="header_options_container_navigation_list_item" onMouseOver={() => set_movies_genres(true)} onMouseOut={() => set_movies_genres(false)}>
                            Movie Genres🔽
                            {movies_genres && <Movie_genres_fetcher/>}
                        </li>
                            
                        <li className="header_options_container_navigation_list_item" onMouseOver={() => set_tv_genres(true)} onMouseOut={() => set_tv_genres(false)}>
                            Tv Genres🔽
                            {tv_genres && <Tv_genres_fetcher/>}
                        </li>
                    </ul>
                </nav>    
                <div className="header_search_container">
                    <form onSubmit={handleSubmit}>
                        <span>
                            <input type="search" placeholder="Search for movies" value={search_value} onChange={(e) => set_search_value(e.target.value)}/>
                            <button type="button" onClick={make_new_search} onKeyDown={(e) => { if (e.key === "Enter") {make_new_search} }}>🔎</button>
                        </span>
                    </form>
                </div>
            </div> 

        </header>
    );
};




export interface Genre {
    id:   number;
    name: string;
}

function Movie_genres_fetcher () {
    const navigate = useNavigate();
    
    const [movies_genres, set_movies_genres] = React.useState<Genre[] | undefined>(undefined);

    const {side_menu_open, set_side_menu_open} = React.useContext(Header_side_menu_context);

    React.useEffect(() => {
        const fetch_data = async () => {
        const {data} = await api("/genre/movie/list");
            const results = data.genres;
            // console.log(results);
            set_movies_genres(results);
        };
        fetch_data();
    }, [])

    return (
        <ul className="genres_list">
            {movies_genres && movies_genres.map((ele: Genre) => {
                
                return (
                    <li key={ele.id} className="genres_list_item" onClick={() => {set_side_menu_open(false), navigate(`/movies/genre/${ele.name}/${ele.id}`)}}>
                        <Link to={`/movies/genre/${ele.name}/${ele.id}`}>
                            {ele.name} 
                        </Link>
                    </li>
                );
            })}
        </ul>        
    );
};

function Tv_genres_fetcher () {
    const navigate = useNavigate();

    const [tv_genres, set_tv_genres] = React.useState<Genre[] | undefined>(undefined);

    const {side_menu_open, set_side_menu_open} = React.useContext(Header_side_menu_context);

    React.useEffect(() => {
        const fetch_data = async () => {
        const {data} = await api("/genre/tv/list");
            const results = data.genres;
            // console.log(results);
            set_tv_genres(results);
        };
        fetch_data();
    }, [])

    return (
        <ul className="genres_list">
            {tv_genres && tv_genres.map((ele: Genre) => {
                
                return (
                    <li key={ele.id} className="genres_list_item" onClick={() => {set_side_menu_open(false), navigate(`/tv/genre/${ele.name}/${ele.id}`)}}>
                        <Link to={`/tv/genre/${ele.name}/${ele.id}`}>
                            {ele.name} 
                        </Link>
                    </li>
                );
            })}
        </ul>        
    );
};


type Props = {
    children: React.ReactNode;
};

type Header_side_menu_context_type = {
    side_menu_open: boolean,
    set_side_menu_open: React.Dispatch<React.SetStateAction<boolean>>
};

export const Header_side_menu_context = React.createContext<Header_side_menu_context_type>({
    side_menu_open: false,
    set_side_menu_open: () => {}
});

export function Header_side_menu_provider ({children}: Props) {
    const [side_menu_open, set_side_menu_open] = React.useState(false);

    return (
        <Header_side_menu_context.Provider value={{side_menu_open, set_side_menu_open}}>
            {children}
        </Header_side_menu_context.Provider>
    );
};



export function Side_menu_portal () {
    const navigate = useNavigate();

    const [movies_genres, set_movies_genres] = React.useState(false);
    const [tv_genres, set_tv_genres] = React.useState(false);

    const [search_value, set_search_value] = React.useState("");

    const {side_menu_open, set_side_menu_open} = React.useContext(Header_side_menu_context);

    const on_close_executioner = () => {
        set_movies_genres(false);
        set_tv_genres(false);
        set_side_menu_open(false);
    };

    const navigate_to_home =  (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate("/");
        on_close_executioner();
    };    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {e.preventDefault()};

    const make_new_search = () => {
        navigate(`/search/${search_value}`);
        on_close_executioner();
    };
    return ReactDOM.createPortal (
        <React.Fragment>
            <span className="header_side_menu_modal_disabler_container" onClick={on_close_executioner}></span>
            <div className="header_side_menu_modal">
                <div className="header_side_menu_search_container">
                    <form onSubmit={handleSubmit}>
                        <span>
                            <input type="search" placeholder="Search for movies" value={search_value} onChange={(e) => set_search_value(e.target.value)}/>
                            <button type="button" onClick={make_new_search} onKeyDown={(e) => { if (e.key === "Enter") {make_new_search}}}>🔎</button>
                        </span>
                    </form>
                </div>
                <div className="header_side_menu_options_container">
                    <nav className="header_side_menu_options_container_navigation">
                        <ul className="header_side_menu_options_container_navigation_list">
                            <li className="header_side_menu_options_container_navigation_list_item">
                                <a onClick={navigate_to_home}>Home</a>
                            </li>
                            
                            <li className="header_side_menu_options_container_navigation_list_item" onClick={() => {set_movies_genres(!movies_genres), set_tv_genres(false)}}>
                                Movie Genres🔽
                                {movies_genres && <Movie_genres_fetcher/>}
                            </li>
                                
                            <li className="header_side_menu_options_container_navigation_list_item" onClick={() => {set_tv_genres(!tv_genres), set_movies_genres(false)}}>
                                Tv Genres🔽
                                {tv_genres && <Tv_genres_fetcher/>}
                            </li>
                            <li className="header_side_menu_options_container_navigation_list_item" onClick={on_close_executioner}>
                                Close
                            </li>
                        </ul>
                    </nav>    
                </div> 
            </div>
        </React.Fragment>,
        document.getElementById("header_side_menu")!
    );
};