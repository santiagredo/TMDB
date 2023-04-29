import "./Footer.css";

const linkedin_icon = new URL("../assets/linkedin.png", import.meta.url).href;
const github_icon = new URL("../assets/github.png", import.meta.url).href;

export function Footer () {

    return (
        <footer className="footer_container">
            <h1 className="footer_title">The Movie Database</h1>

            <div className="footer_icons_container">
                <a href="https://www.linkedin.com/in/santiago-sabogal-266525247" target="_blank">
                    <span>
                        <img className="image_icons" alt="LinkedIn Icon" src={linkedin_icon}/>
                    </span>
                </a>
                <a href="https://github.com/santiagredo/TMDB" target="_blank">
                    <span>
                        <img className="image_icons" alt="Github icon" src={github_icon}/>
                    </span>
                </a>
            </div>
        </footer>
    );
};