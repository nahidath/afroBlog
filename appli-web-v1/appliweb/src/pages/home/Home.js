import React from 'react';
import MainArticle from './MainArticle/MainArticle';
import SubArticle from './SubArticle/SubArticle';
import './Home.css';

// Import articles
import {
    article1,
    article2
} from '../../articles';


export default function Home() {
    return (
        <div id='home'>
            <MainArticle article={article1}/>
            <SubArticle article={article2}/>
            <SubArticle article={article2}/>
            <SubArticle article={article2}/>
            <SubArticle article={article2}/>
            <SubArticle article={article2}/>
            {/* <MainArticle article={article2}/> */}
        </div>
    );
};
