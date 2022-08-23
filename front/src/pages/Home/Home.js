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
import {Carousel} from "react-bootstrap";


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
                        <Carousel>
                        {
                            (index <= 2) ? <MainArticle article={elt}/>:<></>
                        }
                        </Carousel>
                        {
                            (index > 2) ? <SubArticle  article={elt}/> : <></>
                        }
                    </div>
                );
            })}
        </div>
    );


};
