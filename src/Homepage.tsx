import React from "react";
import { Hero } from './Hero/Hero';
import { NowPlaying } from './NowPlaying/NowPlaying';
import { Popular } from './Popular/Popular';



export function Homepage () {

    return (
        <React.Fragment>
            <Hero/>
            <NowPlaying/>
            <Popular/>
        </React.Fragment>
    );
};