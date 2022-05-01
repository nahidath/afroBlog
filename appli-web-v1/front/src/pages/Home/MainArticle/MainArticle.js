import React from 'react';
import { useHistory } from 'react-router-dom';

import './MainArticle.css';


export default function MainArticle (props) {

    const history = useHistory();

    const handleGoArticle = () => {
        history.push({ pathname:'/article/' + props.article.id});
    }

    return (
        <div id='mainArticle'>
            <img 
                src={['./articles', props.article.id, props.article.image].join('/')}
                alt="mainArticle"  
                className="mainArticleImg" 
            />
            <div className="mainArticleText">
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
