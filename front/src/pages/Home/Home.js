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
import {useHistory} from "react-router-dom";


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

    //special carousel
    const carouselArt = dataArt.slice(0,3);

    const history = useHistory();

    const handleGoArticle = (ia) => {
        history.push({ pathname:'/article/' + ia});
    }


    return (
        <div id='home'>
            <div className="carrousel">
                <Carousel>
                    {carouselArt.map((elt, index) => (
                        <Carousel.Item key={index} onClick={() => handleGoArticle(elt._id)}>
                            <img
                                className="d-block w-100"
                                src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>{elt.title}</h3>
                                <h5 >Lire la suite</h5>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
            {dataArt.map((elt, index) => {
                return (
                    <div key={index}>
                        {
                            (index > 2) ? <SubArticle  article={elt}/> : <></>
                        }
                    </div>
                );
            })}
        </div>
    );


};
