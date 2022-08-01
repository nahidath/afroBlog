import React, {useEffect, useState} from 'react';
import MainArticle from './MainArticle/MainArticle';
import SubArticle from './SubArticle/SubArticle';
import './Home.css';

// Import articles
import {
    getArticle
} from '../../articles';
import axios from "axios";
import {map} from "react-bootstrap/ElementChildren";


export default function Home() {
    const [dataArt, getDataArt] = useState([]);
    useEffect(() => {
        displayArticles();
    }, []);


    const displayArticles = () => {
        axios.get('http://localhost:5000/articles/all').then(resp => {
            const dA = resp.data.data;
            getDataArt(dA);
        }).catch((err) => {
            console.log(err);
        });
    };
    return (
        <div id='home'>
            {dataArt.map((elt, index) => {
                return (
                    <div key={index}>
                        {
                            (index === 0) ?<MainArticle article={elt}/>:<></>
                        }
                        {
                            (index != 0) ? <SubArticle  article={elt}/> : <></>
                        }
                    </div>
                );
            })}
        </div>
    );


};
