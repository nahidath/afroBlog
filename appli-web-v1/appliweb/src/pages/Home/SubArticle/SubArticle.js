import React from 'react';

import './SubArticle.css';


export default function SubArticle (props) {
    return (
        <div id='subArticle'>
            <img 
                src={props.article.image} 
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
                <h5>Lire la suite</h5>
            </div>
            
        </div>
    );
};
