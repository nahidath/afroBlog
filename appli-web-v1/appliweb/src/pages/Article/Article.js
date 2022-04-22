import React from 'react';
import './Article.css';
import {
  getArticle
} from '../../articles';


export default function Article (props) {
    
    getArticle(1);

    return (
        <div id='article'>
            Article n°{props.match.params.id}
            {/* <img 
                // src={['./articles', props.article.id, props.article.image].join('/')}
                src = {props.article.image}
                alt="subArticle"  
                className="articleImg" 
            /> */}
        </div>
    );
};
