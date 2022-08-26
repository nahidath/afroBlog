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
            <div className="carrousel">
                <Carousel>
                    {dataArt.map((elt, index) => {
                        return(
                            <div key={index}>
                                {
                                    (index <= 1) ? <MainArticle article={elt}/>:<></>
                                }
                            </div>
                        );
                    })}
                </Carousel>
                {/*<Carousel>*/}
                {/*    <Carousel.Item interval={1500}>*/}
                {/*        <img*/}
                {/*            className="d-block w-100"*/}
                {/*            src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"*/}
                {/*            alt="Image One"*/}
                {/*        />*/}
                {/*        <Carousel.Caption>*/}
                {/*            <h3>Label for first slide</h3>*/}
                {/*            <p>Sample Text for Image One</p>*/}
                {/*        </Carousel.Caption>*/}
                {/*    </Carousel.Item>*/}
                {/*    <Carousel.Item interval={500}>*/}
                {/*        <img*/}
                {/*            className="d-block w-100"*/}
                {/*            src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"*/}
                {/*            alt="Image Two"*/}
                {/*        />*/}
                {/*        <Carousel.Caption>*/}
                {/*            <h3>Label for second slide</h3>*/}
                {/*            <p>Sample Text for Image Two</p>*/}
                {/*        </Carousel.Caption>*/}
                {/*    </Carousel.Item>*/}
                {/*</Carousel>*/}
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
