import React from 'react';

import './MainArticle.css';


export default function MainArticle (props) {

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
                <h5>Lire la suite</h5>
            </div>
            
        </div>
    );
};
