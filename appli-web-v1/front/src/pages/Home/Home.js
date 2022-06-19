import React from 'react';
import MainArticle from './MainArticle/MainArticle';
import SubArticle from './SubArticle/SubArticle';
import './Home.css';

// Import articles
import {
    getArticle
} from '../../articles';
import axios from "axios";


export default function Home() {

    const displayArticles = () => {
        axios.get('http://localhost:5000/articles/').then(resp => {
            const dA = resp.data;
            return (
                <>
                    {dA.map((data, key) => {
                        return (
                            <>
                                {
                                    (key === 0) ?
                                        <>
                                            <MainArticle article={key}/>
                                        </> : <></>
                                }
                                {
                                    (key != 0) ?
                                        <>
                                            <SubArticle article={key}/>
                                        </> : <></>
                                }
                            </>
                        );
                    })}
                </>
            );
            console.log(resp.data);
        });
    }

    return (
        <div id='home'>
            <>
                {
                    displayArticles()
                }
            </>
            {/*<MainArticle article={getArticle(0)}/>*/}
            {/*<SubArticle article={getArticle(1)}/>*/}
            {/*<SubArticle article={getArticle(1)}/>*/}
            {/*<SubArticle article={getArticle(1)}/>*/}
            {/*<SubArticle article={getArticle(1)}/>*/}
            {/*<SubArticle article={getArticle(1)}/>*/}
            {/* <MainArticle article={getArticle(1)}/> */}
        </div>
    );
};
