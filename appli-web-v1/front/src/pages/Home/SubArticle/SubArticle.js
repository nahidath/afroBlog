import React from 'react';
import { useHistory } from 'react-router-dom';

import './SubArticle.css';


export default function SubArticle (props) {

    const history = useHistory();

    const handleGoArticle = () => {
        history.push({ pathname:'/article/' + props.article.id});
    }

    return (
        <div id='subArticle'>
            <img 
                src={['./articles', props.article.id, props.article.image].join('/')}
                alt="subArticle"  
                className="articleImg" 
            />
            <div className="articleText">
                <h2>
                    {props.article.title}
                </h2>
                <p>
                    {props.article.description}
                </p>
                <h5 onClick={handleGoArticle}>Lire la suite</h5>
            </div>
            
        </div>
    );
};
