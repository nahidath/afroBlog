import React from 'react';
import { useHistory } from 'react-router-dom';

import './MainArticle.css';
import {Carousel} from "react-bootstrap";


export default function MainArticle (props) {

    const history = useHistory();

    const handleGoArticle = () => {
        history.push({ pathname:'/article/' + props.article._id});
    }

    return (
        <div id='mainArticle'>
            {/*<img */}
            {/*    src={['./articles', props.article.id, props.article.image].join('/')}*/}
            {/*    alt="mainArticle"  */}
            {/*    className="mainArticleImg" */}
            {/*/>*/}
            {/*<div className="mainArticleText">*/}
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>{props.article.title}</h3>
                    <p>{props.article.description}</p>
                    <h5 onClick={handleGoArticle}>Lire la suite</h5>
                </Carousel.Caption>
            </Carousel.Item>

                {/*<h2>*/}
                {/*    {props.article.title}*/}
                {/*</h2>*/}
                {/*<p>*/}
                {/*    {props.article.description}*/}
                {/*</p>*/}
                {/*<h5 onClick={handleGoArticle}>Lire la suite</h5>*/}
            {/*</div>*/}
            
        </div>
    );
};
