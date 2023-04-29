import React from 'react';
import "./App.css";
import { Header } from './Header/Header';
import { Homepage } from './Homepage';
import { Footer } from './Footer/Footer';
import { Header_side_menu_provider } from './Header/Header';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { MovieDetails } from './MovieDetails/MovieDetails';
import { TvDetails } from './TvDetails/TvDetails';
import { MovieGenres } from './Genres/MovieGenres';
import { TvGenres } from './Genres/TvGenres';
import { Search } from './Search/Search';

interface Props {
  children: React.ReactNode;
};

function App_providers ({children}: Props) {
  return (
    <Header_side_menu_provider>


      {children}


    </Header_side_menu_provider>
  );
};


function App() {

  return (
    <React.Fragment>
      <HashRouter>
        <App_providers>
          <Header/>

            <Routes>
              <Route path='/' element={<Homepage/>}/>
              <Route path='/movie/:id/:name' element={<MovieDetails/>}/>
              <Route path='/tv/:id/:name' element={<TvDetails/>}/>
              <Route path='/movies/genre/:genre_name/:genre_id' element={<MovieGenres/>}/>
              <Route path='/tv/genre/:genre_name/:genre_id' element={<TvGenres/>}/>
              <Route path='/search/:query' element={<Search/>}/>

              <Route path='/*' element={<Homepage/>}/>
            </Routes>

          <Footer/>
        </App_providers>
      </HashRouter>
    </React.Fragment>
  );
}

export default App
