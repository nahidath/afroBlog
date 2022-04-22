import React from 'react';
import MainArticle from './MainArticle/MainArticle';
import SubArticle from './SubArticle/SubArticle';
import './Home.css';

// Import articles
import {
    getArticle
  } from '../../articles';


export default function Home() {
    return (
        <div id='home'>
            <MainArticle article={getArticle(0)}/>
            <SubArticle article={getArticle(1)}/>
            <SubArticle article={getArticle(1)}/>
            <SubArticle article={getArticle(1)}/>
            <SubArticle article={getArticle(1)}/>
            <SubArticle article={getArticle(1)}/>
            {/* <MainArticle article={getArticle(1)}/> */}
        </div>
    );
};
